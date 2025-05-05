function canFinish(numCourses: number, prerequisites: number[][]): boolean {
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

    const neighbors = graph[current!];
    //#9
    // Decrease in-degree for all neighbors and enqueue any that now have zero in-degree
    for (const neighbor of neighbors) {
      // Changed from 'prev' to 'neighbors' for clarity
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
}
