import { ProblemState, Variable } from "algo-lens-core";
import {
  asArray,
  asHashmap,
  asSimpleValue,
  asValueGroup,
  asBooleanGroup,
  from2dArrayToMap,
} from "../../core/utils"; // Adjusted import path
import { LogExtraInfo } from "./types"; // Import from types.ts

// This function will be called by the main algorithm to log state
export function logStep(
  steps: ProblemState[],
  stepPoint: number,
  numCourses: number,
  prerequisites: number[][],
  graph: number[][],
  inDegree: number[],
  queue: number[],
  extraInfo: LogExtraInfo
) {
  let values: any = {};
  const variables: Variable[] = [];
  const {
    current,
    allCoursesTaken,
    prev,
    graphRow,
    neighbor,
    inDegreeIndex,
    prevIndex,
    count,
    prerequisitesIndex,
  } = extraInfo;
  values = { ...values }; // Ensure values is initialized

  if (current !== undefined) {
    // Check for undefined, not just falsy
    values.current = current;
  }
  if (neighbor !== undefined) {
    // Check for undefined
    values.neighbor = neighbor;
  }

  const prereqMap = from2dArrayToMap(prerequisites);
  variables.push(
    asHashmap("prerequisites", prereqMap, {
      value: prerequisitesIndex,
      color: "primary",
    })
  );

  const graphMap = from2dArrayToMap(graph);
  variables.push(...asSimpleValue({ numCourses }));
  variables.push(
    asArray("inDegree", inDegree, inDegreeIndex),
    asArray("queue", queue)
  );
  variables.push(
    asHashmap("graph", graphMap, {
      // Use graphMap here
      value: graphRow,
      color: "primary",
    })
  );

  if (count !== undefined) {
    // Check for undefined
    variables.push(
      asValueGroup("courses finished", { count }, { min: 0, max: numCourses })
    );
  }
  if (prev) {
    // prev can be empty array, so just check if it exists
    variables.push(asArray("prev", prev, prevIndex));
  }

  // Add simple values only if they have been defined in extraInfo
  if (extraInfo.course !== undefined) values.course = extraInfo.course;
  if (extraInfo.prereq !== undefined) values.prereq = extraInfo.prereq;
  if (extraInfo.deg !== undefined) values.deg = extraInfo.deg;

  // Only add non-empty simple values
  if (Object.keys(values).length > 0) {
    variables.push(...asSimpleValue(values));
  }

  if (allCoursesTaken !== undefined) {
    // Check for undefined
    variables.push(asBooleanGroup("result", { allCoursesTaken }));
  }

  steps.push({
    breakpoint: stepPoint,
    variables,
  });
}

// The core algorithm logic
export function generateSteps(
  numCourses: number,
  prerequisites: number[][]
): ProblemState[] {
  const steps: ProblemState[] = [];
  const graph: number[][] = new Array(numCourses).fill(0).map(() => []);
  const inDegree: number[] = new Array(numCourses).fill(0);
  const queue: number[] = [];

  // Helper to call logStep with common parameters
  const log = (stepPoint: number, extraInfo: LogExtraInfo) => {
    logStep(
      steps,
      stepPoint,
      numCourses,
      prerequisites,
      graph,
      inDegree,
      queue,
      extraInfo
    );
  };

  log(1, {});

  // Initialize the graph and in-degree array
  prerequisites.forEach(([course, prereq], index) => {
    // Added index for prerequisitesIndex
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
