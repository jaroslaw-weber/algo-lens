import { ProblemState } from "algo-lens-core";

export type Interval = [number, number];

export type Step = ProblemState;

export interface MeetingRoomsInput {
  intervals: Interval[];
}
