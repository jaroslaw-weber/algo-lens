import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { from2dArrayToMap } from "../../core/utils"; // Keep necessary import

// The core algorithm logic
export function generateSteps(numCourses: number, prerequisites: number[][]) {
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  // Set group options for value/boolean groups
  l.groupOptions.set("courses finished", { min: 0, max: numCourses });
  l.groupOptions.set("result", {}); // No specific options needed for boolean group

  const graph: number[][] = new Array(numCourses).fill(0).map(() => []);
  const inDegree: number[] = new Array(numCourses).fill(0);
  const queue: number[] = [];
  const prerequisitesMap = from2dArrayToMap(prerequisites);
  const graphMap = from2dArrayToMap(graph);
  // Initial state log (Breakpoint 1)
  l.simple({ numCourses });
  l.hashmap("prerequisites", prerequisitesMap, { value: -1, color: "neutral" });
  l.hashmap("graph", graphMap, { value: -1, color: "neutral" });
  l.arrayV2({ inDegree: inDegree }, {});
  l.arrayV2({ queue: queue }, {});
  l.breakpoint_explanation = "Initial state: numCourses, empty graph, inDegree array, and queue.";
  l.breakpoint(1);

  // Initialize the graph and in-degree array
  prerequisites.forEach(([course, prereq], prerequisitesIndex) => {
    // Log before updating graph/inDegree (Breakpoint 2)
    l.simple({ numCourses, course, prereq });
    l.hashmap("prerequisites", prerequisitesMap, {
      value: prerequisitesIndex, // Highlight current prerequisite pair
      color: "primary",
    });
    l.hashmap("graph", graphMap, {
      value: -1,
      color: "neutral",
    });
    l.arrayV2({ inDegree: inDegree }, { course: course }); // Highlight inDegree[course] before change
    l.arrayV2({ queue: queue }, {});
    l.breakpoint_explanation = `Processing prerequisite: [${course}, ${prereq}]. Highlighting current prerequisite.`;
    l.breakpoint(2);

    graph[prereq].push(course);
    inDegree[course]++;

    // Log after updating graph/inDegree (Breakpoint 3)
    l.simple({ numCourses, course, prereq });
    l.hashmap("prerequisites", prerequisitesMap, {
      value: prerequisitesIndex,
      color: "primary",
    });
    l.hashmap("graph", graphMap, {
      value: -1,
      color: "neutral",
    }); // Graph now updated
    l.arrayV2({ inDegree: inDegree }, { course: course }); // Highlight inDegree[course] after change
    l.arrayV2({ queue: queue }, {});
    l.breakpoint_explanation = "Updated graph and inDegree for the current prerequisite.";
    l.breakpoint(3);
  });

  // Log after initialization loop (Breakpoint 4)
  l.simple({ numCourses });
  l.hashmap("prerequisites", prerequisitesMap, {
    value: -1,
    color: "neutral",
  });
  l.hashmap("graph", graphMap, { value: -1, color: "neutral" });
  l.arrayV2({ inDegree: inDegree }, {});
  l.arrayV2({ queue: queue }, {});
  l.breakpoint_explanation = "Finished initializing graph and inDegree array from prerequisites.";
  l.breakpoint(4);

  // Add courses with no prerequisites to the queue
  inDegree.forEach((deg, index) => {
    // Log before checking degree (Breakpoint 5)
    l.simple({ numCourses, deg });
    l.hashmap("prerequisites", prerequisitesMap, {
      value: -1,
      color: "neutral",
    });
    l.hashmap("graph", graphMap, {
      value: -1,
      color: "neutral",
    });
    l.arrayV2({ inDegree: inDegree }, { index: index }); // Highlight current degree being checked
    l.arrayV2({ queue: queue }, {});
    l.breakpoint_explanation = "Checking inDegree for each course to find starting points (degree 0).";
    l.breakpoint(5);

    if (deg === 0) {
      // Log before adding to queue (Breakpoint 6)
      l.simple({ numCourses, deg });
      l.hashmap("prerequisites", prerequisitesMap, {
        value: -1,
        color: "neutral",
      });
      l.hashmap("graph", graphMap, {
        value: -1,
        color: "neutral",
      });
      l.arrayV2({ inDegree: inDegree }, { index: index });
      l.arrayV2({ queue: queue }, {});
      l.breakpoint_explanation = "Found course with inDegree 0. Adding to queue.";
      l.breakpoint(6);
      queue.push(index);
      // Note: No log immediately after queue.push as the next iteration or step 7 will show it
    }
  });

  // Log initial state of the queue after population (Breakpoint 7)
  l.simple({ numCourses });
  l.hashmap("prerequisites", prerequisitesMap, {
    value: -1,
    color: "neutral",
  });
  l.hashmap("graph", graphMap, { value: -1, color: "neutral" });
  l.arrayV2({ inDegree: inDegree }, {});
  l.arrayV2({ queue: queue }, {}); // Queue might be populated now
  l.breakpoint_explanation = "Initial queue populated with all courses having inDegree 0.";
  l.breakpoint(7);

  let count = 0;
  while (queue.length > 0) {
    // Log start of while loop iteration (Breakpoint 8)
    l.simple({ numCourses });
    l.group("courses finished", { count });
    l.hashmap("prerequisites", prerequisitesMap, {
      value: -1,
      color: "neutral",
    });
    l.hashmap("graph", graphMap, {
      value: -1,
      color: "neutral",
    });
    l.arrayV2({ inDegree: inDegree }, {});
    l.arrayV2({ queue: queue }, {});
    l.breakpoint_explanation = "Start of while loop: Processing queue. Current courses finished count.";
    l.breakpoint(8);

    const current = queue.shift()!;
    count++;

    // Log after dequeuing and incrementing count (Breakpoint 9)
    l.simple({ numCourses, current });
    l.group("courses finished", { count });
    l.hashmap("prerequisites", prerequisitesMap, {
      value: -1,
      color: "neutral",
    });
    l.hashmap("graph", graphMap, {
      value: -1,
      color: "neutral",
    });
    l.arrayV2({ inDegree: inDegree }, {});
    l.arrayV2({ queue: queue }, {}); // Queue after shift
    l.breakpoint_explanation = `Dequeued '${current}' course. Incremented courses finished count.`;
    l.breakpoint(9);

    const neighbors = graph[current];
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      // Log before decrementing neighbor inDegree (Breakpoint 10)
      l.simple({ numCourses, current, neighbor });
      l.group("courses finished", { count });
      l.hashmap("prerequisites", prerequisitesMap, {
        value: -1,
        color: "neutral",
      });
      l.hashmap("graph", graphMap, {
        value: current, // Highlight the current course row in the graph
        color: "primary",
      });
      l.arrayV2({ neighbors: neighbors }, { i: i }); // Log neighbors array, highlight current neighbor
      l.arrayV2({ inDegree: inDegree }, { neighbor: neighbor }); // Highlight neighbor's inDegree before change
      l.arrayV2({ queue: queue }, {});
      l.breakpoint_explanation = `Processing neighbor of '${current}' course. Highlighting neighbor's inDegree.`;
      l.breakpoint(10);

      inDegree[neighbor]--;

      // Log after decrementing neighbor inDegree (Breakpoint 11)
      l.simple({ numCourses, current, neighbor });
      l.group("courses finished", { count });
      l.hashmap("prerequisites", prerequisitesMap, {
        value: -1,
        color: "neutral",
      });
      l.hashmap("graph", graphMap, {
        value: current,
        color: "primary",
      });
      l.arrayV2({ neighbors: neighbors }, { i: i });
      l.arrayV2({ inDegree: inDegree }, { neighbor: neighbor }); // Highlight neighbor's inDegree after change
      l.arrayV2({ queue: queue }, {});
      l.breakpoint_explanation = "Decremented inDegree of neighbor.";
      l.breakpoint(11);

      if (inDegree[neighbor] === 0) {
        // Log before adding neighbor to queue (Breakpoint 12)
        l.simple({ numCourses, current, neighbor });
        l.group("courses finished", { count });
        l.hashmap("prerequisites", prerequisitesMap, {
          value: -1,
          color: "neutral",
        });
        l.hashmap("graph", graphMap, {
          value: current,
          color: "primary",
        });
        l.arrayV2({ neighbors: neighbors }, { i: i });
        l.arrayV2({ inDegree: inDegree }, { neighbor: neighbor });
        l.arrayV2({ queue: queue }, {}); // Queue before push
        l.breakpoint_explanation = "Neighbor's inDegree became 0. Adding neighbor to queue.";
        l.breakpoint(12);
        queue.push(neighbor);
        // Note: No log immediately after queue.push, next iteration or step 13 will show it
      }
    }

    // Log after processing all neighbors of 'current' (Breakpoint 13)
    l.simple({ numCourses, current });
    l.group("courses finished", { count });
    l.hashmap("prerequisites", prerequisitesMap, {
      value: -1,
      color: "neutral",
    });
    l.hashmap("graph", graphMap, {
      value: -1,
      color: "neutral",
    });
    l.arrayV2({ inDegree: inDegree }, {});
    l.arrayV2({ queue: queue }, {}); // Queue might have new elements
    l.breakpoint_explanation = `Finished processing all neighbors of '${current}' course.`;
    l.breakpoint(13);
  }

  // Final log to show result (Breakpoint 14)
  const allCoursesTaken = count === numCourses;
  l.simple({ numCourses });
  l.group("courses finished", { count });
  l.group("result", { allCoursesTaken }); // Log the final boolean result
  l.simple({ result: allCoursesTaken });
  l.hashmap("prerequisites", prerequisitesMap, {
    value: -1,
    color: "neutral",
  });
  l.hashmap("graph", graphMap, { value: -1, color: "neutral" });
  l.arrayV2({ inDegree: inDegree }, {}); // Final state of inDegree
  l.arrayV2({ queue: queue }, {}); // Queue should be empty if successful
  l.breakpoint_explanation = `Final state: Result is ${allCoursesTaken} (count === numCourses).`;
  l.breakpoint(14);

  // Return the collected steps
  return l.getSteps();
}
