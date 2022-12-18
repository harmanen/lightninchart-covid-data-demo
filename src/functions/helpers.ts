// A helper function to find correct array indices
export const findVariableIndex = (headers: [], keyword: string): number => {
  return headers.findIndex(item => item === keyword)
}
