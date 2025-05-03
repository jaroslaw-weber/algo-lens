import { testCases } from './testcase';
import { reverseLinkedListProblem } from './problem';
import { StepLoggerV2 } from '@algo-lens/problem-template';
import { Problem } from 'algo-lens-core';
import { ListNode } from './types'; // Import ListNode
import { listToArray, createList, cloneList } from './utils'; // Import helpers

describe('Reverse Linked List Problem', () => {
  // Test the step generation logic
  testCases.forEach(({ input, output: expectedOutputArray }, index) => {
    it(`should generate correct steps for test case ${index + 1}`, () => {
      const steps = reverseLinkedListProblem.generateSteps(input);
      expect(steps).toBeDefined();
      expect(steps.length).toBeGreaterThan(0);

      // Check the final state of the list in the steps
      const lastStep = steps[steps.length - 1];
      // Find the variable representing the final list state (depends on steps.ts implementation)
      // Assuming 'listState' holds the final list structure or the 'prev' pointer points to the new head
      const finalStateVar = lastStep.variables.find(v => v.name === 'listState' || v.name === 'prev');
      expect(finalStateVar).toBeDefined();

      // Convert the final list state back to an array for comparison
      let finalOutputArray: number[] = [];
      if (finalStateVar?.type === 'LINKED_LIST') {
        // If using a dedicated LINKED_LIST type that holds the head
        finalOutputArray = listToArray(finalStateVar.value as ListNode | null);
      } else if (finalStateVar?.type === 'NODE_POINTER') {
         // If the 'prev' pointer holds the new head node reference (need to access its actual value)
         // This might require adjustments based on how NODE_POINTER value is stored
         // Assuming the value property holds the ListNode object or null
         finalOutputArray = listToArray(finalStateVar.value as ListNode | null);
      }

      expect(finalOutputArray).toEqual(expectedOutputArray);
    });
  });

  // Optional: Test basic problem metadata
  it('should have correct problem metadata', () => {
    expect(reverseLinkedListProblem.id).toBe('reverse-linked-list');
    expect(reverseLinkedListProblem.title).toBe('Reverse Linked List');
    expect(reverseLinkedListProblem.tags).toEqual(['Linked List', 'Iteration']);
  });

  // Test the reference solution logic directly (simulating generateSteps)
  testCases.forEach(({ input, output: expectedOutputArray }, index) => {
      it(`reference solution logic should return correct output for test case ${index + 1}`, () => {
          const head = cloneList(input.head); // Clone to avoid side effects
          let prev: ListNode | null = null;
          let current = head;
          let next: ListNode | null = null;

          while (current !== null) {
              next = current.next;
              current.next = prev;
              prev = current;
              current = next;
          }
          // 'prev' is now the head of the reversed list
          const actualOutputArray = listToArray(prev);
          expect(actualOutputArray).toEqual(expectedOutputArray);
      });
  });

});
