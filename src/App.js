import React, { useState, useEffect, useRef } from 'react';
import { Box, Slide, ThemeProvider } from '@mui/material';
import './App.css'
import { theme } from './theme.ts';

import {
  DATA_CONSTANTS,
  DATE_ORIGIN,
  DATE_ORIGIN_MILLISECONDS,
  LOCAL_DATA_FILE, USE_LOCAL_DATA,
} from './constants';

import { findVariableIndex } from './functions/helpers.ts';
import Chart from './components/Chart';
import DatePicker from './components/DatePicker.tsx';
import { LoadingIndicator } from './components/LoadingIndicator.tsx';

const App = (props) => {
  // Raw .csv
  const [rawData, setRawData] = useState("")

  // Wrangled data (date filter etc.)
  const [data, setData] = useState([])

  // Disable "Render" button until data is fetched
  const [isDataFetched, setIsDatafetched] = useState(false)

  // Do not show plot until "Render" is clicked
  const [isRenderClicked, setIsRenderClicked] = useState(false)

  // Time range from selector component
  const [timeRange, setTimeRange] = useState({
    dateMin: DATE_ORIGIN,
    dateMax: new Date()
  })

  // Hold maximum for y axis. There probably is a better way to do this...?
  let yMax = useRef(0)

  // Required for Slider animation of LoadingIndicator
  const slideContainerRef = React.useRef(null)

  useEffect(() => {
    // Fetch data locally or online based on current setting
    fetch(USE_LOCAL_DATA ? LOCAL_DATA_FILE : DATA_CONSTANTS.URL)
      .then(response => response.text())
      .then(text => setRawData(text))
      .finally(() => {if(rawData.length) setIsDatafetched(true) })
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
      
      // Generate data object
      // Keys are country names
      // Values are lists of objects with x, y data values
      const data = rows
        .reduce((soFar, item) => {
          const date = item[indexDate]
          const country = item[indexCountry]
          const patients = item[indexPatients]
          const dateObject = new Date(date)

          let datum = null

          // Filter by date range and add data if within range
          // Update yMax if needed
          if(
            dateObject >= timeRange.minValue
            && dateObject <= timeRange.maxValue
          ) {
            if (Number(patients) > yMax.current) yMax.current = patients
            datum = {
              // Calculate time difference in milliseconds
              x: dateObject.getTime() - DATE_ORIGIN_MILLISECONDS,
              // Number of patients or NA if no data  
              y: patients || "NA",
            }
          }
          
          // Initialize new countyry if not present
          if(!soFar[country]) soFar[country] = []
          
          return {
            ...soFar,
            [country]: [...soFar[country], datum]
          }
        }, {})
      
      // Filter bad data and create a new data object
      let filteredData = {}

      Object.entries(data).forEach(([key, value]) => {
        filteredData[key] = value.filter(item => (
          item !== null
          && item.y !== "NA"
        ))
      })

      setData(filteredData)
    }
  }, [rawData, timeRange])

  return (
    <ThemeProvider theme={theme}>
      <Box className='fill' ref={slideContainerRef}>
        <DatePicker
          setTimeRange={setTimeRange}
          setIsRenderClicked={setIsRenderClicked}
          isDataFetched={isDataFetched}
        />
        {isRenderClicked && <Chart id="chart1" data={data} yMax={yMax}/>}
        <Slide
          direction='up'
          in={!isDataFetched}
          container={slideContainerRef.current}
        >
          {LoadingIndicator}
        </Slide>
      </Box>
    </ThemeProvider>)
}

export default App
