import { StepLoggerV2 } from '@algo-lens/problem-template';
import type { ContainsDuplicateInput } from './types';

export function generateSteps(p: ContainsDuplicateInput) {
  const l = new StepLoggerV2();
  const { nums } = p;
  let result = false; // Initialize result

  // Initial state logging
  l.array('nums', nums);
  l.snapshot('Initial input array');

  const seenSet = new Set<number>();
  l.set('seenSet', seenSet); // Log empty initial set
  l.boolean('result', result);
  l.snapshot('Initialized seenSet and result');

  // Breakpoint #1: Initialize seen set. Start loop.
  l.breakpoint(1);

  for (let i = 0; i < nums.length; i++) {
    l.simple('i', i);
    l.array('nums', nums, { ptr: i, label: 'i' }); // Highlight current index
    l.snapshot(`Loop start: i = ${i}`);

    // Breakpoint #2: Inside loop. Get current number nums[i].
    const num = nums[i];
    l.simple('num', num);
    l.snapshot(`Current number nums[${i}] = ${num}`);
    l.breakpoint(2);

    // Breakpoint #3: Check if the current number is already in the seen set.
    const hasNum = seenSet.has(num);
    l.set('seenSet', seenSet, { item: num, label: `Has ${num}?`, color: hasNum ? 'error' : 'neutral' }); // Highlight check
    l.snapshot(`Checking if seenSet has ${num}: ${hasNum}`);
    l.breakpoint(3);

    if (hasNum) {
      // Breakpoint #4: Duplicate found. Return true.
      result = true;
      l.boolean('result', result);
      l.array('nums', nums, { ptr: i, label: 'Duplicate!', color: 'error' });
      l.snapshot(`Duplicate found: ${num}. Setting result = true.`);
      l.breakpoint(4);
      break; // Exit loop as duplicate is found
    } else {
      // Breakpoint #5: Number not seen before. Add it to the seen set.
      l.snapshot(`Number ${num} not in seenSet. Adding it.`);
      l.breakpoint(5);
      seenSet.add(num);
      l.set('seenSet', seenSet, { item: num, label: `Added ${num}`, color: 'success' }); // Highlight added item
      l.snapshot(`Added ${num} to seenSet.`);
    }
    // Breakpoint #6: End of loop iteration. Continue loop.
    l.snapshot(`End of iteration for i = ${i}.`);
    l.breakpoint(6);
  }

  // Breakpoint #7: Loop finished. If result is still false, no duplicates found.
  l.boolean('result', result);
  if (result) {
      l.snapshot('Loop finished. Duplicate was found.');
  } else {
       l.snapshot('Loop finished. No duplicates found.');
  }
  l.breakpoint(7);

  return l.getSteps();
}
