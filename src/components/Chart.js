import React, { useEffect } from 'react'

import {
  lightningChart,
  AxisTickStrategies,
  LegendBoxBuilders,
  UILayoutBuilders,
  UIOrigins,
  UIDraggingModes,
} from '@arction/lcjs'

import { CHART_TITLE, DATE_ORIGIN } from '../constants';

const Chart = (props) => {
  const { data, id, yMax } = props

  useEffect(() => {
    // Create Dashboard and stand-alone LegendBox.
    const db = lightningChart().Dashboard({
      numberOfRows: 3,
      numberOfColumns: 1,
      container: id
    })
    
    // Create a legendBox docked to the Dashboard.
    const legend = db.createLegendBoxPanel({
        columnIndex: 0,
        rowIndex: 2,
        columnSpan: 1,
        rowSpan: 1
    })

    // Chart
    {
      const chart = db.createChartXY({
        columnIndex: 0,
        rowIndex: 0,
        columnSpan: 1,
        rowSpan: 2
      })

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
      
      // Add to LegendBox
      legend.add(chart)
    }

  }, [id, data, yMax])

  return <div id={id} className='chart'></div>
}

export default Chart