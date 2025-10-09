import { ProblemState } from "@algolens/core/src/types";

export type Interval = [number, number];

export type Step = ProblemState;

export interface MeetingRoomsInput {
  intervals: Interval[];
}
