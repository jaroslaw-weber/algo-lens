import { describe, it, expect } from "bun:test";
import { generateCodeFromSteps } from "./codeGenerator";
import * as fs from "fs";
import * as path from "path";

describe("generateCodeFromSteps", () => {
  it("generateCodeFromSteps", async () => {
    const generated = await generateCodeFromSteps({
      stepsFileContent: `
function something(): ProblemState[] {
    const l = new StepLoggerV2();
    l.comment = "something";
    l.breakpoint(1);
    const a = 1;
    const b = 2;
    const c = a + b;
    l.simple({ a, b, c});
    l.breakpoint(2);

    return l.getSteps();
}`,
      targetFunctionSignature: `something(): number`,
      problemName: "something",
    });
    //console.log("generated:", generated);
    const expected = `export function something(): ProblemState[] {
  // #1
  const a = 1;
  const b = 2;
  const c = a + b;

  // #2
  return result;
}
`;
console.log("content", generated.content)
    expect(generated.content).toEqual(expected);
  });
});
