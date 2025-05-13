import { describe, it, expect } from "bun:test";
import { generateCodeFromSteps, removeImports, removeJSDocComments, removeComments, removeExtraEmptyLines, replaceBreakpointWithNumber, removeStepLoggerLog, removeUnwantedLines, replaceProblemStateSignature, replaceGetStepsReturn, removeManualHideBlocks } from "./codeGenerator";
import * as fs from "fs";
import * as path from "path";
import { loadProblemWithId } from "./loadProblemWithId";

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

describe("removeImports", () => {
  it("should remove single-line imports with semicolon", () => {
    const input = `import { foo } from 'bar';\nconst a = 1;`;
    const expected = `const a = 1;`;
    // @ts-ignore // Accessing private function for testing
    expect(removeImports(input)).toEqual(expected);
  });

  it("should remove multi-line imports with semicolon", () => {
    const input = `import {\n  foo,\n  bar\n} from 'baz';\nconst a = 1;`;
    const expected = `const a = 1;`;
    // @ts-ignore // Accessing private function for testing
    expect(removeImports(input)).toEqual(expected);
  });

  it("should remove a mix of single and multi-line imports with semicolons", () => {
    const input = `import { foo } from 'bar';\nimport {\n  baz\n} from 'qux';\nconst a = 1;`;
    const expected = `const a = 1;`;
    // @ts-ignore // Accessing private function for testing
    expect(removeImports(input)).toEqual(expected);
  });

  it("should handle no imports", () => {
    const input = `const a = 1;\nconst b = 2;`;
    const expected = `const a = 1;\nconst b = 2;`;
    // @ts-ignore // Accessing private function for testing
    expect(removeImports(input)).toEqual(expected);
  });

});

describe("removeJSDocComments", () => {
  it("should remove JSDoc comments", () => {
    const input = `/**\n * This is a JSDoc comment.\n */\nconst a = 1;`;
    const expected = `const a = 1;`;
    // @ts-ignore // Accessing private function for testing
    expect(removeJSDocComments(input)).toEqual(expected);
  });

  it("should handle no JSDoc comments", () => {
    const input = `const a = 1;\nconst b = 2;`;
    const expected = `const a = 1;\nconst b = 2;`;
    // @ts-ignore // Accessing private function for testing
    expect(removeJSDocComments(input)).toEqual(expected);
  });
});

describe("removeComments", () => {
  it("should remove single-line comments", () => {
    const input = `const a = 1; // comment\nconst b = 2;`;
    const expected = `const a = 1;\nconst b = 2;`;
    // @ts-ignore // Accessing private function for testing
    expect(removeComments(input)).toEqual(expected);
  });

  it("should handle no comments", () => {
    const input = `const a = 1;\nconst b = 2;`;
    const expected = `const a = 1;\nconst b = 2;`;
    // @ts-ignore // Accessing private function for testing
    expect(removeComments(input)).toEqual(expected);
  });
});

describe("removeExtraEmptyLines", () => {
  it("should remove extra empty lines", () => {
    const input = `line1\n\n\nline2\n\nline3`;
    const expected = `line1\nline2\nline3`;
    // @ts-ignore // Accessing private function for testing
    expect(removeExtraEmptyLines(input)).toEqual(expected);
  });

  it("should handle no extra empty lines", () => {
    const input = `line1\nline2\nline3`;
    const expected = `line1\nline2\nline3`;
    // @ts-ignore // Accessing private function for testing
    expect(removeExtraEmptyLines(input)).toEqual(expected);
  });
});

describe("replaceBreakpointWithNumber", () => {
  it("should replace l.breakpoint with comment", () => {
    const input = `l.breakpoint(1);\nconst a = 1;`;
    const expected = `// #1\nconst a = 1;`;
    // @ts-ignore // Accessing private function for testing
    expect(replaceBreakpointWithNumber(input)).toEqual(expected);
  });

  it("should handle no breakpoints", () => {
    const input = `const a = 1;\nconst b = 2;`;
    const expected = `const a = 1;\nconst b = 2;`;
    // @ts-ignore // Accessing private function for testing
    expect(replaceBreakpointWithNumber(input)).toEqual(expected);
  });
});

describe("removeStepLoggerLog", () => {
  it("should remove l.comment and other l. calls", () => {
    const input = `l.comment = "hello";\nl.simple({ a });\nconst a = 1;`;
    const expected = `\nconst a = 1;`;
    // @ts-ignore // Accessing private function for testing
    expect(removeStepLoggerLog(input)).toEqual(expected);
  });

  it("should handle no step logger calls", () => {
    const input = `const a = 1;\nconst b = 2;`;
    const expected = `const a = 1;\nconst b = 2;`;
    // @ts-ignore // Accessing private function for testing
    expect(removeStepLoggerLog(input)).toEqual(expected);
  });
});

describe("removeUnwantedLines", () => {
  it("should remove lines with StepLoggerV2, // HIDE, or Pointer2D", () => {
    const input = `const logger = new StepLoggerV2();\n// HIDE this\nconst ptr: Pointer2D = { x: 0, y: 0 };\nconst a = 1;`;
    const expected = `\n\n\n\n\n\nconst a = 1;`;
    // @ts-ignore // Accessing private function for testing
    expect(removeUnwantedLines(input)).toEqual(expected);
  });

  it("should handle no unwanted lines", () => {
    const input = `const a = 1;\nconst b = 2;`;
    const expected = `const a = 1;\nconst b = 2;`;
    // @ts-ignore // Accessing private function for testing
    expect(removeUnwantedLines(input)).toEqual(expected);
  });
});

describe("replaceProblemStateSignature", () => {
  it("should replace function signature with provided signature", () => {
    const input = `function solve(a: number): ProblemState[] {\n  // code\n}`;
    const expected = `export function solve(): any {\n  // code\n}`;
    // @ts-ignore // Accessing private function for testing
    expect(replaceProblemStateSignature(input, "solve(): any")).toEqual(expected);
  });
});

describe("replaceGetStepsReturn", () => {
  it("should replace return l.getSteps() with return result;", () => {
    const input = `return l.getSteps();\n}`;
    const expected = `return result;\n}`;
    // @ts-ignore // Accessing private function for testing
    expect(replaceGetStepsReturn(input)).toEqual(expected);
  });
});

describe("removeManualHideBlocks", () => {
  it("should remove multiline hide blocks", () => {
    const input = `
const a = 1;
// HIDE_START
const hidden1 = 1;
const hidden2 = 2;
// HIDE_END
const b = 2;
`;
    const expected = `
const a = 1;
const b = 2;
`;
    // @ts-ignore // Accessing private function for testing
    expect(removeManualHideBlocks(input)).toEqual(expected);
  });
});


it("real world example:",async ()=>{
  const generated = await loadProblemWithId("3sum")
  const lines = generated?.code?.split("\n")
  expect(lines?.length).toBeGreaterThan(4)
})