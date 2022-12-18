import { lightningChart, AxisTickStrategies, LegendBoxBuilders } from '@arction/lcjs'
import React, { useEffect } from 'react'
import { CHART_TITLE, DATE_ORIGIN } from '../constants';

const Chart = (props) => {
  const { data, id, yMax } = props

  useEffect(() => {
    // Create chart, series and any other static components.
    // NOTE: console log is used to make sure that chart is only created once, even if data is changed!
    console.log('create chart')
    const chart = lightningChart().ChartXY({ container: id })
    
    chart.setTitle(CHART_TITLE)

    // Use DateTime X-axis with origin
    chart
    .getDefaultAxisX()
    .setTickStrategy(
      AxisTickStrategies.DateTime,
      (tickStrategy) => tickStrategy.setDateOrigin(DATE_ORIGIN)
    )

    // Use default y axis
    chart
      .getDefaultAxisY()
      .setTitle("Number of patients (normalized)")
      .setInterval(
        0,
        // Increse max value by 10 % to get some "air"
        yMax.current * 1.1
      ) 

    // Dynamically add lines
    Object
      .entries(data)
      .map(([country, values]) => chart
        .addLineSeries()
        .setName(country)
        .add(values))

    // Add legend
    chart
      .addLegendBox(LegendBoxBuilders.HorizontalLegendBox)
      .add(chart)

  }, [id, data, yMax])

  return <div id={id} className='chart'></div>
}

export default Chart