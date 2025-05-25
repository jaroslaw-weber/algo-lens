import _ from "lodash";
import * as prettier from "prettier";

export interface GenerateCodeParams {
  stepsFileContent: string;
  targetFunctionSignature: string; // e.g., "getSum(a: number, b: number): number"
  problemName: string; // Add problem name parameter
  debug?: boolean; //log the regex matches
}

interface GeneratedCodeOutput {
  content: string;
}

export class CodeGenerator {
  private result: string;
  private debug: boolean;
  private targetFunctionSignature: string;

  constructor(params: GenerateCodeParams) {
    this.result = params.stepsFileContent;
    this.debug = params.debug || false;
    this.targetFunctionSignature = params.targetFunctionSignature;
  }

  private fix(
    regex: RegExp,
    replacement: string | ((substring: string, ...args: any[]) => string),
    functionName: string
  ): void {
    if (this.debug) {
      if (functionName == "removeExtraEmptyLines") {
        //
      } else {
        let match;
        regex.lastIndex = 0;
        while ((match = regex.exec(this.result)) !== null) {
          console.log(`--[${functionName}]--`);
          console.log(`Found: ${match[0]}`);
        }
        console.log("\n-------\n");
      }
    }
    this.result = this.result.replace(regex, replacement as any);
  }

  private remove(regex: RegExp, functionName: string): void {
    this.fix(regex, "", functionName);
  }

  private removeImports(): void {
    const regex = /^import[\s\S]*?;\s*/gm;
    this.remove(regex, "removeImports");
  }

  private removeJSDocComments(): void {
    const regex = /\/\*\*[\s\S]*?\*\/\n?/g;
    this.remove(regex, "removeJSDocComments");
  }

  private removeComments(): void {
    const regex = /\s*\/\/.*$/gm;
    this.remove(regex, "removeComments");
  }

  private removeExtraEmptyLines(): void {
    const regex = /(\n\s*){2,}/g;
    this.fix(regex, "\n", "removeExtraEmptyLines");
  }

  private replaceBreakpointWithNumber(): void {
    const regex = /^.*l\.breakpoint\((\d+)\)[^;]*;\s*$\n/gm;
    this.fix(regex, "// #$1\n", "replaceBreakpointWithNumber");
  }

  private removeStepLoggerLog(): void {
    this.remove(
      /^\s*l\.comment\s*=\s*[\s\S]*?;\s*$\n/gm,
      "removeStepLoggerLog (comment)"
    );
    this.remove(
      /^\s*l\.(?!comment\s*=)(?!getSteps\(\))[\s\S]*?;\s*$/gm,
      "removeStepLoggerLog (other)"
    );
  }

  private removeManualHideBlocks(): void {
    const regex = /\s*\/\/ HIDE_START[\s\S]*?\/\/ HIDE_END\s*/g;
    this.fix(regex, "\n", "removeManualHideBlocks");
  }

  private removeUnwantedLines(): void {
    const regex = /^.*(StepLoggerV2|\/\/ HIDE|Pointer2D).*$/gm;
    this.fix(regex, "\n", "removeUnwantedLines");
  }

  private replaceProblemStateSignature(): void {
    const regex =
      /^(?:export\s+)?function\s+(\w+)\s*\([\s\S]*?\)\s*:\s*ProblemState\[\]\s*\{\s*$/gm;
    this.fix(
      regex,
      "export function " + this.targetFunctionSignature + " {",
      "replaceProblemStateSignature"
    );
  }

  private replaceGetStepsReturn(): void {
    const regex = /return l\.getSteps\(\)/gm;
    this.fix(regex, "return result;", "replaceGetStepsReturn");
  }

  public async generate(): Promise<GeneratedCodeOutput> {
    this.replaceGetStepsReturn();
    this.removeManualHideBlocks();
    this.removeImports();
    this.replaceProblemStateSignature();
    this.removeUnwantedLines();
    this.removeJSDocComments();
    this.removeExtraEmptyLines();
    this.removeComments();
    this.replaceBreakpointWithNumber();
    this.removeStepLoggerLog();

    try {
      const formattedContent = await prettier.format(this.result, {
        parser: "typescript",
      });
      if (this.debug) {
        console.log(`generated code: ${formattedContent}`);
      }
      return { content: formattedContent };
    } catch (e) {
      return {
        content: `FORMATTING ERROR:
${this.result}`,
      };
    }
  }
}

export async function generateCodeFromSteps(
  params: GenerateCodeParams
): Promise<GeneratedCodeOutput> {
  const generator = new CodeGenerator(params);
  return generator.generate();
}
