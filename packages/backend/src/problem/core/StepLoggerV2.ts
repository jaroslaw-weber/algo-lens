import {
  BinaryTreeNode,
  HashHighlight,
  NodeHighlight,
  Pointer2D,
  ProblemState,
  Variable,
  VariableMetadata,
} from "algo-lens-core";
import {
  as2dArray,
  asArray,
  asBinary,
  asHashmap,
  asHashset,
  asIntervals,
  asSimpleValue,
  asTree,
  asValueGroup,
} from "./utils";
import _ = require("lodash");

export class StepLoggerV2 {
  private steps: ProblemState[];
  private variables: Variable[];
  private metadata: Map<string, VariableMetadata>;
  private currentBreakpoint = 0;
  groupOptions: Map<string, any> = new Map();
  constructor() {
    this.steps = [];
    this.variables = [];
    this.metadata = new Map();
  }

  private save() {
    const aggregated: ProblemState = {
      variables: this.variables,
      breakpoint: this.currentBreakpoint,
    };
    const cloned = _.cloneDeep(aggregated);
    this.steps.push(cloned);
  }

  public breakpoint(breakpoint: number, description?: string) {
    this.currentBreakpoint = breakpoint;
    this.save();
  }

  private upsert(variable: Variable) {
    //replace or add to array (use lodash), keep the order

    const index = this.variables.findIndex((s) => s.label === variable.label);
    if (index !== -1) {
      this.variables[index] = variable;
    } else {
      this.variables.push(variable);
    }
  }

  public tree(
    label: string,
    value: BinaryTreeNode | null,
    highlight: NodeHighlight[] = []
  ) {
    const variable = asTree(label, value, highlight);
    this.upsert(variable);
  }

  public binary(
    o: Record<string, number>,
    options?: {
      highlightLast?: boolean;
      pointersLeft?: number[];
      pointersRight?: number[];
    }
  ) {
    const variable = asBinary(o, options);
    this.upsert(variable);
  }

  public array(
    name: string,
    values: any[],
    pointer1?: number,
    pointer2?: number,
    pointer3?: number
  ) {
    const variable = asArray(name, values, pointer1, pointer2, pointer3);
    this.upsert(variable);
  }

  public array2d(
    name: string,
    values: any[][],
    pointer1?: Pointer2D,
    pointer2?: Pointer2D,
    pointer3?: Pointer2D
  ) {
    const variable = as2dArray(
      name,
      values,
      [pointer1, pointer2, pointer3].filter((x) => !!x)
    );
    this.upsert(variable);
  }

  public group(
    name: string,
    values: Record<string, any>,
    options?: { min?: number; max?: number; reverse?: any }
  ) {
    const o = options ?? this.groupOptions.get(name);
    if (!o) {
      console.error("no options for this group: " + name);
      throw new Error("no options for this group: " + name);
    }

    const variable = asValueGroup(name, values, o);
    this.upsert(variable);
  }

  public intervals(
    label: string,
    arr: number[][],
    highlight: number[],
    min: number,
    max: number
  ) {
    const variable = asIntervals(label, arr, highlight, min, max);
    this.upsert(variable);
  }

  public hide(name: string) {
    const variable = this?.variables.find((v) => v.label === name);
    if (variable) {
      variable.hide = true;
    }
  }

  public simple(value: Record<string, any>) {
    const variables = asSimpleValue(value);
    variables.forEach((variable) => this.upsert(variable));
  }

  public hashset(label: string, set: Set<any>, highlight: HashHighlight) {
    const variable = asHashset(label, set, highlight);
    this.upsert(variable);
  }

  public hashmap(label: string, map: Map<any, any>, highlight: HashHighlight) {
    const variable = asHashmap(label, map, highlight);
    this.upsert(variable);
  }

  public setMeta(name: string, metadata: VariableMetadata) {
    this.metadata.set(name, metadata);
  }

  public getSteps(): ProblemState[] {
    return this.steps;
  }
}
