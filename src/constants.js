// Use pre-downloaded example data for faster development?
export const USE_LOCAL_DATA = false
export const LOCAL_DATA_FILE = "example_data.csv"

// https://en.wikipedia.org/wiki/COVID-19
export const DATE_ORIGIN = new Date("2019-12-01T00:00:00")
export const DATE_ORIGIN_MILLISECONDS = DATE_ORIGIN.getTime()

// Data url and relevant variable names
// https://docs.owid.io/projects/covid/en/latest/dataset.html
export const DATA_CONSTANTS = {
  URL: "https://covid.ourworldindata.org/data/owid-covid-data.csv",
  DATE: "date",
  COUNTRY: "location", // also "International" for cruises etc.
  PATIENTS: "icu_patients_per_million",
}

export const CHART_TITLE = "Number of COVID-19 patients in intensive care units on a given day per 1,000,000 people per region"
