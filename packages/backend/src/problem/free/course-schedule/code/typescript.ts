import { ProblemState } from "algo-lens-core";
import { CourseScheduleInput, LogExtraInfo } from "./types"; // Import types
import { logStep } from "./steps"; // Import logStep

// The core algorithm logic
export function courseSchedule(p: CourseScheduleInput): ProblemState[] {
  const { numCourses, prerequisites } = p;
  const steps: ProblemState[] = [];
  const graph: number[][] = new Array(numCourses).fill(0).map(() => []);
  const inDegree: number[] = new Array(numCourses).fill(0);
  const queue: number[] = [];

  // Helper to call logStep with common parameters
  const log = (stepPoint: number, extraInfo: LogExtraInfo) => {
    logStep(steps, stepPoint, numCourses, prerequisites, graph, inDegree, queue, extraInfo);
  };

  log(1, {});

  // Initialize the graph and in-degree array
  prerequisites.forEach(([course, prereq], index) => { // Added index for prerequisitesIndex
    log(2, {
      course,
      prereq,
      inDegreeIndex: course,
      prerequisitesIndex: index, // Pass the index of the prerequisite pair
    });
    graph[prereq].push(course);
    inDegree[course]++;
    log(3, {
      course,
      prereq,
      inDegreeIndex: course,
      prerequisitesIndex: index, // Pass the index
    });
  });

  // Log after initialization
  log(4, {});

  // Add courses with no prerequisites to the queue
  inDegree.forEach((deg, index) => {
    log(5, { deg, inDegreeIndex: index }); // Added inDegreeIndex
    if (deg === 0) {
      log(6, { deg, inDegreeIndex: index }); // Added inDegreeIndex
      queue.push(index);
    }
  });

  // Log initial state of the queue
  log(7, {});

  let count = 0;
  while (queue.length > 0) {
    log(8, { count });
    const current = queue.shift()!;
    count++;

    // Log state at each course processing
    log(9, { current, count });

    const neighbors = graph[current]; // Renamed prev to neighbors for clarity
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      log(10, {
        current,
        graphRow: current,
        prev: neighbors, // Pass neighbors as prev
        prevIndex: i,
        neighbor, // Pass neighbor explicitly
        inDegreeIndex: neighbor,
        count,
      });

      inDegree[neighbor]--;
      log(11, {
        current,
        graphRow: current,
        prev: neighbors, // Pass neighbors as prev
        prevIndex: i,
        neighbor, // Pass neighbor explicitly
        inDegreeIndex: neighbor,
        count,
      });

      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
        log(12, {
          current,
          graphRow: current,
          prev: neighbors, // Pass neighbors as prev
          prevIndex: i,
          neighbor, // Pass neighbor explicitly
          inDegreeIndex: neighbor,
          count,
        });
      }
    }

    // Log after processing each neighbor
    log(13, { current, count });
  }

  // Final log to confirm if all courses can be taken
  log(14, { allCoursesTaken: count === numCourses, count });

  // If index is equal to numCourses, all courses can be finished
  return steps;
}

// The core logic of checking if courses can be finished (used for display/problem definition)
export const code = `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // Initialize graph and in-degree arrays
  const graph: number[][] = new Array(numCourses).fill(0).map(() => []);
  const inDegree: number[] = new Array(numCourses).fill(0);
  const queue: number[] = [];
  //#1 Data structures initialized - Graph, inDegree, and Queue are setup

  // Populate the graph and in-degree array from prerequisites
  for (const [course, prereq] of prerequisites) {
    //#2
    graph[prereq].push(course);
    inDegree[course]++;
    //#3
  }
  //#4 Graph populated and inDegree updated with prerequisites

  // Identify courses with no prerequisites and add them to the queue
  for (let i = 0; i < numCourses; i++) {
    //#5
    if (inDegree[i] === 0) {
      //#6
      queue.push(i);
    }
  }
  //#7 Courses without prerequisites are identified and added to queue

  let count = 0; // This will count the courses we are able to process
  while (queue.length > 0) {
    //#8
    const current = queue.shift(); // Dequeue a course, preparing to process it
    count++; // Increase the processed course count

    const neighbors = graph[current];
    //#9
    // Decrease in-degree for all neighbors and enqueue any that now have zero in-degree
    for (const neighbor of neighbors) { // Changed from 'prev' to 'neighbors' for clarity
      //#10
      inDegree[neighbor]--;
      //#11
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
        //#12 Neighbor with no remaining prerequisites enqueued
      }
    }
    //#13 Processed all neighbors for the current course
  }

  // If we've processed as many courses as we started with, all courses can be finished
  const allCoursesTaken = count === numCourses;
  //#14 Check if all courses were processed successfully
  return allCoursesTaken;
}`;
