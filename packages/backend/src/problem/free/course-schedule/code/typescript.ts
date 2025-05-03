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
  const adjList = new Map<number, number[]>(); // Using Map for graph
  const inDegree: number[] = new Array(numCourses).fill(0);
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
      adjList.set(i, []);
  }
  //#1 Initialize graph (adjList), inDegree array, and queue.

  // Populate the graph and in-degree array from prerequisites
  for (const [course, prereq] of prerequisites) {
    //#2 Processing a prerequisite pair [course, prereq].
    adjList.get(prereq)?.push(course);
    inDegree[course]++;
    //#3 Added edge prereq->course, incremented inDegree[course].
  }
  //#4 Finished building graph and calculating initial in-degrees.

  // Identify courses with no prerequisites and add them to the queue
  for (let i = 0; i < numCourses; i++) {
    //#5 Checking in-degree of course i.
    if (inDegree[i] === 0) {
      //#6 Course i has in-degree 0. Enqueueing.
      queue.push(i);
    }
  }
  //#7 Finished initial queue population.

  let count = 0; // This will count the courses we are able to process
  while (queue.length > 0) {
    //#8 Start of main loop iteration. Queue not empty.
    const current = queue.shift()!; // Dequeue a course, preparing to process it
    count++;
    //#9 Dequeued 'current' course, incremented count.

    const neighbors = adjList.get(current) || [];
    // Decrease in-degree for all neighbors and enqueue any that now have zero in-degree
    for (const neighbor of neighbors) {
      //#10 Processing neighbor of 'current'.
      inDegree[neighbor]--;
      //#11 Decremented in-degree of neighbor.
      if (inDegree[neighbor] === 0) {
        //#12 Neighbor's in-degree is 0. Enqueueing neighbor.
        queue.push(neighbor);
      }
    }
    //#13 Finished processing all neighbors for the current course.
  }

  // If we've processed as many courses as we started with, all courses can be finished
  const canFinish = count === numCourses;
  //#14 Loop finished. Check if count equals numCourses.
  return canFinish;
}`;
