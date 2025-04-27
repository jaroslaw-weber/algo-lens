import { ProblemState, Variable } from "algo-lens-core";
import {
  asArray,
  asHashmap,
  asSimpleValue,
  asValueGroup,
  asBooleanGroup,
  from2dArrayToMap,
} from "../../../core/utils"; // Adjusted import path
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

  if (current !== undefined) { // Check for undefined, not just falsy
    values.current = current;
  }
  if (neighbor !== undefined) { // Check for undefined
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
    asHashmap("graph", graphMap, { // Use graphMap here
      value: graphRow,
      color: "primary",
    })
  );

  if (count !== undefined) { // Check for undefined
    variables.push(
      asValueGroup("courses finished", { count }, { min: 0, max: numCourses })
    );
  }
  if (prev) { // prev can be empty array, so just check if it exists
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


  if (allCoursesTaken !== undefined) { // Check for undefined
    variables.push(asBooleanGroup("result", { allCoursesTaken }));
  }

  steps.push({
    breakpoint: stepPoint,
    variables,
  });
}
