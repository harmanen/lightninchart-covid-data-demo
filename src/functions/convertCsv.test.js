import { convertCsv } from './convertCsv'

var assert = require('assert');

const inputString = `headerA,headerB,headerC
value1A,value1B,value1C
value2A,value2B,value2C
value3A,value3B,value3C`

const expectedOutput = [
  {
    "headerA": "value1A",
    "headerB": "value1B",
    "headerC": "value1C"
  },
  {
    "headerA": "value2A",
    "headerB": "value2B",
    "headerC": "value2C"
  },
  {
    "headerA": "value3A",
    "headerB": "value3B",
    "headerC": "value3C"
  }
]

it('should handle conversion', () => {
  assert.deepStrictEqual(convertCsv(inputString), expectedOutput)
})
