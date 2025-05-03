import { StepLoggerV2, Array2DHighlight } from '@algo-lens/problem-template';
import type { CourseScheduleInput } from './types';

export function generateSteps(p: CourseScheduleInput): ProblemState[] {
  const l = new StepLoggerV2();
  const { numCourses, prerequisites } = p;

  // --- Initial State ---
  l.simple('numCourses', numCourses);
  l.array2d('prerequisites', prerequisites);
  l.snapshot('Initial input: number of courses and prerequisites list');

  // --- Data Structures Initialization ---
  const adjList = new Map<number, number[]>();
  const inDegree: number[] = new Array(numCourses).fill(0);
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
      adjList.set(i, []);
  }

  l.map('adjList', adjList);
  l.array('inDegree', inDegree);
  l.queue('queue', queue);
  l.snapshot('Initialized adjacency list, in-degree array, and queue');
  l.breakpoint(1); // Corresponds to #1 in code/typescript.ts

  // --- Build Graph and In-Degrees ---
  l.snapshot('Building graph and calculating in-degrees...');
  for (let i = 0; i < prerequisites.length; i++) {
      const [course, prereq] = prerequisites[i];
       l.array2d('prerequisites', prerequisites, [{ r: i, label: 'Processing', color: 'info'}]);
       l.snapshot(`Processing prerequisite [${course}, ${prereq}]`);
       l.breakpoint(2); // Corresponds to #2

      // Add edge to adjacency list
      adjList.get(prereq)?.push(course);
      // Increment in-degree of the course
      inDegree[course]++;

      l.map('adjList', adjList, { key: prereq, label: 'Updated', color: 'info' });
      l.array('inDegree', inDegree, { ptr: course, label: 'Incremented', color: 'info' });
      l.snapshot(`Added edge ${prereq} -> ${course}. Incremented in-degree for course ${course}.`);
      l.breakpoint(3); // Corresponds to #3
  }
  l.snapshot('Graph built and in-degrees calculated.');
  l.breakpoint(4); // Corresponds to #4

  // --- Initialize Queue with Zero In-Degree Courses ---
  l.snapshot('Initializing queue with courses having in-degree 0...');
  for (let i = 0; i < numCourses; i++) {
      l.array('inDegree', inDegree, { ptr: i, label: 'Checking', color: 'info' });
      l.snapshot(`Checking in-degree of course ${i}: ${inDegree[i]}`);
      l.breakpoint(5); // Corresponds to #5
      if (inDegree[i] === 0) {
          l.snapshot(`Course ${i} has in-degree 0. Adding to queue.`);
          l.breakpoint(6); // Corresponds to #6
          queue.push(i);
          l.queue('queue', queue, { item: i, label: 'Added', color: 'success' });
          l.snapshot(`Queue: [${queue.join(', ')}]`);
      }
  }
  l.snapshot('Queue initialized.');
  l.breakpoint(7); // Corresponds to #7

  // --- Process Queue (Kahn's Algorithm) ---
  let count = 0;
  l.simple('count', count);
  l.snapshot('Starting topological sort processing...');

  while (queue.length > 0) {
      l.snapshot(`Queue is not empty. Current count: ${count}`);
      l.breakpoint(8); // Corresponds to #8

      const current = queue.shift()!;
      l.simple('current', current);
      l.queue('queue', queue); // Show queue after dequeue
      l.snapshot(`Dequeued course ${current}.`);

      count++;
      l.simple('count', count);
      l.snapshot(`Incremented count to ${count}.`);
      l.breakpoint(9); // Corresponds to #9 (after count increment)


      const neighbors = adjList.get(current) || [];
      l.array('neighbors', neighbors); // Log neighbors being processed
      l.map('adjList', adjList, { key: current, label: 'Processing neighbors', color: 'info' });
      l.snapshot(`Processing neighbors of course ${current}: [${neighbors.join(', ')}]`);


      for (let i = 0; i < neighbors.length; i++) {
          const neighbor = neighbors[i];
          l.simple('neighbor', neighbor);
          l.array('neighbors', neighbors, { ptr: i, label: 'Processing', color: 'info' });
          l.snapshot(`Processing neighbor ${neighbor}`);
          l.breakpoint(10); // Corresponds to #10

          inDegree[neighbor]--;
          l.array('inDegree', inDegree, { ptr: neighbor, label: 'Decremented', color: 'warning' });
          l.snapshot(`Decremented in-degree of neighbor ${neighbor} to ${inDegree[neighbor]}.`);
          l.breakpoint(11); // Corresponds to #11

          if (inDegree[neighbor] === 0) {
              l.snapshot(`In-degree of neighbor ${neighbor} is now 0. Adding to queue.`);
              l.breakpoint(12); // Corresponds to #12
              queue.push(neighbor);
              l.queue('queue', queue, { item: neighbor, label: 'Added', color: 'success' });
              l.snapshot(`Queue: [${queue.join(', ')}]`);
          }
      }
      l.snapshot(`Finished processing neighbors for course ${current}.`);
      l.breakpoint(13); // Corresponds to #13
  }

  // --- Final Result Check ---
  l.snapshot(`Queue is empty. Checking if all courses were processed.`);
  const canFinish = count === numCourses;
  l.simple('count', count);
  l.simple('numCourses', numCourses);
  l.boolean('canFinish', canFinish);
  l.snapshot(`Final check: count (${count}) === numCourses (${numCourses}) -> ${canFinish}`);
  l.breakpoint(14); // Corresponds to #14

  return l.getSteps();
}
