import { StepLoggerV2 } from '@algo-lens/problem-template';
import type { ReverseLinkedListInput, ListNode } from './types';
import { cloneList } from './utils'; // Assuming a utility for cloning lists

export function generateSteps(p: ReverseLinkedListInput) {
  const l = new StepLoggerV2();
  // Clone the input list to avoid modifying the original test case data during step generation
  const listClone = cloneList(p.head);

  let prev: ListNode | null = null;
  let current: ListNode | null = listClone;
  let next: ListNode | null = null; // Temporary pointer

  // Initial state logging
  // Log the entire list state and the initial null value of 'prev' and the head value of 'current'
  l.linkedList('listState', listClone, { // Use 'listState' as the variable name for the list visualization
      pointers: [ // Define initial pointer positions
          { name: 'prev', node: prev },
          { name: 'current', node: current },
      ]
  });
  l.snapshot('Initial state: prev = null, current points to head');

  // Breakpoint #1: After initialization, before loop starts
  l.breakpoint(1);

  while (current !== null) {
    // Log state at the beginning of the loop iteration
    l.snapshot(`Loop start: current = ${current.val}`);

    // Breakpoint #2: Store the next node
    next = current.next;
    // Log the 'next' pointer's target (or null)
    l.linkedList('listState', listClone, {
        pointers: [
            { name: 'prev', node: prev },
            { name: 'current', node: current },
            { name: 'next', node: next, label: 'next (temp)', color: 'secondary' }, // Show temporary 'next' pointer
        ]
    });
    l.snapshot(`Store next node (${next?.val ?? 'null'})`);
    l.breakpoint(2);

    // Breakpoint #3: Reverse the current node's pointer
    current.next = prev;
    // Log the list state after reversing the pointer
    l.linkedList('listState', listClone, {
        pointers: [ // Update pointers, highlight the reversed link if possible (depends on component)
             { name: 'prev', node: prev },
             { name: 'current', node: current },
             { name: 'next', node: next, label: 'next (temp)', color: 'secondary' },
        ],
        // Potentially add edge highlights if the component supports it:
        // edges: [{ from: current, to: prev, color: 'success' }]
    });
    l.snapshot(`Reverse current node's pointer: current.next now points to ${prev?.val ?? 'null'}`);
    l.breakpoint(3);

    // Breakpoint #4: Move prev pointer one step forward
    prev = current;
    l.linkedList('listState', listClone, {
        pointers: [ // Update prev pointer position
             { name: 'prev', node: prev },
             { name: 'current', node: current }, // Current hasn't moved yet
             { name: 'next', node: next, label: 'next (temp)', color: 'secondary' },
        ]
    });
    l.snapshot(`Move prev pointer to current node (${prev.val})`);
    l.breakpoint(4);

    // Breakpoint #5: Move current pointer one step forward
    current = next;
    l.linkedList('listState', listClone, {
        pointers: [ // Update current pointer position
             { name: 'prev', node: prev },
             { name: 'current', node: current }, // 'next' pointer is now effectively 'current'
             // 'next' temp pointer is conceptually gone here, remove or hide it
        ]
    });
    l.snapshot(`Move current pointer to next node (${current?.val ?? 'null'})`);
    l.breakpoint(5);
  }

  // Breakpoint #6: Loop finished. 'prev' is the new head.
  l.snapshot(`Loop finished. current is null.`);
  l.linkedList('listState', listClone, { // Show final pointer positions
      pointers: [
           { name: 'prev', node: prev, color: 'success', label: 'new head' }, // Highlight new head
           { name: 'current', node: current }, // current is null
      ]
  });
  l.snapshot(`Return the new head (prev), which points to ${prev?.val ?? 'null'}`);
  l.breakpoint(6);

  // Log the final reversed list state explicitly if needed, though 'prev' points to its head
  // l.linkedList('listState', prev); // Or use the listClone which is now reversed starting from prev
  // l.snapshot("Final reversed list");


  return l.getSteps();
}
