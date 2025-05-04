import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { from2dArrayToMap } from "../../core/utils"; // Keep necessary import

// The core algorithm logic
export function generateSteps(
  numCourses: number,
  prerequisites: number[][]
) {
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  // Set group options for value/boolean groups
  l.groupOptions.set("courses finished", { min: 0, max: numCourses });
  l.groupOptions.set("result", {}); // No specific options needed for boolean group

  const graph: number[][] = new Array(numCourses).fill(0).map(() => []);
  const inDegree: number[] = new Array(numCourses).fill(0);
  const queue: number[] = [];

  // Initial state log (Breakpoint 1)
  l.simple({ numCourses });
  l.hashmap("prerequisites", from2dArrayToMap(prerequisites));
  l.hashmap("graph", from2dArrayToMap(graph));
  l.array("inDegree", inDegree);
  l.array("queue", queue);
  l.breakpoint(1);

  // Initialize the graph and in-degree array
  prerequisites.forEach(([course, prereq], prerequisitesIndex) => {
    // Log before updating graph/inDegree (Breakpoint 2)
    l.simple({ numCourses, course, prereq });
    l.hashmap("prerequisites", from2dArrayToMap(prerequisites), {
      value: prerequisitesIndex, // Highlight current prerequisite pair
      color: "primary",
    });
    l.hashmap("graph", from2dArrayToMap(graph));
    l.array("inDegree", inDegree, course); // Highlight inDegree[course] before change
    l.array("queue", queue);
    l.breakpoint(2);

    graph[prereq].push(course);
    inDegree[course]++;

    // Log after updating graph/inDegree (Breakpoint 3)
    l.simple({ numCourses, course, prereq });
    l.hashmap("prerequisites", from2dArrayToMap(prerequisites), {
      value: prerequisitesIndex,
      color: "primary",
    });
    l.hashmap("graph", from2dArrayToMap(graph)); // Graph now updated
    l.array("inDegree", inDegree, course); // Highlight inDegree[course] after change
    l.array("queue", queue);
    l.breakpoint(3);
  });

  // Log after initialization loop (Breakpoint 4)
  l.simple({ numCourses });
  l.hashmap("prerequisites", from2dArrayToMap(prerequisites));
  l.hashmap("graph", from2dArrayToMap(graph));
  l.array("inDegree", inDegree);
  l.array("queue", queue);
  l.breakpoint(4);

  // Add courses with no prerequisites to the queue
  inDegree.forEach((deg, index) => {
    // Log before checking degree (Breakpoint 5)
    l.simple({ numCourses, deg });
    l.hashmap("prerequisites", from2dArrayToMap(prerequisites));
    l.hashmap("graph", from2dArrayToMap(graph));
    l.array("inDegree", inDegree, index); // Highlight current degree being checked
    l.array("queue", queue);
    l.breakpoint(5);

    if (deg === 0) {
      // Log before adding to queue (Breakpoint 6)
      l.simple({ numCourses, deg });
      l.hashmap("prerequisites", from2dArrayToMap(prerequisites));
      l.hashmap("graph", from2dArrayToMap(graph));
      l.array("inDegree", inDegree, index);
      l.array("queue", queue);
      l.breakpoint(6);
      queue.push(index);
      // Note: No log immediately after queue.push as the next iteration or step 7 will show it
    }
  });

  // Log initial state of the queue after population (Breakpoint 7)
  l.simple({ numCourses });
  l.hashmap("prerequisites", from2dArrayToMap(prerequisites));
  l.hashmap("graph", from2dArrayToMap(graph));
  l.array("inDegree", inDegree);
  l.array("queue", queue); // Queue might be populated now
  l.breakpoint(7);

  let count = 0;
  while (queue.length > 0) {
    // Log start of while loop iteration (Breakpoint 8)
    l.simple({ numCourses });
    l.group("courses finished", { count });
    l.hashmap("prerequisites", from2dArrayToMap(prerequisites));
    l.hashmap("graph", from2dArrayToMap(graph));
    l.array("inDegree", inDegree);
    l.array("queue", queue);
    l.breakpoint(8);

    const current = queue.shift()!;
    count++;

    // Log after dequeuing and incrementing count (Breakpoint 9)
    l.simple({ numCourses, current });
    l.group("courses finished", { count });
    l.hashmap("prerequisites", from2dArrayToMap(prerequisites));
    l.hashmap("graph", from2dArrayToMap(graph));
    l.array("inDegree", inDegree);
    l.array("queue", queue); // Queue after shift
    l.breakpoint(9);

    const neighbors = graph[current];
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      // Log before decrementing neighbor inDegree (Breakpoint 10)
      l.simple({ numCourses, current, neighbor });
      l.group("courses finished", { count });
      l.hashmap("prerequisites", from2dArrayToMap(prerequisites));
      l.hashmap("graph", from2dArrayToMap(graph), {
        value: current, // Highlight the current course row in the graph
        color: "primary",
      });
      l.array("neighbors", neighbors, i); // Log neighbors array, highlight current neighbor
      l.array("inDegree", inDegree, neighbor); // Highlight neighbor's inDegree before change
      l.array("queue", queue);
      l.breakpoint(10);

      inDegree[neighbor]--;

      // Log after decrementing neighbor inDegree (Breakpoint 11)
      l.simple({ numCourses, current, neighbor });
      l.group("courses finished", { count });
      l.hashmap("prerequisites", from2dArrayToMap(prerequisites));
      l.hashmap("graph", from2dArrayToMap(graph), {
        value: current,
        color: "primary",
      });
      l.array("neighbors", neighbors, i);
      l.array("inDegree", inDegree, neighbor); // Highlight neighbor's inDegree after change
      l.array("queue", queue);
      l.breakpoint(11);

      if (inDegree[neighbor] === 0) {
        // Log before adding neighbor to queue (Breakpoint 12)
        l.simple({ numCourses, current, neighbor });
        l.group("courses finished", { count });
        l.hashmap("prerequisites", from2dArrayToMap(prerequisites));
        l.hashmap("graph", from2dArrayToMap(graph), {
          value: current,
          color: "primary",
        });
        l.array("neighbors", neighbors, i);
        l.array("inDegree", inDegree, neighbor);
        l.array("queue", queue); // Queue before push
        l.breakpoint(12);
        queue.push(neighbor);
        // Note: No log immediately after queue.push, next iteration or step 13 will show it
      }
    }

    // Log after processing all neighbors of 'current' (Breakpoint 13)
    l.simple({ numCourses, current });
    l.group("courses finished", { count });
    l.hashmap("prerequisites", from2dArrayToMap(prerequisites));
    l.hashmap("graph", from2dArrayToMap(graph));
    l.array("inDegree", inDegree);
    l.array("queue", queue); // Queue might have new elements
    l.breakpoint(13);
  }

  // Final log to show result (Breakpoint 14)
  const allCoursesTaken = count === numCourses;
  l.simple({ numCourses });
  l.group("courses finished", { count });
  l.group("result", { allCoursesTaken }); // Log the final boolean result
  l.hashmap("prerequisites", from2dArrayToMap(prerequisites));
  l.hashmap("graph", from2dArrayToMap(graph));
  l.array("inDegree", inDegree); // Final state of inDegree
  l.array("queue", queue); // Queue should be empty if successful
  l.breakpoint(14);

  // Return the collected steps
  return l.getSteps();
}
