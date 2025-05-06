import React, { useState, useRef, useEffect } from "react";
import copy from "copy-to-clipboard";

import DisplayState from "./DisplayState";
import CodePreview from "./CodePreview";
import Slider from "./Slider";
import { useAtom } from "jotai";
import { maxStepAtom, problemAtom, problemStateAtom, stepAtom, testcaseIndexAtom } from "../atom";
import { getProblem, getProblemSize, setTestcaseIndex } from "../api";

function ProblemVisualizer() {
  const [state] = useAtom(problemStateAtom);
  const [problem, setProblem] = useAtom(problemAtom);
  const [step, setStep] = useAtom(stepAtom);
  const [maxStep, setMaxStep] = useAtom(maxStepAtom);
  const [testcaseIndex, setTestcaseIndexState] = useAtom(testcaseIndexAtom);

  if (!state || !problem) {
    return null;
  }
  const { title, code, id, testcases } = problem;

  const breakpointToLineMap = new Map<number, number>();
  const lines = code!.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const loc = lines[i];
    if (loc.trimStart().startsWith("//#")) {
      //get number from this line with regex
      const no = new RegExp(/\d+/).exec(loc);
      if (!no) {
        throw new Error("no breakpoints found in code");
      }
      if (no![0]) {
        breakpointToLineMap.set(parseInt(no![0]), i);
      }
    }
  }
  const breakpoint = state.breakpoint;
  const line = breakpointToLineMap.get(breakpoint);

  const handleSliderChange = (value: number) => {
    setStep(value);
  };

  const handleCopyCode = () => {
    copy(code!);
    alert("Code copied to clipboard!");
  };
  
  const handleTestcaseChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(e.target.value);
    try {
      await setTestcaseIndex(problem.id!, newIndex);
      setTestcaseIndexState(newIndex);
      // Reset step to 1 when changing testcase
      setStep(1);
      // Update max step for the new testcase
      const size = await getProblemSize(problem.id!, newIndex);
      setMaxStep(size);
    } catch (error) {
      console.error("Failed to set testcase index:", error);
    }
  };

  useEffect(() => {
    getProblemSize(problem.id!, testcaseIndex).then((size) => setMaxStep(size));
  }, [problem, testcaseIndex]);

  // Format testcase for display
  const formatTestcase = (testcase: any) => {
    if (!testcase) return "N/A";
    
    try {
      if (typeof testcase === 'object') {
        return JSON.stringify(testcase);
      }
      return String(testcase);
    } catch (e) {
      return "Error formatting testcase";
    }
  };

  return (
    <div className="mx-8 my-8 flex-1">
      <div className="">
        <div className="flex items-center gap-6">
          {/* Adjust the gap as needed */}
          <h2 className="font-display text-3xl pl-2">{title}</h2>
          <a
            href={`https://leetcode.com/problems/${id}/description/`}
            className="link tooltip tooltip-right"
            data-tip="Go to Leetcode"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              className="fas fa-external-link-alt transition-transform duration-300 hover:scale-110"
              aria-hidden="true"
            ></i>
          </a>
          <button
            className="button button-primary tooltip tooltip-right"
            onClick={handleCopyCode}
            data-tip="Copy code"
          >
            <i className="fas fa-copy"></i>
          </button>
          
          {/* Testcase Dropdown */}
          {testcases && testcases.length > 0 && (
            <div className="flex items-center gap-2">
              <label htmlFor="testcase-select" className="text-sm font-medium">
                Testcase:
              </label>
              <select
                id="testcase-select"
                className="select select-bordered select-sm"
                value={testcaseIndex}
                onChange={handleTestcaseChange}
              >
                {testcases.map((testcase, index) => (
                  <option key={index} value={index}>
                    {index + 1}: {formatTestcase(testcase.input).substring(0, 30)}
                    {formatTestcase(testcase.input).length > 30 ? "..." : ""}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-20">
          <div className="flex-1 p-2 lg:w-1/2">
            <CodePreview code={code} highlightLineIndex={line} />
          </div>
          <div className="lg:pl-6 flex-1 lg:w-1/2 lg:p-2 space-y-4">
            <div className="flex items-center gap-6">
              <Slider
                min={1}
                max={maxStep}
                value={step}
                onChange={handleSliderChange}
              />
            </div>
            <div>
              <DisplayState state={state} problem={problem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemVisualizer;
