import { ProblemState, VariableMetadata } from "algo-lens-core";
import { asArray, asSimpleValue, asValueGroup } from "./utils";
import _ = require("lodash");

export class StepLogger {
  private steps: ProblemState[];
  private metadata: Map<string, VariableMetadata>;
  private currentBreakpoint = 0;

  constructor() {
    this.steps = [];
    this.metadata = new Map();
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
    this.steps.push({
      variables: [asArray(name, values, pointer1, pointer2, pointer3)],
      breakpoint: this.currentBreakpoint,
    });
  }

  public simple( value: Record<string, any>) {
    this.steps.push({
      variables: asSimpleValue(value),
      breakpoint: this.currentBreakpoint,
    });
  }

  public group(name:string, values: Record<string, any>, options?: { min?: number; max?: number, reverse?: any }) {
	this.steps.push({
		variables: [asValueGroup(name, values, options as any)],
        breakpoint: this.currentBreakpoint,
	})
  }


  public setMeta(name: string, metadata: VariableMetadata) {
    this.metadata.set(name, metadata);
  }

  postprocess(): ProblemState[] {
	const groupedSteps = _.groupBy(this.steps, 'breakpoint');
	return _.map(groupedSteps, (steps, breakpoint) => {
	  return {
		variables: _.flatMap(steps, 'variables'),
		breakpoint: Number(breakpoint),
	  };
	});
  }

  public getSteps(): ProblemState[] {
	//aggregate steps first to get correct metadata for variables
	this.steps = this.postprocess();
	//return aggregated steps with metadata
    return this.steps;
  }
}
