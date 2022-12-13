// A helper function to convert CSV data.
// See tests for expected input and output.

export const convertCsv = (csvString: string) => {
  if (!csvString) {
    throw new Error("Input data missing?")
  }

  // Move rows to an array of array
  const rows = csvString.split("\n")

  // Take headers string out and convert to array
  const headers = rows.shift()?.split(",")

  if (!headers) {
    throw new Error("Input data not comma separated?")
  }

  // Generate output
  return rows.reduce((soFar: Array<{}>, item: string) => {
    let currentRow = {}

    // Take the current row string, split it to list and loop over
    // to generate a row object
    for (const [index, value] of item.split(",").entries()) {
      currentRow[headers[index]] = value
    }

    return [...soFar, currentRow]
  }, [])
}
