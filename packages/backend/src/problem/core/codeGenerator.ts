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
  let lines = result.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // console.log("line", line);
    if (line.includes(": ProblemState[] {")) {
      lines[i] = "function "+ params.targetFunctionSignature + "{";
    }
    if (line.includes("return l.getSteps")) {
      lines[i] = "return result;";
    }
    if (line.includes("StepLoggerV2")) {
      lines[i] = "";
    }
  }

  lines = lines.filter(l => !l.trim().startsWith("//"));
  // Remove lines containing "Pointer2D"
  lines = lines.filter(l => !l.includes("Pointer2D"));
  result = lines.join("\n");

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
  console.log("code: ", formattedContent)
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
  result = result.replace(/l\.[\s\S]*?;/g, "");
  return result;
}

