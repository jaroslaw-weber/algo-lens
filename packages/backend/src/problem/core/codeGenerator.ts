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
  // Remove comments
  result = result.replace(/^\s*\/\/.*$\n/gm, "");
  // Replace breakpoints with //#1 etc
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
  const formattedContent = await prettier.format(content, {
    parser: "typescript",
  });
  return { content: formattedContent };
}
