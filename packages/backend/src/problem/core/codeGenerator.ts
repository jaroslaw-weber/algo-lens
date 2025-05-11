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
  const lines = result.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // console.log("line", line);
    if (line.includes(": ProblemState[] {")) {
      lines[i] = "function "+ params.targetFunctionSignature + "{";
    }
    if (line.includes("return l.getSteps")) {
      lines[i] = "return result;";
    }
    if (lines.includes("StepLoggerV2")) {
      lines[i] = "";
    }
  }

  result = lines.join("\n");

  // Remove comments
  result = result.replace(/^\s*\/\/.*$\n/gm, "");
  // Replace breakpoints with //#1 etc
  result = result.replace(/\s*\/\/.*$/gm, "");
  result = result.replace(/^.*l\.breakpoint\((\d+)\).*$\n/gm, "// #$1\n");
  //start with 'l.TEXT' and end with ; (include multiline)
  result = result.replace(/l\.[\s\S]*?;/g, "");
  // Remove extra empty lines (remove if 2 or more empty lines)
  result = result.replace(/(\n\s*){2,}/g, "\n");
  // Remove step logger line
  result = result.replace(/stepLogger\..*?;/g, "");
  // Remove imports
  result = result.replace(/^import[\s\S]*?;?\n/gm, "");
  const content = result;
  //console.log("result", result);
  const formattedContent = await prettier.format(content, {
    parser: "typescript",
  });
  console.log("code: ", formattedContent)
  return { content: formattedContent };
}
