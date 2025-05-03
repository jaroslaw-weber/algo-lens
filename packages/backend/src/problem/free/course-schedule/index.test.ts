import { testCases } from './testcase';
import { courseScheduleProblem } from './problem';
import { StepLoggerV2 } from '@algo-lens/problem-template';
import { Problem } from 'algo-lens-core';
import { CourseScheduleInput } from './types'; // Import input type

describe('Course Schedule Problem', () => {
  // Test the step generation logic
  testCases.forEach(({ input, output: expectedOutput }, index) => {
    it(`should generate correct steps and final result for test case ${index + 1}`, () => {
      const steps = courseScheduleProblem.generateSteps(input);
      expect(steps).toBeDefined();
      expect(steps.length).toBeGreaterThan(0); // Basic check

      // Check the final result in the steps' variables
      const lastStep = steps[steps.length - 1];
      // Assuming the final result is stored in a variable named 'canFinish'
      const finalResultVar = lastStep.variables.find(v => v.name === 'canFinish');
      expect(finalResultVar).toBeDefined();
      expect(finalResultVar?.type).toBe('BOOLEAN');
      if(finalResultVar?.type === 'BOOLEAN') {
         expect(finalResultVar.value).toEqual(expectedOutput);
      }
    });
  });

  // Optional: Test basic problem metadata
  it('should have correct problem metadata', () => {
    expect(courseScheduleProblem.id).toBe('course-schedule');
    expect(courseScheduleProblem.title).toBe('Course Schedule');
    // Update expected tags based on problem.ts
    expect(courseScheduleProblem.tags).toEqual(["Graph", "Topological Sort", "BFS", "DFS", "Detect Cycle"]);
  });

  // Test the reference solution logic directly (simulating generateSteps)
  testCases.forEach(({ input, output: expectedOutput }, index) => {
      it(`reference solution logic should return correct output for test case ${index + 1}`, () => {
          const { numCourses, prerequisites } = input;
          const adjList = new Map<number, number[]>();
          const inDegree: number[] = new Array(numCourses).fill(0);
          const queue: number[] = [];
          for (let i = 0; i < numCourses; i++) {
              adjList.set(i, []);
          }

          for (const [course, prereq] of prerequisites) {
              adjList.get(prereq)?.push(course);
              inDegree[course]++;
          }

          for (let i = 0; i < numCourses; i++) {
              if (inDegree[i] === 0) {
                  queue.push(i);
              }
          }

          let count = 0;
          while (queue.length > 0) {
              const current = queue.shift()!;
              count++;
              const neighbors = adjList.get(current) || [];
              for (const neighbor of neighbors) {
                  inDegree[neighbor]--;
                  if (inDegree[neighbor] === 0) {
                      queue.push(neighbor);
                  }
              }
          }

          const actualOutput = count === numCourses;
          expect(actualOutput).toEqual(expectedOutput);
      });
  });

});
