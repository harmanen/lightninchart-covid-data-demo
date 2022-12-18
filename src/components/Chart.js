import { lightningChart, AxisTickStrategies } from '@arction/lcjs'
import React, { useRef, useEffect } from 'react'
import { CHART_TITLE, DATE_ORIGIN } from '../constants';

const Chart = (props) => {
    const { data, id } = props
    const chartRef = useRef(undefined)
  
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
          // Find the max y value and increase by 10 %
          Math.max(...data.map(item => Number(item.y))) * 1.1
        ) 

      const series = chart.addLineSeries()
      // Store references to chart components.
      chartRef.current = { chart, series }
  
      // Return function that will destroy the chart when component is unmounted.
      return () => {
        // Destroy chart.
        console.log('destroy chart')
        chart.dispose()
        chartRef.current = undefined
      }
    }, [id, data])
  
    useEffect(() => {
      const components = chartRef.current
      if (!components) return
  
      // Set chart data.
      const { series } = components
      console.log('set chart data', data)
      series.clear().add(data)
    
    }, [data, chartRef])
  
    return <div id={id} className='chart'></div>
}

export default Chart