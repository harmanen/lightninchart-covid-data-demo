import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import Chart from './components/Chart';
import './App.css'

import {
  DATA_CONSTANTS,
  DATE_ORIGIN,
  DATE_ORIGIN_MILLISECONDS,
  LOCAL_DATA_FILE, USE_LOCAL_DATA,
} from './constants';

import { findVariableIndex } from './functions/helpers.ts';
import DatePicker from './components/DatePicker.tsx';
import { theme } from './theme.ts';

const App = (props) => {
  // Raw .csv
  const [rawData, setRawData] = useState("")

  // Wrangled data (date filter etc.)
  const [data, setData] = useState([])

  // Do not show plot until "Render" is clicked
  const [isRenderClicked, setIsRenderClicked] = useState(false)

  // Time range from selector component
  const [timeRange, setTimeRange] = useState({
    dateMin: DATE_ORIGIN,
    dateMax: new Date()
  })

  useEffect(() => {
    // Fetch data locally or online based on current setting
    fetch(USE_LOCAL_DATA ? LOCAL_DATA_FILE : DATA_CONSTANTS.URL)
    .then(response => response.text())
    .then(text => setRawData(text))
  }, [rawData])

  useEffect(() => {
    if (rawData.length > 0) {
      // Make array of arrays per row from the csv
      const rows = rawData.split("\n").map(item => item.split(","))

      // Take the header row out
      const headers = rows.shift()

      // Find array indices for relevant variables
      const indexDate = findVariableIndex(headers, DATA_CONSTANTS.DATE)
      const indexCountry = findVariableIndex(headers, DATA_CONSTANTS.COUNTRY)
      const indexPatients = findVariableIndex(headers, DATA_CONSTANTS.PATIENTS)
      
      // Find data for Finland and generate input objects for the chart
      const finnishData = rows
        .map(item => {
          const date = item[indexDate]
          const country = item[indexCountry]
          const patients = item[indexPatients]
          const dateObject = new Date(date)

          // Filter by date range
          if (
            country === "Finland"
            && dateObject >= timeRange.minValue
            && dateObject <= timeRange.maxValue
          ) {
            return {
              // Calculate time difference in milliseconds
              x: dateObject.getTime() - DATE_ORIGIN_MILLISECONDS,
              // Number of patients or NA if no data
              y: patients || "NA",
            }
          }

          return null
        })
        // Filter out other countries
        .filter(item => item !== null)
        // Filter out missing data
        .filter(item => item.y !== "NA")

      setData(finnishData)
    }
  }, [rawData, timeRange])

  return (
    <ThemeProvider theme={theme}>
      <div className='fill'>
        <DatePicker
          setTimeRange={setTimeRange}
          setIsRenderClicked={setIsRenderClicked}
        />
        {isRenderClicked && <Chart id="chart1" data={data}/>}
      </div>
    </ThemeProvider>)
}

export default App
