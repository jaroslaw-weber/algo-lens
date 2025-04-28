import { searchProblem } from "./problem";
import testcases from "./testcase";
// Assume a reference solution exists or define one inline
// import { search as solution } from "./solution"; // Ideal

// Simple reference solution (can be moved to solution.ts)
function solution(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Check if left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // Target is in the left sorted half
            } else {
                left = mid + 1; // Target is in the right half (which might be rotated)
            }
        }
        // Otherwise, right half must be sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1; // Target is in the right sorted half
            } else {
                right = mid - 1; // Target is in the left half (which might be rotated)
            }
        }
    }
    return -1; // Target not found
}


describe("Search in Rotated Sorted Array", () => {
  // Test the visualizer function (steps generation)
  it("should generate steps for test cases", () => {
    testcases.forEach((testcase) => {
      const steps = searchProblem.func(testcase);
      expect(steps).toBeInstanceOf(Array);
      expect(steps.length).toBeGreaterThan(0);
    });
  });

  // Test the example code string (optional)
  it("should have valid example code", () => {
    expect(searchProblem.code).toBeTruthy();
  });

  // Test the getInput function
  it("should return a valid input object", () => {
    const input = searchProblem.getInput();
    expect(input).toHaveProperty("nums");
    expect(input).toHaveProperty("target");
    expect(input.nums).toBeInstanceOf(Array);
    expect(typeof input.target).toBe('number');
  });

  // Test the generated steps against the reference solution's final output
  it("should have the final step reflecting the correct result index or -1", () => {
     testcases.forEach(testcase => {
       const expectedResult = solution(testcase.nums, testcase.target);
       const steps = searchProblem.func(testcase);
       const lastStep = steps[steps.length - 1];

       expect(lastStep).toBeDefined();

       // Find the 'result' variable in the last step
       const resultVariable = lastStep.variables.find(v => v.id === 'result');
       expect(resultVariable).toBeDefined();

       // Check the value stored in the result variable
       // Adjust 'meta.value' based on the actual structure from asSimpleValue
       expect(resultVariable?.meta?.value).toEqual(expectedResult);
     });
   });
});
