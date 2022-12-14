import React, { useState, useEffect } from 'react';
import './App.css'

const App = (props) => {
  const url = "https://covid.ourworldindata.org/data/owid-covid-data.csv"
  
  const [ rawData, setRawData ] = useState("")

  fetch(url)
    .then(response => response.text())
    .then(text => setRawData(text))
  
  useEffect(() => {
    if (rawData.length > 0) {
      // Make array of arrays per row from the csv
      const rows = rawData.split("\n").map(item => item.split(","))

      // Take the header row out
      const headers = rows.shift()

      // Add data handling later
      // console.log(headers)
      // console.log(rows)
  }}, [rawData])

  return <div className='App'>
    Add here
  </div>
}

export default App
