import { Pointer2D, Problem, ProblemState, VariableMetadata } from "algo-lens-core";
import { as2dArray, asArray, asSimpleValue, asValueGroup } from "./utils";
import _ = require("lodash");

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

  public array2d(
    name: string,
    values: any[][],
    pointer1?: Pointer2D,
    pointer2?: Pointer2D,
    pointer3?: Pointer2D
  ){
    this.temp.push({
      variables: [as2dArray(name, values, [pointer1!, pointer2!, pointer3!])],
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
