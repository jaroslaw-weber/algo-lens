import { describe, it, expect } from "bun:test";
import { generateCodeFromSteps } from "../codegen/generate";
import * as fs from "fs";
import * as path from "path";
import { loadProblemWithId } from "../problem/core/load";

describe("generateCodeFromSteps", () => {
  it("generateCodeFromSteps", async () => {
    const generated = await generateCodeFromSteps({
      stepsFileContent: `
function something(): ProblemState[] {
    const l = new StepLoggerV2();
    l.comment = "something";
    l.breakpoint(1);
    const a = 1;
    const b = 2; // something
    const c = a + b;
    l.simple({ a, b, c});
    l.breakpoint(2); //

    return l.getSteps();
}`,
      targetFunctionSignature: `something(): number`,
      problemName: "something",
    });
    ////
    const expected = `export function something(): number {
  // #1
  const a = 1;
  const b = 2;
  const c = a + b;

  // #2
  return result;
}
`;
    //
    expect(generated.content).toEqual(expected);
  });
});

it("real world example:", async () => {
  const generated = await loadProblemWithId("3sum");
  const lines = generated?.code?.split("\n");
  expect(lines?.length).toBeGreaterThan(4);
});
