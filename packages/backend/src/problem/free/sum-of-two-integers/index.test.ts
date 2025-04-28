import { sumOfTwoIntegersProblem } from "./problem";
import testcases from "./testcase";

// Simple reference solution (can be moved to solution.ts)
// Note: This uses standard addition, which the problem avoids.
// The test focuses on the *result* which should match standard addition.
function solution(a: number, b: number): number {
    return a + b;
}

describe("Sum of Two Integers (Bitwise)", () => {
  // Test the visualizer function (steps generation)
  it("should generate steps for test cases", () => {
    testcases.forEach((testcase) => {
      const steps = sumOfTwoIntegersProblem.func(testcase);
      expect(steps).toBeInstanceOf(Array);
      expect(steps.length).toBeGreaterThan(0); // Should always have at least initial/final state
    });
  });

  // Test the example code string (optional)
  it("should have valid example code", () => {
    expect(sumOfTwoIntegersProblem.code).toBeTruthy();
  });

  // Test the getInput function
  it("should return a valid input object", () => {
    const input = sumOfTwoIntegersProblem.getInput();
    expect(input).toHaveProperty("a");
    expect(input).toHaveProperty("b");
    expect(typeof input.a).toBe('number');
    expect(typeof input.b).toBe('number');
  });

  // Test the final state of the calculation against the reference solution
  it("should have the final step reflecting the correct sum", () => {
     testcases.forEach(testcase => {
       const expectedResult = solution(testcase.a, testcase.b);
       const steps = sumOfTwoIntegersProblem.func(testcase);
       const lastStep = steps[steps.length - 1];

       expect(lastStep).toBeDefined();

       // Find the 'a' variable in the last step (which holds the result)
       const resultVariable = lastStep.variables.find(v => v.id === 'a');
       expect(resultVariable).toBeDefined();

       // Check the value stored in the result variable
       // Adjust 'meta.value' or 'value' based on the actual structure from asBinary
       expect(resultVariable?.value).toEqual(expectedResult);

       // Also check that 'b' is 0 in the final step
       const bVariable = lastStep.variables.find(v => v.id === 'b');
        expect(bVariable).toBeDefined();
        expect(bVariable?.value).toEqual(0);
     });
   });
});
