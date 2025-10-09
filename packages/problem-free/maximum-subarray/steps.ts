import { ProblemState } from "@algolens/core/src/types";

import { StepLoggerV2 } from "@algolens/core/src/StepLoggerV2"; // Adjusted path
import { MaximumSubarrayInput } from "./types";
import { groups } from "./groups"; // Import groups
import _, { sum } from "lodash"; // Import sum for potential range calculation if needed

export function generateSteps(nums: number[]): ProblemState[] {
  const l = new StepLoggerV2();
  l.groupOptions.set("comparision", {
    min: _.min(nums),
    max: _.max(nums),
  });

  let maxEndingHere = nums[0];
  let maxSoFar = nums[0];

  // Log initial state
  l.arrayV3({ nums: nums }, []);
  l.group("comparision", { maxEndingHere, maxSoFar });
  l.comment = `Initialize maxEndingHere and maxSoFar.`;
  l.breakpoint(1);

  // Iterate through the array starting from the second element.
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    // Log state at the beginning of the loop
    l.arrayV3({ nums: nums }, [
      { dimension: "column", value: i, label: `Current`, color: "primary" },
    ]); // Highlight current number

    // Kadane's logic: Decide whether to extend the current subarray or start a new one.
    const extendSum = maxEndingHere + num;
    const startNew = num;
    // HIDE_START
    l.group("comparision", {
      startNew,
      extendSum,
      maxEndingHere,
      maxSoFar,
      num,
    });
    // HIDE_END
    l.comment = `Current number is ${num}.`;
    l.breakpoint(2);

    if (startNew > extendSum) {
      // Log state before updating maxEndingHere
      l.arrayV3({ nums: nums }, [
        {
          dimension: "column",
          value: i,
          label: `starting new`,
          color: "error",
        },
      ]);
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `New subarray is better.`;

      l.breakpoint(3);
      maxEndingHere = startNew;

      // Log state after updating maxEndingHere
      l.arrayV3({ nums: nums }, [
        {
          dimension: "column",
          value: i,
          label: `starting new`,
          color: "error",
        },
      ]);
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `maxEndingHere is ${maxEndingHere}.`;
      l.breakpoint(4);
    } else {
      // Log state before updating maxEndingHere
      l.arrayV3({ nums: nums }, [
        {
          dimension: "column",
          value: i,
          label: `extending`,
          color: "info",
        },
      ]);
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `Extend previous subarray.`;

      l.breakpoint(5);
      maxEndingHere = extendSum;

      // Log state after updating maxEndingHere
      l.arrayV3({ nums: nums }, [
        {
          dimension: "column",
          value: i,
          label: `extending`,
          color: "info",
        },
      ]);
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `maxEndingHere is ${maxEndingHere}.`;
      l.breakpoint(6);
    }

    // Update maxSoFar
    // Log state before updating maxSoFar
    l.arrayV3({ nums: nums }, [
      { dimension: "column", value: i, label: `Current`, color: "primary" },
    ]);
    // HIDE_START
    l.group("comparision", {
      startNew,
      extendSum,
      maxEndingHere,
      maxSoFar,
      num,
    });
    // HIDE_END
    l.comment = `Compare maxEndingHere with maxSoFar.`;

    l.breakpoint(7);
    if (maxEndingHere > maxSoFar) {
      // Log state before updating maxSoFar
      l.arrayV3({ nums: nums }, [
        { dimension: "column", value: i, label: `New Max`, color: "success" },
      ]);
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `New overall maximum sum found.`;

      l.breakpoint(8);
      maxSoFar = maxEndingHere;

      // Log state after updating maxSoFar
      l.arrayV3({ nums: nums }, [
        { dimension: "column", value: i, label: `New Max`, color: "success" },
      ]);
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `maxSoFar updated to ${maxSoFar}.`;
      l.breakpoint(9);
    } else {
      // Log state if maxSoFar is not updated
      l.arrayV3({ nums: nums }, [
        { dimension: "column", value: i, label: `Current`, color: "primary" },
      ]);
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `Overall maximum sum remains ${maxSoFar}.`;

      l.breakpoint(10);
    }
    // End of loop iteration
  }

  // Final state log
  l.arrayV3({ nums: nums }, []);
  l.group("comparision", { maxEndingHere, maxSoFar });
  const result = maxSoFar;
  l.simple({ result });
  l.comment = `Final max subarray sum is ${maxSoFar}.`;
  l.breakpoint(11);

  return l.getSteps();
}
