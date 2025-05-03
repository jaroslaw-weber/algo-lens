import { StepLoggerV2, Array2DHighlight } from '@algo-lens/problem-template';
import type { UniquePathsInput } from './types';
import { initializeDPTable } from './utils'; // Import the DP table initializer

export function generateSteps(p: UniquePathsInput) {
  const l = new StepLoggerV2();
  const { m, n } = p;

  // Handle edge cases where m or n is non-positive
  if (m <= 0 || n <= 0) {
      l.snapshot(`Invalid input: m=${m}, n=${n}. Dimensions must be positive.`);
      l.simple('result', 0); // Result is 0 for invalid dimensions
      return l.getSteps();
  }

  // Log initial dimensions
  l.simple('m', m);
  l.simple('n', n);
  l.snapshot('Initial grid dimensions');

  // Breakpoint #1: Initialize DP table with zeros.
  l.breakpoint(1);
  const dp = initializeDPTable(m, n, 0);
  l.array2d('dp', dp);
  l.snapshot('Initialized DP table with zeros');

  // Breakpoint #2: Initialize the first column with 1s.
  l.snapshot('Initializing first column (dp[i][0] = 1)');
  l.breakpoint(2);
  for (let i = 0; i < m; i++) {
    l.simple('r', i);
    l.simple('c', 0);
    dp[i][0] = 1;
    // Highlight the cell being initialized
    l.array2d('dp', dp, [{ r: i, c: 0, label: '1', color: 'success' }]);
    l.snapshot(`Set dp[${i}][0] = 1`);
    // Breakpoint #3: Inside first column initialization loop.
    l.breakpoint(3);
  }
  l.snapshot('Finished initializing first column');


  // Breakpoint #4: Initialize the first row with 1s.
  l.snapshot('Initializing first row (dp[0][j] = 1)');
  l.breakpoint(4);
  for (let j = 0; j < n; j++) { // Start from j=0 to correctly init dp[0][0] (or handle overlap if needed)
    l.simple('r', 0);
    l.simple('c', j);
     // Avoid double-setting dp[0][0] if already set, though setting to 1 again is harmless
    if (dp[0][j] !== 1) { // Check avoids redundant logging for dp[0][0]
        dp[0][j] = 1;
    }
    // Highlight the cell being initialized
    l.array2d('dp', dp, [{ r: 0, c: j, label: '1', color: 'success' }]);
    l.snapshot(`Set dp[0][${j}] = 1`);
    // Breakpoint #5: Inside first row initialization loop.
    l.breakpoint(5);
  }
   l.snapshot('Finished initializing first row');


  // Breakpoint #6: Calculate the number of unique paths for each cell using DP.
  l.snapshot('Starting DP calculation for remaining cells.');
  l.breakpoint(6);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      l.simple('r', i);
      l.simple('c', j);
      const highlights: Array2DHighlight[] = [
          { r: i, c: j, label: '?', color: 'info' }, // Cell being calculated
          { r: i - 1, c: j, label: `${dp[i-1][j]}`, color: 'secondary' }, // Value from above
          { r: i, c: j - 1, label: `${dp[i][j-1]}`, color: 'secondary' }, // Value from left
      ];
      l.array2d('dp', dp, highlights);
      l.snapshot(`Calculating dp[${i}][${j}] = dp[${i - 1}][${j}] + dp[${i}][${j - 1}]`);
      // Breakpoint #7: Inside nested loops. Calculate dp[i][j].
      l.breakpoint(7);

      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];

      l.array2d('dp', dp, [{ r: i, c: j, label: `${dp[i][j]}`, color: 'success' }]);
      l.snapshot(`dp[${i}][${j}] = ${dp[i - 1][j]} + ${dp[i][j - 1]} = ${dp[i][j]}`);
      // Breakpoint #8: Value for dp[i][j] calculated.
      l.breakpoint(8);
    }
  }
  l.snapshot('Finished DP calculation.');

  // Breakpoint #9: DP calculation finished. Result is in the bottom-right cell.
  const result = dp[m - 1][n - 1];
  l.simple('result', result);
  l.array2d('dp', dp, [{ r: m - 1, c: n - 1, label: `${result}`, color: 'success' }]); // Highlight final result cell
  l.snapshot(`DP calculation finished. Result = dp[${m - 1}][${n - 1}] = ${result}`);
  l.breakpoint(9);


  return l.getSteps();
}
