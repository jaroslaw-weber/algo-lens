import { it } from "bun:test";
import { problem } from "./problem"; 
import { runTests } from "../../core/test";
import { testcases } from "./testcase"; 

it("courseSchedule", () => {
  runTests(problem, testcases); 
});
