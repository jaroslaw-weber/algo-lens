import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";
import { Problem, ProblemState } from "@algolens/core/src/types";

import { MeetingRoomsInput } from "./types";
export const problem: Problem<MeetingRoomsInput, ProblemState> = {
  id: "meeting-rooms",
  title: "Meeting Rooms",
  emoji: "🏢",
  difficulty: "easy",

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
