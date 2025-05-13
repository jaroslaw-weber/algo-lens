import * as prettier from "prettier";

export interface GenerateCodeParams {
  stepsFileContent: string;
  targetFunctionSignature: string; // e.g., "getSum(a: number, b: number): number"
  problemName: string; // Add problem name parameter
}

interface GeneratedCodeOutput {
  content: string;
}

export async function generateCodeFromSteps(
  params: GenerateCodeParams
): Promise<GeneratedCodeOutput> {
  // console.log("Content before replacements:", params.stepsFileContent); // Log initial content
  let result = params.stepsFileContent;
  result = removeManualHideBlocks(result); // Add this line to remove manual hide blocks
  result = removeImports(result);
  result = removeUnwantedLines(result);
  result = replaceProblemStateSignature(result, params.targetFunctionSignature);
  result = replaceGetStepsReturn(result);

  result = removeJSDocComments(result);
  result = removeExtraEmptyLines(result);
  result = removeComments(result); // Add this line to call removeComments
  console.log("Before removeManualHideBlocks:", result); // Log before removing hide blocks
  console.log("After removeManualHideBlocks:", result); // Log after removing hide blocks
  result = replaceBreakpointWithNumber(result);
  result = removeStepLoggerLog(result);
  const content = result;
  // console.log("Content after replacements:", content); // Log content after replacements
  try {
    const formattedContent = await prettier.format(content, {
      parser: "typescript",
    });
    //// console.log("code: ", formattedContent)
    return { content: formattedContent };
  } catch (e) {
    return {
      content: `FORMATTING ERROR:
${content}`,
    };
  }
}

export function removeImports(result: string) {
  // Updated regex to handle both single and multi-line imports
  result = result.replace(/^import[\s\S]*?;\s*/gm, "");
  return result;
}

export function removeJSDocComments(result: string) {
  result = result.replace(/\/\*\*[\s\S]*?\*\/\n?/g, "");
  return result;
}

export function removeComments(result: string) {
  result = result.replace(/\s*\/\/.*$/gm, "");
  return result;
}

export function removeExtraEmptyLines(result: string) {
  result = result.replace(/(\n\s*){2,}/g, "\n");
  return result;
}

export function replaceBreakpointWithNumber(result: string) {
  result = result.replace(
    /^.*l\.breakpoint\((\d+)\)[^;]*;\s*$\n/gm,
    "// #$1\n"
  );
  return result;
}

export function removeStepLoggerLog(result: string) {
  // console.log("Before removeStepLoggerLog:", result); // Add logging
  // Remove l.comment and other l. calls, handling multi-line comments
  result = result.replace(/^\s*l\.comment\s*=\s*[\s\S]*?;\s*$\n/gm, "");
  // Remove other single-line l. calls, but keep the newline
  result = result.replace(/^\s*l\.(?!comment\s*=)[\s\S]*?;\s*$/gm, ""); // Removed \n from the end of the regex
  // console.log("After removeStepLoggerLog:", result); // Add logging
  return result;
}

/**
 * Removes lines between // HIDE_START and // HIDE_END markers.
 * @param result The input string content.
 * @returns The content with manual hide blocks removed.
 */
export function removeManualHideBlocks(result: string): string {
  const regex = /\s*\/\/ HIDE_START[\s\S]*?\/\/ HIDE_END\s*/g;
  return result.replace(regex, "\n");
}

/**
 * Removes lines containing StepLoggerV2, // HIDE, Pointer2D, or starting with //.
 * @param result The input string content.
 * @returns The content with unwanted lines removed.
 * @example
 * const input = `
 * const logger = new StepLoggerV2(); // Remove this
 * // HIDE this line
 * // This is a comment
 * const ptr: Pointer2D = { x: 0, y: 0 }; // Remove this
 * function myFunction() {
 *   // Some code
 * }
 * `;
 * const output = removeUnwantedLines(input);
 * // Expected output:
 * // `
 * //
 * //
 * //
 * // function myFunction() {
 * //   // Some code
 * // }
 * // `
 */
export function removeUnwantedLines(result: string): string {
  // console.log("Before removeUnwantedLines:", result); // Add logging
  // Replaces lines containing StepLoggerV2, // HIDE, or Pointer2D with a newline.
  const newResult = result.replace(/^.*(StepLoggerV2|\/\/ HIDE|Pointer2D).*$/gm, "\n");
  // console.log("After removeUnwantedLines:", newResult); // Add logging
  return newResult;
}

/**
 * Replaces the function signature and handles the ProblemState[] return type.
 * @param result The input string content.
 * @param targetFunctionSignature The function signature to insert.
 * @returns The content with the signature replaced.
 * @example
 * const input = `
 * export function generateSteps(
 *   intervals: Interval[],
 *   newInterval: Interval
 * ): ProblemState[] {
 *   // Some code
 * }
 * `;
 * const targetSignature = "mySolution(arr: number[]): number[]";
 * const output = replaceProblemStateSignature(input, targetSignature);
 * // Expected output:
 * // `
 * // function mySolution(arr: number[]): number[] {
 * //   // Some code
 * // }
 * // `
 */
/**
 * Replaces the function signature and handles the ProblemState[] return type.
 * @param result The input string content.
 * @param targetFunctionSignature The function signature to insert.
 * @returns The content with the signature replaced.
 * @example
 * const input = `
 * export function generateSteps(
 *   intervals: Interval[],
 *   newInterval: Interval
 * ): ProblemState[] {
 *   // Some code
 * }
 * `;
 * const targetSignature = "mySolution(arr: number[]): number[]";
 * const output = replaceProblemStateSignature(input, targetSignature);
 * // Expected output:
 * // `
 * // function mySolution(arr: number[]): number[] {
 * //   // Some code
 * // }
 * // `
 */
export function replaceProblemStateSignature(
  result: string,
  targetFunctionSignature: string // This parameter seems to be unused with the new regex approach
): string {
  // console.log("Before replaceProblemStateSignature:", result); // Add logging
  // Replace the function declaration with the correct signature and opening brace
  result = result.replace(
    /^(?:export\s+)?function\s+(\w+)\s*\([\s\S]*?\)\s*:\s*ProblemState\[\]\s*\{\s*$/gm,
    "export function "+targetFunctionSignature+" {"
  );
  // console.log("After replaceProblemStateSignature:", result); // Add logging
  return result;
}

/**
 * Replaces lines containing "return l.getSteps" with "return result;".
 * @param result The input string content.
 * @returns The content with the return statement replaced.
 * @example
 * const input = `
 * function solve(): ProblemState[] {
 *   // Some code
 *   return l.getSteps();
 * }
 * `;
 * const output = replaceGetStepsReturn(input);
 * // Expected output:
 * // `
 * // function solve(): ProblemState[] {
 * //   // Some code
 * //   return result;
 * // }
 * // `
 */
export function replaceGetStepsReturn(result: string): string {
  // console.log("Before replaceGetStepsReturn:", result); // Add logging
  const newResult = result.replace(/^.*return l\.getSteps.*;\s*$/gm, "return result;");
  // console.log("After replaceGetStepsReturn:", newResult); // Add logging
  return newResult;
}
