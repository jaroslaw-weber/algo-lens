import { Problem } from "algo-lens-core";
import { code } from "./code/typescript"; // Import the updated code string
import { CourseScheduleInput } from "./types";
import { courseScheduleGroups } from "./groups";
import { variableMetadata } from "./variables"; // Assuming this exports VariableMetaData[]
import { generateSteps } from "./steps"; // Import the new generateSteps
import { testcases } from "./testcase"; // Import standard testcases

// Define the problem structure using the new standard
export const courseScheduleProblem: Problem<CourseScheduleInput> = {
  id: "course-schedule",
  title: "Course Schedule",
  description: `<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>.</p><p>You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that you <strong>must</strong> take course <code>b<sub>i</sub></code> first if you want to take course <code>a<sub>i</sub></code>.</p><p>Return <code>true</code> if you can finish all courses. Otherwise, return <code>false</code>.</p>`,
  tags: ["Graph", "Topological Sort", "BFS", "DFS", "Detect Cycle"], // Updated tags
  constraints: [
      '<code>1 <= numCourses <= 2000</code>',
      '<code>0 <= prerequisites.length <= 5000</code>',
      '<code>prerequisites[i].length == 2</code>',
      '<code>0 <= a<sub>i</sub>, b<sub>i</sub> < numCourses</code>',
      'All the pairs <code>prerequisites[i]</code> are <strong>unique</strong>.'
  ],
  variables: variableMetadata, // Assign imported variable metadata (ensure correct type)
  groups: courseScheduleGroups, // Assign imported groups metadata
  testCases: testcases.map(tc => ({ input: tc.input })), // Map testcases
  generateSteps, // Assign the new generateSteps function
  code, // Assign the updated code string with breakpoints
  visualizers: [ // Add default visualizer
      {
        name: 'Topological Sort',
        default: true,
        description: 'Visualization of Kahn\'s algorithm for topological sorting',
        id: 'kahn-algo',
        elements: [
          { component: 'Value', props: { name: 'numCourses', label: 'Total Courses' } },
          { component: 'Array2D', props: { name: 'prerequisites', label: 'Prerequisites List' } },
          { component: 'Map', props: { name: 'adjList', label: 'Adjacency List (Graph)' } },
          { component: 'Array', props: { name: 'inDegree', label: 'In-Degree Array' } },
          { component: 'Queue', props: { name: 'queue', label: 'Processing Queue' } },
          { component: 'Value', props: { name: 'count', label: 'Processed Count' } },
          { component: 'Value', props: { name: 'current', label: 'Current Course' } },
          { component: 'Value', props: { name: 'neighbor', label: 'Current Neighbor' } },
          { component: 'Value', props: { name: 'canFinish', label: 'Can Finish?' } },
        ],
      },
  ],
  difficulty: 'Medium',
  category: 'Free',
  emoji: '📚',
};
