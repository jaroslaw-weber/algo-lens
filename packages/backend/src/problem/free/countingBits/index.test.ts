import { it } from "bun:test";
import { problem } from "./problem"; 
import { runTests } from "../../core/test";
import { testcases } from "./testcase"; 

it("countingBits", () => {
  // Assuming runTests can handle comparing final ProblemState variables (like the result array)
  runTests(problem, testcases); 
});
