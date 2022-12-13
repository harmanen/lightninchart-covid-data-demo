import React, { useState } from 'react';
import './App.css'

const App = (props) => {

  // All data
  // const url = "https://covid.ourworldindata.org/data/owid-covid-data.csv"
  
  const url = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/hospitalizations/covid-hospitalizations.csv"

  const [ rawData, setRawData ] = useState([])

  fetch(url)
    .then(response => response.text())
    .then(text => setRawData(text))
  
  console.log(rawData)

  return <div className='App'>
    Add here
  </div>
}

export default App
