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
    const seriesList = Object
      .entries(data)
      .map(([country, values]) => chart
        .addLineSeries()
        .setName(country)
        .add(values))

    // Add multi-line legend
    // https://stackoverflow.com/questions/70271221/how-to-create-horizontal-multiline-legend
    const legendLayout = chart
      .addUIElement(UILayoutBuilders.Column)
      .setPosition({ x: 0, y: 100 })
      .setOrigin(UIOrigins.LeftTop)
      .setMargin(10)
      .setDraggingMode(UIDraggingModes.disabled)
  
    const numberOfRows = 16
    
    const legendList = new Array(numberOfRows).fill(0).map(_ => legendLayout
      .addElement(LegendBoxBuilders.HorizontalLegendBox)
      .setTitle('')
      .setMargin(0)
      .setPadding(0)
    )

    let legendIndex = 0

    for (let index = 0; index < seriesList.length; index++) {
      if (index > 0 && index % numberOfRows === 0) legendIndex++
      
      // Mainly for debugging
      try {
        legendList[legendIndex].add(seriesList[index])
      } catch (error) {
        console.log("Something went wrong with legend creation, skippind:")
        console.log(index, seriesList[index])
        console.log(error)  
      }
    }
  }, [id, data, yMax])

  return <div id={id} className='chart'></div>
}

export default Chart