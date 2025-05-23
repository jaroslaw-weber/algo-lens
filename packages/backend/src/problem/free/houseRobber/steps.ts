import { sum } from "lodash";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { HouseRobberInput } from "./types"; // Ensure this import exists
import { groups } from "./groups"; // Import groups

// Removed ProblemState import and utils imports as StepLoggerV2 handles variable creation

export function generateSteps(nums: number[]) {
  // Renamed function
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  // Safely find group names
  const dpCalculationGroup =
    groups.find((g) => g.name === "dpCalculation")?.name || "dpCalculation";

  const n = nums.length;
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 0;

  l.arrayV3({ nums }, []);
  l.arrayV3({ dp }, [{ value: 0, label: "here" }]); // Highlight dp[0]
  l.breakpoint(1);
  l.comment =
    "Initialize dp array. dp[0] represents the maximum amount that can be robbed from 0 houses, which is 0.";

  dp[1] = nums[0];

  l.arrayV3({ nums }, [{ value: 0, label: "here" }]); // Highlight nums[0]
  l.arrayV3({ dp }, [{ value: 1, label: "here" }]); // Highlight dp[1]
  l.breakpoint(2);
  l.comment =
    "Set the base case for dp[1]. dp[1] represents the maximum amount that can be robbed from the first house, which is the value of the first house.";

  for (let i = 2; i <= n; i++) {
    const skipCurrent = dp[i - 1];
    const twoHousesBefore = dp[i - 2];
    const currentHouse = nums[i - 1];
    const includeCurrent = twoHousesBefore + currentHouse;
    dp[i] = Math.max(skipCurrent, includeCurrent);

    l.arrayV3({ nums }, [{ value: i - 1, label: "i - 1" }]); // Highlight current house
    l.arrayV3({ dp }, [
      { value: i, label: "i" },
      { value: i - 1, label: "i - 1" },
      { value: i - 2, label: "i - 2" },
    ]); // Highlight relevant dp values
    l.groupOptions.set(dpCalculationGroup, { min: 0, max: sum(nums) }); // Assuming min: 0 is a reasonable default. Adjust if context suggests otherwise.
    l.group(dpCalculationGroup, {
      // Use defined group name
      skipCurrent,
      includeCurrent,
      twoHousesBefore,
      currentHouse,
    });
    l.breakpoint(3);
    l.comment = `Calculate the maximum amount that can be robbed up to the current house. This is the maximum of either skipping the current house (inheriting the max from the previous house, ${skipCurrent}) or including the current house (adding its value, ${currentHouse}, to the max from two houses before, ${twoHousesBefore}). The maximum amount up to this house is ${dp[i]}.`;
  }

  const result = dp[n];

  l.arrayV3({ nums: nums }, []);
  l.arrayV3({ dp: dp }, [{ value: n, label: "n" }]); // Highlight final result in dp array
  l.simple({ result }); // Log result in its group
  l.breakpoint(4);
  l.comment = `All houses have been considered. The final result, ${result}, is the maximum amount that can be robbed from all houses.`;

  return l.getSteps(); // Return steps from StepLoggerV2
}
