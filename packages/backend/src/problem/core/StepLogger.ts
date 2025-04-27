import { Problem, ProblemState, VariableMetadata, ArrayVariable, SimpleVariable, ValueGroupVariable } from "algo-lens-core"; // Added ArrayVariable, SimpleVariable, ValueGroupVariable
// Removed import { asArray, asSimpleValue, asValueGroup } from "./utils";
import _ = require("lodash");
import { cloneDeep } from "lodash"; // Added cloneDeep import

// TODO: Remove these functions once all problems are migrated
export function asSimpleValue(o: any): SimpleVariable[] {
  return Object.keys(o).map(
    (k) => ({ label: k, value: o[k], type: "number" } as SimpleVariable)
  );
}

/** display similar values in a group */
export function asValueGroup(
  label: string,
  o: any,
  options: { min: number; max: number; reverse?: any }
): ValueGroupVariable {
  const result: ValueGroupVariable = {
    data: [],
    label,
    type: "value-group",
    options,
  };
  for (const key in o) {
    result.data.push({
      label: key,
      value: o[key],
    });
  }

  return result;
}

export function asArray(
  label: string,
  arr: any[],
  column1?: number,
  column2?: number,
  column3?: number
): ArrayVariable {
  const result: ArrayVariable = {
    label,
    type: "array",
    value: cloneDeep(arr),
    pointers: [
      {
        value: column1,
        dimension: "column",
      },
      {
        value: column2,
        dimension: "column",
      },
      {
        value: column3,
        dimension: "column",
      },
    ],
  };
  return result;
}
// End of functions to remove

export class StepLogger {
  private steps: ProblemState[];
  private temp: ProblemState[];
  private metadata: Map<string, VariableMetadata>;
  private currentBreakpoint = 0;

  constructor() {
    this.steps = [];
    this.temp = [];
    this.metadata = new Map();
  }

  public save() {
    const aggregated: ProblemState = {
      variables: this.temp.flatMap((s) => s.variables),
      breakpoint: this.currentBreakpoint,
    };
    this.steps.push(aggregated);
    this.temp = [];
  }

  public breakpoint(breakpoint: number, description?: string) {
    this.currentBreakpoint = breakpoint;
  }

  public array(
    name: string,
    values: any[],
    pointer1?: number,
    pointer2?: number,
    pointer3?: number
  ) {
    this.temp.push({
      variables: [asArray(name, values, pointer1, pointer2, pointer3)],
      breakpoint: this.currentBreakpoint,
    });
  }

  public simple(value: Record<string, any>) {
    this.temp.push({
      variables: asSimpleValue(value),
      breakpoint: this.currentBreakpoint,
    });
  }

  public group(
    name: string,
    values: Record<string, any>,
    options?: { min?: number; max?: number; reverse?: any }
  ) {
    this.temp.push({
      variables: [asValueGroup(name, values, options as any)],
      breakpoint: this.currentBreakpoint,
    });
  }

  public setMeta(name: string, metadata: VariableMetadata) {
    this.metadata.set(name, metadata);
  }

  public getSteps(): ProblemState[] {
    return this.steps;
  }
}
