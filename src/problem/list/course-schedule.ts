import {
  Pointer2D,
  Problem,
  ProblemState,
  ThemeColor,
  Variable,
} from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asValueGroup,
  asHashset,
  asBooleanGroup,
  asHashmap,
  from2dArrayToMap,
} from "../utils";

interface CourseScheduleInput {
  numCourses: number;
  prerequisites: number[][];
}
interface LogExtraInfo {
  current?: number;
  prerequisitesIndex?: number;
  allCoursesTaken?: boolean;
  inDegreeIndex?: number;
  prev?: number[];
  prevIndex?: number;
  course?: number;
  prereq?: number;
  deg?: number;
  graphRow?: number;
  neighbor?: number;
  count?: number;
}

export function courseSchedule(p: CourseScheduleInput): ProblemState[] {
  const { numCourses, prerequisites } = p;
  const steps: ProblemState[] = [];
  const graph: number[][] = new Array(numCourses).fill(0).map(() => []);
  const inDegree: number[] = new Array(numCourses).fill(0);
  const queue: number[] = [];
  console.log("graph", graph);

  // Log function to capture steps
  function log(stepPoint: number, extraInfo: LogExtraInfo) {
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
    values = { ...values };

    if (current) {
      values.current = current;
    }
    if (neighbor) {
      values.neighbor = neighbor;
    }
    const m2 = from2dArrayToMap(prerequisites);
    variables.push(
      asHashmap("prerequisites", m2, {
        value: prerequisitesIndex,
        color: "primary",
      })
    );
    const m = from2dArrayToMap(graph);
    variables.push(...asSimpleValue({ numCourses }));
    console.log("graph", m);
    variables.push(
      asArray("inDegree", inDegree, inDegreeIndex),
      asArray("queue", queue)
    );
    variables.push(
      asHashmap("graph", m, {
        value: graphRow,
        color: "primary",
      })
    );

    if (count) {
      variables.push(
        asValueGroup("courses finished", { count }, { min: 0, max: numCourses })
      );
    }
    if (prev) {
      variables.push(asArray("prev", prev, prevIndex));
    }

    variables.push(...asSimpleValue(values));
    if (allCoursesTaken !== undefined) {
      variables.push(asBooleanGroup("result", { allCoursesTaken }));
    }

    steps.push({
      breakpoint: stepPoint,
      variables,
    });
  }

  log(1, {});

  // Initialize the graph and in-degree array
  prerequisites.forEach(([course, prereq]) => {
    log(2, {
      course,
      prereq,
      inDegreeIndex: course,
      prerequisitesIndex: course,
    });
    graph[prereq].push(course);
    inDegree[course]++;
    log(3, {
      course,
      prereq,
      inDegreeIndex: course,
      prerequisitesIndex: course,
    });
  });

  // Log after initialization
  log(4, {});

  // Add courses with no prerequisites to the queue
  inDegree.forEach((deg, index) => {
    log(5, { deg });
    if (deg === 0) {
      log(6, { deg });
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

    const prev = graph[current];
    for (let i = 0; i < prev.length; i++) {
      const neighbor = prev[i];
      log(10, {
        current,
        graphRow: current,
        prev,
        prevIndex: i,
        inDegreeIndex: neighbor,
        count,
      }); // Log before pushing to queue

      inDegree[neighbor]--;
      log(11, {
        current,
        graphRow: current,
        prev,
        prevIndex: i,
        inDegreeIndex: neighbor,
        count,
      }); // Log before pushing to queue

      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
        log(12, {
          current,
          graphRow: current,
          prev,
          prevIndex: i,
          inDegreeIndex: neighbor,
          count,
        }); // Log before pushing to queue
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
const code = `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
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
    const current = queue.shift(); //#4 Dequeue a course, preparing to process it
    count++; // Increase the processed course count

    const prev = graph[current]; 
    //#9
    // Decrease in-degree for all neighbors and enqueue any that now have zero in-degree
    for (const neighbor of prev) {
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

const title = "Course Schedule";
const getInput = () => ({
  numCourses: 10,
  prerequisites: [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
    [4, 2],
    [5, 3],
    [5, 4],
    [6, 0],
    [7, 6],
    [8, 7],
    [9, 8],
  ],
});

export const courseScheduleProblem: Problem<CourseScheduleInput, ProblemState> =
  {
    title,
    code,
    getInput,
    func: courseSchedule,
    id: "course-schedule",
    tags: ["graph", "bfs", "topological-sort"],
  };
