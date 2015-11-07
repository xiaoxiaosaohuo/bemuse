
import _            from 'lodash'
import Bacon        from 'baconjs'
import { Store }    from 'bemuse/flux'
import keycode      from 'keycode'

import OptionsStore from './options-store'
import * as Actions from '../actions/options-input-actions'

const $order    = OptionsStore.map(getControls)
const $keyCodes = OptionsStore.map(getKeyboardMapping)

function getControls (state) {
  if (state.scratch === 'left') {
    return ['SC', 'SC2', '1', '2', '3', '4', '5', '6', '7']
  } else if (state.scratch === 'right') {
    return ['1', '2', '3', '4', '5', '6', '7', 'SC', 'SC2']
  } else {
    return ['1', '2', '3', '4', '5', '6', '7']
  }
}

function getKeyboardMapping (state) {
  let mapping = { }
  for (let control of ['1', '2', '3', '4', '5', '6', '7', 'SC', 'SC2']) {
    let key = 'input.P1.keyboard.' + state.mode + '.' + control
    mapping[control] = +state.options[key] || -1
  }
  return mapping
}

const $mode     = OptionsStore.map(state => state.mode)
const $scratch  = OptionsStore.map(state => state.scratch)
const $texts    = $keyCodes.map((keyCodes) => _.mapValues(keyCodes, toText))
const $editing  = Bacon.update(null,
    [Actions.selectKey.bus],    (prev, key) => key,
    [Actions.deselectKey.bus],  () => null,
    [Actions.selectNextKey.bus, $order], (prev, key, order) => {
      let index = order.indexOf(key)
      if (index + 1 >= order.length) {
        return null
      } else {
        return order[index + 1]
      }
    })

export default new Store({
  mode:       $mode,
  texts:      $texts,
  editing:    $editing,
  scratch:    $scratch,
  keyCodes:   $keyCodes,
})

function toText (keyCode) {
  return _.capitalize(keycode(keyCode))
}
