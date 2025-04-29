import {
  Pointer2D,
  ProblemState,
  Variable,
  VariableMetadata,
} from "algo-lens-core";
import { as2dArray, asArray, asSimpleValue, asValueGroup } from "./utils";
import _ = require("lodash");

export class StepLoggerV2 {
  private steps: ProblemState[];
  private variables: ProblemState[];
  private metadata: Map<string, VariableMetadata>;
  private currentBreakpoint = 0;
  constructor() {
	this.steps = [];
	this.variables = [];
	this.metadata = new Map();
  }

  public save() {
	const aggregated: ProblemState = {
	  variables: this.variables.flatMap((s) => s.variables),
	  breakpoint: this.currentBreakpoint,
	};
	const cloned = _.cloneDeep(aggregated);
	this.steps.push(cloned);
  }

  public breakpoint(breakpoint: number, description?: string) {
	this.currentBreakpoint = breakpoint;
	this.save()
  }

  private upsert(variable: Variable) {
	const existingIndex = this.variables.findIndex((s) =>
	  s.variables.some((v) => v.label === variable.label)
	);

	if (existingIndex !== -1) {
	  this.variables[existingIndex].variables = this.variables[existingIndex].variables.map((v) =>
		v.label === variable.label ? variable : v
	  );
	} else {
	  this.variables.push({
		variables: [variable],
		breakpoint: this.currentBreakpoint,
	  });
	}
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

  public simple(value: Record<string, any>) {
	const variables = asSimpleValue(value);
	variables.forEach((variable) => this.upsert(variable));
  }


  public setMeta(name: string, metadata: VariableMetadata) {
	this.metadata.set(name, metadata);
  }

  public getSteps(): ProblemState[] {
	return this.steps;
  }
}