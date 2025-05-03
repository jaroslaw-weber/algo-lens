import { StepLoggerV2 } from '@algo-lens/problem-template';
import type { ProductOfArrayExceptSelfInput } from './types';

export function generateSteps(p: ProductOfArrayExceptSelfInput) {
  const l = new StepLoggerV2();
  const { nums } = p;
  const n = nums.length;
  const prefix = new Array(n).fill(1);
  const suffix = new Array(n).fill(1);
  const result = new Array(n).fill(1);

  // Initial state logging
  l.array('nums', nums);
  l.array('prefix', prefix);
  l.array('suffix', suffix);
  l.array('result', result);
  l.snapshot('Initialized arrays');

  // Breakpoint #1: Before prefix calculation loop
  l.breakpoint(1);

  // Prefix pass
  for (let i = 1; i < n; i++) {
    l.simple('i', i);
    l.array('nums', nums, { ptr: i - 1, label: 'i-1' }); // Highlight number used for calculation
    l.array('prefix', prefix, { ptr: i - 1, label: 'i-1' }); // Highlight previous prefix value
    l.snapshot(`Calculating prefix product for index ${i}`);

    prefix[i] = prefix[i - 1] * nums[i - 1];

    l.array('prefix', prefix, { ptr: i, label: 'i', color: 'success' }); // Highlight newly calculated value
    l.snapshot(`prefix[${i}] = prefix[${i - 1}] * nums[${i - 1}] = ${prefix[i]}`);

    // Breakpoint #2: After calculating prefix[i]
    l.breakpoint(2);
  }
   l.snapshot('Completed prefix product calculation');

  // Breakpoint #3: Before suffix calculation loop
  l.breakpoint(3);

  // Suffix pass
  for (let i = n - 2; i >= 0; i--) {
     l.simple('i', i);
     l.array('nums', nums, { ptr: i + 1, label: 'i+1' }); // Highlight number used for calculation
     l.array('suffix', suffix, { ptr: i + 1, label: 'i+1' }); // Highlight previous suffix value
     l.snapshot(`Calculating suffix product for index ${i}`);

     suffix[i] = suffix[i + 1] * nums[i + 1];

     l.array('suffix', suffix, { ptr: i, label: 'i', color: 'success' }); // Highlight newly calculated value
     l.snapshot(`suffix[${i}] = suffix[${i + 1}] * nums[${i + 1}] = ${suffix[i]}`);

    // Breakpoint #4: After calculating suffix[i]
     l.breakpoint(4);
  }
  l.snapshot('Completed suffix product calculation');


  // Breakpoint #5: Before final result calculation loop
  l.breakpoint(5);

  // Final result calculation
  for (let i = 0; i < n; i++) {
    l.simple('i', i);
    l.array('prefix', prefix, { ptr: i, label: 'i' }); // Highlight prefix value used
    l.array('suffix', suffix, { ptr: i, label: 'i' }); // Highlight suffix value used
    l.snapshot(`Calculating result for index ${i}`);

    result[i] = prefix[i] * suffix[i];

    l.array('result', result, { ptr: i, label: 'i', color: 'success' }); // Highlight final result value
    l.snapshot(`result[${i}] = prefix[${i}] * suffix[${i}] = ${result[i]}`);

    // Breakpoint #6: After calculating result[i]
    l.breakpoint(6);
  }
  l.snapshot('Completed final result calculation');

  // Breakpoint #7: Final result array is ready
  l.breakpoint(7);
  l.array('result', result); // Show final result array
  l.snapshot('Final result array computed');


  return l.getSteps();
}
