
import './music-info.scss'

import React from 'react'
import MusicChartInfo     from './music-chart-info.jsx'
import MusicChartSelector from './music-chart-selector.jsx'
import MusicInfoTabs      from './music-info-tabs.jsx'

export default React.createClass({

  render() {
    const song  = this.props.song
    const chart = this.props.chart
    return <section className="music-info">
      <MusicChartInfo chart={chart} />
      <MusicChartSelector
          song={song}
          selectedChart={chart}
          charts={this.props.charts}
          onChartClick={this.props.onChartClick} />
      <MusicInfoTabs
          song={song}
          chart={chart}
          onOptions={this.props.onOptions} />
    </section>
  }

})