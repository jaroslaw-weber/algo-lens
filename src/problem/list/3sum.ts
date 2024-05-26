import { Problem, ProblemState, Variable } from "../types";
import {
  asArray,
  asSimpleValue,
  asHashset,
  asBooleanGroup,
  asHashmap,
  asValueGroup,
} from "../utils";

interface ThreeSumInput {
  nums: number[];
}

export function threeSum(p: ThreeSumInput): ProblemState[] {
  const nums = [...p.nums];
  const target = 0;
  const result = [];

  let indices: number[] = [];
  let triplet: number[] = [];

  const steps: ProblemState[] = [];
  const seen = new Set<string>(); // To track unique triplets
  log(1);
  nums.sort((a, b) => a - b); // Sort the array to handle triplets logically

  function log(point: number) {
    const v: Variable[] = [];
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
    };
    v.push(...asSimpleValue({ target }));
    const sum = triplet?.reduce((a, b) => a + b, 0);
    v.push(asArray("nums", nums, ...(indices ?? [])));
    if (triplet.length > 0) {
      v.push(
        asValueGroup(
          "triplet",
          {
            a: triplet[0],
            b: triplet[1],
            c: triplet[2],
            sum,
          },
          { min: -20, max: 20 }
        )
      );
    }
    v.push(
      ...asSimpleValue({
        result: result.map((t) => "[" + t.join(",") + "]").join(","),
      })
    );
    if (sum !== undefined) {
      v.push(asBooleanGroup("found triplet? ", { found: sum == 0 }));
    }

    steps.push(step);
  }

  log(2);

  for (let i = 0; i < nums.length - 2; i++) {
    log(3);
    if (i > 0 && nums[i] === nums[i - 1]) {
      log(4);
      continue; // Skip duplicates
    }
    let left = i + 1;
    let right = nums.length - 1;
    indices = [i, left, right];
    triplet = [nums[i], nums[left], nums[right]];
    log(5);
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      indices = [i, left, right];
      triplet = [nums[i], nums[left], nums[right]];
      log(6);

      if (sum === target) {
        log(7);
        const tripletKey = triplet.join(",");
        if (!seen.has(tripletKey)) {
          seen.add(tripletKey);
          result.push(triplet);
          log(8);
        }

        while (left < right && nums[left] === nums[left - 1]) {
          left++;
          log(9);
        } // Skip duplicates
        while (left < right && nums[right] === nums[right + 1]) {
          right--;
          log(10);
        } // Skip duplicates
        log(11);
        left++;
        right--;
        log(12);
      } else if (sum < target) {
        left++;
        log(13);
      } else {
        right--;
        log(14);
      }
    }
  }

  log(15);
  return steps;
}
export const threeSumProblem: Problem<ThreeSumInput, ProblemState> = {
  title: "Three Sum",
  code: `function threeSum(nums: number[]): number[][] {
    //#1
    const target = 0;
    nums.sort((a, b) => a - b); // Sort the array
    const seen = new Set(); // To track unique triplets
    const result = [];
    //#2
    for (let i = 0; i < nums.length - 2; i++) {
      //#3
      if (i > 0 && nums[i] === nums[i - 1]) 
        {
          //#4
          continue; // Skip duplicate 'i' elements
        } 
      let left = i + 1
      let right = nums.length - 1;
      //#5
      while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];
        //#6
        if (sum === target) {
          const triplet = [nums[i], nums[left], nums[right]];
          const tripletKey = triplet.join(',');
          //#7
          if (!seen.has(tripletKey)) {
            seen.add(tripletKey);
            result.push(triplet); // Add unique triplet to the result
            //#8
          }
          while (left < right && nums[left] === nums[left + 1]) 
            {
              left++; // Skip duplicate 'left' elements

            //#9
            }
          while (left < right && nums[right] === nums[right - 1]) 
            {
              right--; 

              //#10
            }// Skip duplicate 'right' elements
          //#11
          left++; 
          right--;
          //#12
        } else if (sum < target) {
          left++; // Need more positive to reach zero
          //#13
        } else {
          right--; // Need more negative to reach zero
          //#14
        }
      }
    }
    //#15
    return result;
  }`,
  getInput: () => ({
    nums: [-1, 0, 1, 2, -1, -4, 4, 3, -3, 0],
  }),

  func: threeSum,
  id: "3sum",
  tags: ["array", "hash set"],
  tested: true,
};
