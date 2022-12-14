// https://en.wikipedia.org/wiki/COVID-19
export const DATE_ORIGIN = new Date("2001-12-01T00:00:00")

export const DATE_ORIGIN_MILLISECONDS = DATE_ORIGIN.getTime()

// Data url and some array indices for relevant values
// in the csv-turned-to-an-array.
export const DATA_CONSTANTS = {
  URL: "https://covid.ourworldindata.org/data/owid-covid-data.csv",
  INDEX_DATE: 3,
  INDEX_ICU_PATIENTS_PER_MILLION: 12,
  INDEX_COUNTRY: 2,
}

export const CHART_TITLE = "Covid patients in the intensive care"
