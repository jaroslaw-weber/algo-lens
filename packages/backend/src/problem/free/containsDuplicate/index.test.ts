import { it } from "bun:test";
import { problem } from "./problem"; 
import { runTests } from "../../core/test";
import { testcases } from "./testcase"; 

it("containsDuplicate", () => {
  // Assuming runTests can handle comparing final ProblemState variables
  runTests(problem, testcases); 
});
