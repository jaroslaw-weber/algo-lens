import React, { useState, useRef, useEffect } from "react"; // Ensure useState is imported
import copy from "copy-to-clipboard";

import DisplayState from "./DisplayState";
import CodePreview from "./CodePreview";
import Slider from "./Slider";
import { useAtom, useSetAtom } from "jotai"; // Import useSetAtom
import { errorAtom, maxStepAtom, problemAtom, problemStateAtom, stepAtom } from "../atom"; // Import errorAtom
import { getProblem, getProblemSize } from "../api";

function ProblemVisualizer() {
  const [state] = useAtom(problemStateAtom);
  const [problem, setProblem] = useAtom(problemAtom);

  const [step, setStep] = useAtom(stepAtom);
  const [maxStep, setMaxStep] = useAtom(maxStepAtom);
  const setErrorAtom = useSetAtom(errorAtom); // Get global error setter

  // Early return if essential data is missing
  // Note: Error handling for problem loading happens in ProblemView
  if (!problem) {
     return <div className="text-center p-4">Loading problem details...</div>; // Or some placeholder
  }
  // State might be null initially or if getStateError occurred in ProblemView
  // Components like DisplayState should handle null state gracefully
  // A check for state could be added here if needed, but DisplayState handles it.
  // if (!state) {
  //   return <div className="text-center p-4">Loading visualization state...</div>;
  // }

  const { title, code, id } = problem;

  const breakpointToLineMap = new Map<number, number>();
  const lines = code.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const loc = lines[i];
    if (loc.trimStart().startsWith("//#")) {
      //get number from this line with regex
      const no = new RegExp(/\d+/).exec(loc);
      if (no![0]) {
        breakpointToLineMap.set(parseInt(no![0]), i);
      }
    }
  }
  // Calculate breakpoint line (ensure state exists before accessing breakpoint)
  const breakpoint = state?.breakpoint; // Use optional chaining
  const line = breakpoint !== undefined ? breakpointToLineMap.get(breakpoint) : undefined; // Check if breakpoint exists

  const handleSliderChange = (value: number) => {
    setStep(value);
  };

  const handleCopyCode = () => {
    copy(code);
    alert("Code copied to clipboard!");
  };

  useEffect(() => {
    const fetchSize = async () => {
      if (!problem?.id) return; // Don't fetch if problem or id is missing
      setErrorAtom(null); // Reset global error before fetching
      try {
        const size = await getProblemSize(problem.id);
        setMaxStep(size);
      } catch (err) {
        console.error("Failed to fetch problem size:", err);
        setErrorAtom("Failed to load visualization size."); // Set global error
      }
    };
    fetchSize();
    // Cleanup function
    return () => setErrorAtom(null);
  }, [problem?.id, setMaxStep, setErrorAtom]); // Add setErrorAtom to dependency array

  return (
    <div className="mx-8 my-8 flex-1">
      <div className="">
        <div className="flex items-center gap-6">
          {/* Adjust the gap as needed */}
          <h2 className="font-display text-3xl pl-2">{title}</h2>
          <a
            href={`https://leetcode.com/problems/${id}/description/`}
            className="link  tooltip tooltip-right"
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
        </div>
        <div className="flex flex-col lg:flex-row  lg:gap-20">
          <div className="flex-1 p-2  lg:w-1/2">
            <CodePreview code={code} highlightLineIndex={line} />
          </div>
          <div className="lg:pl-6 flex-1 lg:w-1/2  lg:p-2 space-y-4">
            <div className="flex items-center gap-6">
              <Slider
                min={1}
                max={maxStep}
                value={step}
                onChange={handleSliderChange}
              />
            </div>
            {/* Removed local error display for getSizeError */}
            <div>
              {/* Pass state, which might be null if initial load or error */}
              <DisplayState state={state} problem={problem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemVisualizer;
