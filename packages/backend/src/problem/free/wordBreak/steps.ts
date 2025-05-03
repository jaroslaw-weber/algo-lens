import { StepLoggerV2 } from '@algo-lens/problem-template';
import type { WordBreakInput } from './types';

export function generateSteps(p: WordBreakInput) {
  const l = new StepLoggerV2();
  const { s, wordDict } = p;
  const n = s.length;
  const wordDictSet = new Set(wordDict); // Use Set for O(1) lookups

  // Initial state logging
  l.string('s', s);
  l.set('wordDictSet', wordDictSet); // Assuming l.set() exists
  l.snapshot('Initial string and word dictionary set');

  // Initialize DP array
  const dp: boolean[] = new Array(n + 1).fill(false);
  dp[0] = true; // Base case: empty string
  l.array('dp', dp, { itemType: 'BOOLEAN' }); // Log initial DP array
  l.snapshot('Initialized DP array. dp[0] = true (base case)');

  // Breakpoint #1: After initialization, before outer loop.
  l.breakpoint(1);

  for (let i = 1; i <= n; i++) {
    l.simple('i', i);
    // Highlight the end position 'i' in the string 's'
    l.string('s', s, { end: i, label: 'i' });
    l.snapshot(`Outer loop: Checking if s[0..${i-1}] can be segmented (calculating dp[${i}])`);

    // Breakpoint #2: Start inner loop (j from 0 to i-1).
    l.breakpoint(2);
    for (let j = 0; j < i; j++) {
      l.simple('j', j);
      // Highlight the substring s[j..i-1] being considered
      l.string('s', s, { start: j, end: i, label: 'substring', color: 'info' });
      l.snapshot(`Inner loop: Checking substring from index j=${j}`);

      // Breakpoint #3: Extract substring s[j..i-1].
      l.breakpoint(3);
      const sub = s.substring(j, i);
      l.string('substring', sub); // Log the extracted substring
      l.snapshot(`Extracted substring s[${j}..${i-1}]: "${sub}"`);

      // Breakpoint #4: Check if dp[j] is true and substring is in the dictionary.
      const dpJValue = dp[j];
      const dictHasSub = wordDictSet.has(sub);
      l.array('dp', dp, { ptr: j, label: `dp[${j}]=${dpJValue}`, color: dpJValue ? 'success' : 'neutral' }); // Highlight dp[j]
      l.set('wordDictSet', wordDictSet, { item: sub, label: `Has "${sub}"?`, color: dictHasSub ? 'success' : 'error' }); // Highlight dictionary check
      l.snapshot(`Checking condition: dp[${j}] (${dpJValue}) && wordDictSet.has("${sub}") (${dictHasSub})`);
      l.breakpoint(4);

      if (dpJValue && dictHasSub) {
        // Breakpoint #5: Found a valid segmentation ending at i. Set dp[i] = true.
        l.snapshot(`Condition true! Found valid segmentation for s[0..${i-1}]. Setting dp[${i}] = true.`);
        l.breakpoint(5);
        dp[i] = true;
        l.array('dp', dp, { ptr: i, label: `dp[${i}]=true`, color: 'success' }); // Highlight updated dp[i]
        l.snapshot(`dp[${i}] set to true.`);

        // Breakpoint #6: Break inner loop (optimization).
        l.snapshot('Breaking inner loop (optimization).');
        l.breakpoint(6);
        break; // Go to next 'i'
      } else {
         l.snapshot(`Condition false. Continuing inner loop.`);
      }
    }
    // Inner loop finished for 'i'. Log the state of dp[i].
    l.array('dp', dp, { ptr: i, label: `dp[${i}]=${dp[i]}`, color: dp[i] ? 'success' : 'neutral' });
    l.snapshot(`Inner loop finished for i=${i}. dp[${i}] is ${dp[i]}.`);
    // Breakpoint #7: Inner loop finished for index i. Continue outer loop.
    l.breakpoint(7);
  }

  // Breakpoint #8: Outer loop finished. Result is dp[n].
  const result = dp[n];
  l.boolean('result', result);
  l.array('dp', dp, { ptr: n, label: `dp[${n}]=${result}`, color: result ? 'success' : 'error' }); // Highlight final DP value
  l.snapshot(`Outer loop finished. Final result dp[${n}] = ${result}`);
  l.breakpoint(8);

  return l.getSteps();
}
