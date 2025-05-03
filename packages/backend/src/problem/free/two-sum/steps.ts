import { StepLoggerV2 } from '@algo-lens/problem-template';
import type { TwoSumInput } from './types';

export function generateSteps(p: TwoSumInput) {
  const l = new StepLoggerV2();
  const { nums, target } = p;
  const seen = new Map<number, number>();
  let result: number[] | undefined = undefined;

  // Initial state
  l.array('nums', nums);
  l.simple('target', target);
  l.hashmap('seen', seen);
  l.snapshot('Initial state');

  // Breakpoint #1: Before the loop starts
  l.breakpoint(1);

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;

    // Update loop variables and array pointer for visualization
    l.simple('i', i);
    l.simple('complement', complement);
    l.array('nums', nums, { ptr: i, label: 'i' }); // Highlight current element
    l.snapshot(`Checking element at index ${i}`);

    // Breakpoint #2: Inside the loop, before checking the map
    l.breakpoint(2);

    if (seen.has(complement)) {
      const complementIndex = seen.get(complement)!;
      result = [complementIndex, i];

      // Log the found result
      l.array('result', result);
      // Highlight both numbers in the array
      l.array('nums', nums, [
        { ptr: i, label: 'i', color: 'success' },
        { ptr: complementIndex, label: 'complement', color: 'success' },
      ]);
      l.snapshot(`Found pair: nums[${complementIndex}] (${nums[complementIndex]}) + nums[${i}] (${num}) = ${target}`);

      // Breakpoint #3: Found the complement, about to return
      l.breakpoint(3);
      break; // Exit loop as solution is found
    }

    // Breakpoint #4: Complement not found, adding current number to map
    // Log *before* adding to map to show the state just before the change
    l.hashmap('seen', seen); // Show current map state
    l.snapshot(`Complement ${complement} not in seen map`);
    l.breakpoint(4);

    seen.set(num, i);
    // Log *after* adding to map to show the updated map
    l.hashmap('seen', seen, { key: num, label: `nums[${i}]`, color: 'info' }); // Highlight added element
    l.snapshot(`Added nums[${i}] (${num}) -> index ${i} to seen map`);
  }

  // Breakpoint #5: After the loop (only reached if no solution found, though problem guarantees one)
  if (result === undefined) {
      l.snapshot("Loop finished, no solution found (this shouldn't happen based on constraints)");
      l.breakpoint(5);
      // Optionally log an empty result or error indicator
      l.array('result', []);
      l.snapshot("Returning empty result");
  }


  return l.getSteps();
}
