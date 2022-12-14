import React, { useState, useEffect } from 'react';
import Chart from './components/Chart';
import './App.css'
import { DATA_CONSTANTS, DATE_ORIGIN_MILLISECONDS } from './constants';
import { findVariableIndex } from './functions/helpers.ts';

const App = (props) => {  
  const [rawData, setRawData] = useState("")
  
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(DATA_CONSTANTS.URL)
    .then(response => response.text())
    .then(text => setRawData(text))
  }, [rawData])

  useEffect(() => {
    if (rawData.length > 0) {
      // Make array of arrays per row from the csv
      const rows = rawData.split("\n").map(item => item.split(","))

      // Take the header row out
      const headers = rows.shift()



      const indexDate = findVariableIndex(headers, DATA_CONSTANTS.DATE)
      const indexCountry = findVariableIndex(headers, DATA_CONSTANTS.COUNTRY)
      const indexPatients = findVariableIndex(headers, DATA_CONSTANTS.PATIENTS)
      
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
        .filter(item => item !== null)

      setData(finnishData)
    }
  }, [rawData])

  return <div className='fill'>
    {rawData.length && <Chart id="chart1" data={data}/>}
  </div>
}

export default App
