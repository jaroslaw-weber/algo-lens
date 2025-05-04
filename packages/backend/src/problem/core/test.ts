import * as ts from "typescript";
import { Problem, ProblemState } from "algo-lens-core";
import { cloneDeep, last } from "lodash";
import { describe, it, expect } from "bun:test";
import * as fs from "fs";
import * as path from "path";

export function runTests(problem: Problem<any, ProblemState>) {
  const { testcases, metadata } = problem;

  // Check for TypeScript compilation errors
  const tsFilePath = path.join(
    process.cwd(), // Assuming the test runs from the repo root
    "src",
    "problem",
    "free",
    problem.id,
    "code",
    "typescript.ts"
  );

  if (fs.existsSync(tsFilePath)) {
    const program = ts.createProgram([tsFilePath], {
      noEmit: true, // We only want to check for errors, not emit JS
      target: ts.ScriptTarget.ESNext, // Or your desired target
      module: ts.ModuleKind.CommonJS, // Or your desired module system
      strict: true, // Enable strict checks
    });

    const allDiagnostics = ts
      .getPreEmitDiagnostics(program)
      .filter((diag) => diag.category === ts.DiagnosticCategory.Error); // Filter for errors only

    if (allDiagnostics.length > 0) {
      const errorMessage = allDiagnostics
        .map((diagnostic) => {
          if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(
              diagnostic.file,
              diagnostic.start!
            );
            const message = ts.flattenDiagnosticMessageText(
              diagnostic.messageText,
              "\n"
            );
            return `TypeScript Error: ${diagnostic.file.fileName} (${
              line + 1
            },${character + 1}): ${message}`;
          } else {
            return `TypeScript Error: ${ts.flattenDiagnosticMessageText(
              diagnostic.messageText,
              "\n"
            )}`;
          }
        })
        .join("\n");
      throw new Error(`TypeScript compilation failed:\n${errorMessage}`);
    }
  } else {
    // Optional: Log a warning or throw an error if the file is expected
    throw new Error(
      `Warning: TypeScript file not found for problem ${problem.id} at ${tsFilePath}`
    );
  }

  //has metadata check
  if (!metadata) {
    throw new Error("No metadata found in problem. ");
  }
  const { groups, variables } = metadata;
  if (!groups) {
    throw new Error("No groups found in metadata");
  }
  if (!variables) {
    throw new Error("No variables found in metadata");
  }
  if (!variables.length) {
    throw new Error("No variables found in metadata");
  }

  if (testcases.length < 4) {
    throw new Error("Test cases count should be at least 4");
  }
  for (const testcase of problem.testcases) {
    const input = cloneDeep(testcase.input);
    const expected = cloneDeep(testcase.expected);
    const states = problem.func(input);
    const state = last(states);
    const variables = state!.variables;
    const result = variables.find((x) => x.label === "result");
    if (!result) {
      throw new Error("No result found in last state");
    }
    //@ts-expect-error
    const value = result.value ?? result.values;
    expect(value).toEqual(expected);
    /**
    console.log(
      `Test case passed: ${JSON.stringify(input)} -> ${JSON.stringify(
        value
      )}`
    );
    **/
  }
}
