import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";
import { Problem, ProblemState } from "algo-lens-core";
import { MeetingRoomsInput } from "./types";
export const problem: Problem<MeetingRoomsInput, ProblemState> = {
  id: "meeting-rooms",
  title: "Meeting Rooms",
  emoji: "🏢",
  difficulty: "easy",
  tags: ["Array", "Sorting", "Interval"],

  testcases,

  func: generateSteps,
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "canAttendMeetings(intervals: number[][]): boolean",
  },
};
