import { equal } from "assert"
import { findVariableIndex } from "./helpers"

it("should find correct index", () => {
  const input = ["a", "b", "c"]
  
  equal(findVariableIndex(input, "b"), 1)
})
