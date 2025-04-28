import { sameTreeProblem } from "./problem";
import testcases from "./testcase";
import { TreeNode } from "algo-lens-core";
// Assume a reference solution exists or define one inline
// import { isSameTree as solution } from "./solution"; // Ideal

// Simple reference solution (can be moved to solution.ts)
function solution(p: TreeNode | null, q: TreeNode | null): boolean {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;
    return solution(p.left, q.left) && solution(p.right, q.right);
}


describe("Same Tree Check", () => {
  // Test the visualizer function (steps generation)
  it("should generate steps for test cases", () => {
    testcases.forEach((testcase) => {
      const steps = sameTreeProblem.func(testcase);
      expect(steps).toBeInstanceOf(Array);
      // Optionally check if steps array is not empty for non-null inputs
      if (testcase.p || testcase.q) {
           expect(steps.length).toBeGreaterThan(0);
      }
    });
  });

  // Test the example code string (optional)
  it("should have valid example code", () => {
    expect(sameTreeProblem.code).toBeTruthy();
  });

  // Test the getInput function
  it("should return a valid input object", () => {
    const input = sameTreeProblem.getInput();
    expect(input).toHaveProperty("p");
    expect(input).toHaveProperty("q");
     // Allow null or object type for tree nodes
    expect(input.p === null || typeof input.p === 'object').toBe(true);
    expect(input.q === null || typeof input.q === 'object').toBe(true);
  });

  // Test the generated steps against the reference solution's final output
  it("should have the final step reflecting the correct result", () => {
     testcases.forEach(testcase => {
       const expectedResult = solution(testcase.p, testcase.q);
       const steps = sameTreeProblem.func(testcase);
       
       // Find the last step that includes the result variable
       const finalResultStep = steps.slice().reverse().find(step => 
           step.variables.some(v => v.id === 'is node same?')
       );

       // If both inputs are null, steps might be minimal, handle this case
       if (testcase.p === null && testcase.q === null) {
           expect(expectedResult).toBe(true);
           // Check if the first step correctly identifies them as same (breakpoint 2)
           expect(steps[0]?.breakpoint).toBe(2); 
           const resultVar = steps[0]?.variables.find(v => v.id === 'is node same?');
           expect(resultVar?.meta?.value?.result).toBe(true); // Adjusted path based on asResult variable structure
           return; // Skip further checks for null case
       }

       // For non-null cases, check the final result step
       expect(finalResultStep).toBeDefined(); // Ensure a result step was found

       const resultVariable = finalResultStep?.variables.find(v => v.id === 'is node same?');
       expect(resultVariable).toBeDefined();
       // Check the actual value within the variable's meta information
       // Adjust 'value.result' based on the actual structure of the 'asResult' variable
       expect(resultVariable?.meta?.value?.result).toEqual(expectedResult); 
     });
   });
});
