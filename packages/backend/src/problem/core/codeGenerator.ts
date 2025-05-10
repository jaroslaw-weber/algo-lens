interface GenerateCodeParams {
  stepsFileContent: string;
  targetFunctionSignature: string; // e.g., "getSum(a: number, b: number): number"
}

interface GeneratedCodeOutput {
  content: string;
}

function includeLine(line: string) {
  if (line.trim().startsWith("l.")) {
    return false;
  }
  if (line.trim().startsWith("import")) {
    return false;
  }
  return true;
}

export function generateCodeFromSteps(
  params: GenerateCodeParams
): GeneratedCodeOutput {
  const lines = params.stepsFileContent.split("\n");

  const result = lines.filter(includeLine);
  const content = result.join("\n");

  return { content };
}
