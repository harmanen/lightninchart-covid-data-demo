import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import Chart from './components/Chart';
import './App.css'

import {
  DATA_CONSTANTS,
  DATE_ORIGIN_MILLISECONDS,
  LOCAL_DATA_FILE, USE_LOCAL_DATA,
} from './constants';

import { findVariableIndex } from './functions/helpers.ts';
import DatePicker from './components/DatePicker.tsx';
import { theme } from './theme.ts';

const App = (props) => {  
  const [rawData, setRawData] = useState("")
  
  const [data, setData] = useState([])

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

          if (country === "Finland") {
            return {
              // Calculate time difference in milliseconds
              x: new Date(date).getTime() - DATE_ORIGIN_MILLISECONDS,
              // Number of patients or 0 if no data
              y: patients || "0.0",
            }
          }

          return null
        })
        // Filter out other countries
        .filter(item => item !== null)
        // Filter out zero values. This is okay because after
        // the initial rise all zero values are probably missing data
        .filter(item => item.y > 0)

      setData(finnishData)
    }
  }, [rawData])

  return (
    <ThemeProvider theme={theme}>
      <div className='fill'>
        <DatePicker/>
        {rawData.length && <Chart id="chart1" data={data}/>}
      </div>
    </ThemeProvider>)
}

export default App
