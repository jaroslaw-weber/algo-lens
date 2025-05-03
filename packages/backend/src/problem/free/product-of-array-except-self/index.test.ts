import { it } from 'bun:test';
import { problem } from './problem';
import { runTests } from '../../core/test'; // Adjusted path assuming core/test is two levels up

// Run the tests for the product-of-array-except-self problem
it(problem.id, async () => {
  await runTests(problem);
});
