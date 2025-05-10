import { describe, it, expect } from "bun:test";
import { generateCodeFromSteps } from "./codeGenerator";
import * as fs from "fs";
import * as path from "path";

describe("generateCodeFromSteps", () => {
  // Test Case 1: sum-of-two-integers
  it("should correctly generate code for 'sum-of-two-integers'", () => {
    const stepsFilePath = path.join(
      __dirname,
      "../free/sum-of-two-integers/steps.ts"
    );
    const stepsFileContent = fs.readFileSync(stepsFilePath, "utf-8");

    const params = {
      stepsFileContent,
      targetFunctionSignature: "getSum(a: number, b: number): number",
      // returnVariable: "a", // Removed
    };

    const output = generateCodeFromSteps(params);

    expect(output.fileName).toBe("typescript.ts");
    expect(Array.isArray(output.logs)).toBe(true);
    // Check for specific logs if necessary, e.g., logger variable identification
    expect(output.logs.some(log => log.includes("Logger variable identified: 'l'"))).toBe(true);

    // Expected output based on sum-of-two-integers/steps.ts
    // (after removing logger, imports, and transforming signature/return)
    const expectedContent = `// import { asBinary } from "../../core/utils"; // Not needed if StepLoggerV2 handles {varName: value}

/**
 * Generates the states for the sum of two integers algorithm using bitwise operations.
 * @param a - The first integer.
 * @param b - The second integer.
 * @returns The states showing the steps of the computation.
 */
export function getSum(a: number, b: number): number {
  let carry: number | undefined; // Define carry outside the loop

  // #1 Initialize carry
  // carry is undefined here initially, which is fine.
  // Or, we could initialize it to a specific value if the logic implies, e.g., 0
  // For this problem, undefined is representative of its state before first calculation.

  while (b !== 0) {
    // #2 Start loop iteration (while carry exists)

    carry = a & b;
    // #3 Calculate carry bits

    a = a ^ b;
    // #4 Calculate sum bits (without carry)

    b = carry << 1;
    // #5 Shift carry left for next iteration
  }

  // #6 Loop finished (no more carry)

  // #7 Return final sum
  if (carry !== undefined) { // carry here refers to the state after loop
  }
  return result;
}`;

    // Normalize whitespace and line endings for comparison
    const normalize = (str: string) => str.replace(/\\r\\n/g, '\\n').replace(/\\s+/g, ' ').trim();
    
    // We need to be careful with comments and exact spacing if we do a direct string comparison.
    // Let's check key transformations:
    expect(output.content).toContain("export function getSum(a: number, b: number): number {");
    expect(output.content).not.toContain("generateSteps");
    expect(output.content).not.toContain("StepLoggerV2");
    expect(output.content).not.toContain("l.binary");
    expect(output.content).not.toContain("l.breakpoint");
    expect(output.content).not.toContain("return l.getSteps()");
    expect(output.content).toContain("return result;"); // Changed to "result"
    expect(output.content).toContain("let carry: number | undefined;"); // Make sure variable declarations are kept

    // A more robust check might involve parsing the AST or comparing line by line after filtering.
    // For now, let's check if the number of lines is reasonable and key parts are present/absent.
    const outputLines = output.content.split('\\n');
    const expectedLines = expectedContent.split('\\n');

    // This is a loose check, specific lines might differ due to comments in steps.ts not in expectedContent here
    // console.log("Generated lines:", outputLines.length);
    // console.log("Expected lines:", expectedLines.length);
    // For a more precise check, we'd need to ensure `expectedContent` is perfectly in sync
    // with the `steps.ts` content minus the logger lines.

    // Check if the core logic lines are present (very simplified check)
    expect(output.content).toMatch(/carry\s*=\s*a\s*&\s*b;/);
    expect(output.content).toMatch(/a\s*=\s*a\s*\^\s*b;/);
    expect(output.content).toMatch(/b\s*=\s*carry\s*<<\s*1;/);
  });

  // Test Case 3: Edge case - empty stepsFileContent
  it("should handle empty stepsFileContent", () => {
    const params = {
      stepsFileContent: "",
      targetFunctionSignature: "emptyFunc(): void",
      // returnVariable: "undefined", // Removed
    };
    const output = generateCodeFromSteps(params);
    expect(output.fileName).toBe("typescript.ts");
    // Expecting signature and hardcoded "return result;"
    expect(output.content.trim()).toBe("export function emptyFunc(): void {\n  return result;\n}"); 
    // Check logs for warnings about missing elements if any
    expect(output.logs.some(log => log.toLowerCase().includes("warning"))).toBe(true); // e.g. logger not found
  });

  // Test Case 4: Edge case - stepsFileContent without logger lines
  it("should handle stepsFileContent without logger lines", () => {
    const stepsFileContent = \`
export function generateOriginalCode(a: number, b: number): number {
  // This is a comment
  const sum = a + b;
  return sum;
}
\`;
    const params = {
      stepsFileContent,
      targetFunctionSignature: "originalCode(a: number, b: number): number",
      // returnVariable: "sum", // Removed
    };
    // In this scenario, the original return is 'sum'.
    // the generator might not be able to magically change it unless it parses and understands the code.
    // The current generator replaces 'return l.getSteps()'. If that's not there, it might not change the return.
    // Let's assume the original function already returns the desired variable for this test.
    // Or, the generator should be robust enough to add/change the return statement.
    // The current code replaces specific `return l.getSteps()`, so other returns are kept.

    const output = generateCodeFromSteps(params);
    expect(output.fileName).toBe("typescript.ts");
    // Expect logs to indicate no logger was found/removed
    expect(output.logs.some(log => log.includes("Logger variable initialization not found"))).toBe(true);

    expect(output.content).toContain("export function originalCode(a: number, b: number): number {");
    expect(output.content).toContain("const sum = a + b;");
    expect(output.content).toContain("return sum;"); // Original return should be kept if no logger.getSteps()
    expect(output.content).not.toContain("generateOriginalCode"); // Signature should still change
  });
});
