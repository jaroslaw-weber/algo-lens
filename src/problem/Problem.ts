export interface Problem<Input, State> {
  code: string;
  getInput: () => Input;
  title: string;
  func: (t: Input) => ProblemState[];
  url?: string;
}

export interface Variable {
  label: string;
  type: "number" | "array";
}

export interface Pointer {
  dimension: "column" | "row";
  value: number;
}

export interface ArrayVariable extends Variable {
  type: "array";
  value: any[];
  pointers?: Pointer[];
}

export interface NumberVariable extends Variable {
  type: "number";
  value: number;
}
export interface ProblemState {
  variables: Variable[];
  breakpoint:number
}
