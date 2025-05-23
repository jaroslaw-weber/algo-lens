import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { from2dArrayToMap } from "../../core/utils"; // Keep necessary import

// The core algorithm logic
export function generateSteps(numCourses: number, prerequisites: number[][]) {
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  // Set group options for value/boolean groups
  l.groupOptions.set("courses finished", { min: 0, max: numCourses });
  l.groupOptions.set("result", {}); // No specific options needed for boolean group

  const inDegree: number[] = new Array(numCourses).fill(0);
  const queue: number[] = [];
  const prerequisitesMap = from2dArrayToMap(prerequisites);
  const graphMap: Map<number, number[]> = new Map();
  // Initialize graphMap with empty arrays for each course
  for (let i = 0; i < numCourses; i++) {
    graphMap.set(i, []);
  }
  // Initial state log (Breakpoint 1)
  l.hashmap("prerequisitesMap", prerequisitesMap, {
    value: -1,
    color: "neutral",
  });
  l.hashmap("graphMap", graphMap, { value: -1, color: "neutral" });
  l.arrayV3({ inDegree: inDegree }, []);
  l.arrayV3({ queue: queue }, []);
  l.simple({ numCourses });
  l.comment =
    "Initial state: numCourses, empty graph, inDegree array, and queue.";
  l.breakpoint(1);

  // Initialize the graphMap and in-degree array
  for (const [course, prereq] of prerequisites) {
    // Log before updating graphMap/inDegree (Breakpoint 2)
    ////
    l.hashmap("prerequisitesMap", prerequisitesMap, {
      value: course,
      color: "primary",
    });
    l.hashmap("graphMap", graphMap, { value: -1, color: "neutral" });
    l.arrayV3({ inDegree: inDegree }, []);
    l.comment = `Process prerequisite: [${course}, ${prereq}].`;
    l.breakpoint(2);

    graphMap.get(prereq)!.push(course);
    inDegree[course]++;

    // Log after updating graphMap and inDegree (Breakpoint 3)
    l.hashmap("graphMap", graphMap, { value: prereq, color: "primary" });
    l.comment =
      "Updated graphMap and inDegree for the current prerequisite. Highlighting the prerequisite node in graphMap.";
    l.breakpoint(3);
  }

  l.comment =
    "Checking inDegree for each course to find starting points (degree 0).";
  l.breakpoint(4);

  for (let index = 0; index < inDegree.length; index++) {
    l.comment = "Initial queue populated with all courses having inDegree 0.";
    l.breakpoint(5);
    const deg = inDegree[index];

    if (deg === 0) {
      queue.push(index);
      l.arrayV3({ queue }, []);
      l.comment = `Course '${index}' inDegree 0. Add to queue.`;
      l.breakpoint(6);
    }
  }

  let count = 0;
  while (queue.length > 0) {
    const current = queue.shift()!;
    count++;
    l.simple({ numCourses, current });
    l.group("courses finished", { count });
    l.comment = `Dequeued '${current}'. Incremented finished count.`;
    l.breakpoint(7);

    // Log after dequeuing and incrementing count (Breakpoint 9)

    const neighbors = graphMap.get(current) || [];
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      // Log before decrementing neighbor inDegree (Breakpoint 8)
      l.hashmap("graphMap", graphMap, { value: current, color: "primary" });
      l.arrayV3({ inDegree: inDegree }, [
        { value: neighbor, label: "neighbor" },
      ]);
      l.comment = `Process neighbor of '${current}'.`;
      l.breakpoint(8);

      inDegree[neighbor]--;

      // Log after decrementing neighbor inDegree (Breakpoint 11)
      l.arrayV3({ inDegree: inDegree }, [
        { value: neighbor, label: "neighbor" },
      ]);
      l.comment = `Decremented inDegree for '${neighbor}'.`;
      l.breakpoint(9);

      if (inDegree[neighbor] === 0) {
        // Log before adding neighbor to queue (Breakpoint 12)
        l.arrayV3({ queue: queue }, [
          { value: queue.length, label: "newly added" },
        ]); // Highlight the newly added element's position
        l.comment = `Neighbor '${neighbor}' inDegree 0. Add to queue.`;
        l.breakpoint(10);
        queue.push(neighbor);
        // Note: No log immediately after queue.push, next iteration or step 13 will show it
      }
    }

    // Log after processing all neighbors of 'current' (Breakpoint 13)
    l.arrayV3({ queue: queue }, []);
    l.comment = `Finished processing neighbors of '${current}'.`;
    l.breakpoint(11);
  }

  // Final log to show result (Breakpoint 14)
  const allCoursesTaken = count === numCourses;
  const result = allCoursesTaken;
  l.simple({ result });
  l.comment = `Final result: All courses finished? ${result}.`;
  l.breakpoint(12);

  // Return the collected steps
  return l.getSteps();
}
