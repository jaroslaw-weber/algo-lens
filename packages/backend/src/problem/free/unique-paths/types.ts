import { ProblemState } from "algo-lens-core"; // Added import

export interface UniquePathsState extends ProblemState { // Added export
  variables: any[];
  breakpoint: number;
}

export interface UniquePathsInput { // Added export
  m: number;
  n: number;
}
