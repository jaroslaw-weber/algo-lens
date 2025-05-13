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
  let result = params.stepsFileContent;
  result = removeUnwantedLines(result);
  result = replaceProblemStateSignature(result, params.targetFunctionSignature);
  result = replaceGetStepsReturn(result);

  result = removeJSDocComments(result);
  result = removeComments(result);
  result = replaceBreakpointWithNumber(result);
  result = removeImports(result);
  result = removeExtraEmptyLines(result);
  result = removeStepLoggerLog(result);
  const content = result;
  //console.log("result", result);
  const formattedContent = await prettier.format(content, {
    parser: "typescript",
  });
  //console.log("code: ", formattedContent)
  return { content: formattedContent };
}


function removeImports(result: string) {
  result = result.replace(/^import[\s\S]*?;?\n/gm, "");
  return result;
}

function removeJSDocComments(result: string) {
  result = result.replace(/\/\*\*[\s\S]*?\*\/\n?/g, "");
  return result;
}

function removeComments(result: string) {
  result = result.replace(/\s*\/\/.*$/gm, "");
  return result;
}

function removeExtraEmptyLines(result: string) {
  result = result.replace(/(\n\s*){2,}/g, "\n");
  return result;
}



function replaceBreakpointWithNumber(result: string) {

  result = result.replace(/^.*l\.breakpoint\((\d+)\)[^;]*;\s*$\n/gm, "// #$1\n");
  return result;
}


function removeStepLoggerLog(result: string) {
  result = result.replace(/l\.\s*[\s\S]*?;\s*/g, ""); 
  return result;
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
function removeUnwantedLines(result: string): string {
  return result.replace(/^.*(StepLoggerV2|\/\/ HIDE|Pointer2D).*$|^\s*\/\/.*$/gm, "");
}

/**
 * Replaces lines containing ": ProblemState[] {" with the target function signature.
 * @param result The input string content.
 * @param targetFunctionSignature The function signature to insert.
 * @returns The content with the signature replaced.
 * @example
 * const input = `
 * function solve(): ProblemState[] {
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
function replaceProblemStateSignature(result: string, targetFunctionSignature: string): string {
  return result.replace(/^.*: ProblemState\[\] \{\s*$/gm, "function " + targetFunctionSignature + " {");
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
function replaceGetStepsReturn(result: string): string {
  return result.replace(/^.*return l\.getSteps.*;\s*$/gm, "return result;");
}
