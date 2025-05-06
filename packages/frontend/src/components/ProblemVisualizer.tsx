import React, { useState, useRef, useEffect } from "react";
import copy from "copy-to-clipboard";

import DisplayState from "./DisplayState";
import CodePreview from "./CodePreview";
import React, { ChangeEvent, useEffect } from "react"; // Import ChangeEvent, remove useState/useRef if not needed elsewhere
import copy from "copy-to-clipboard";

import DisplayState from "./DisplayState";
import CodePreview from "./CodePreview";
import Slider from "./Slider";
import { useAtom } from "jotai";
// Import selectedTestCaseIndexAtom and remove problemAtom
import { maxStepAtom, problemStateAtom, selectedTestCaseIndexAtom, stepAtom } from "../atom";
// Remove getProblem, keep getProblemSize
import { getProblemSize } from "../api";
import { Problem } from "algo-lens-core"; // Import Problem type

// Accept problem as a prop
function ProblemVisualizer({ problem }: { problem: Problem<any, any> }) {
  const [state] = useAtom(problemStateAtom);
  const [step, setStep] = useAtom(stepAtom);
  const [maxStep, setMaxStep] = useAtom(maxStepAtom);
  // Add hooks for selected test case
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useAtom(selectedTestCaseIndexAtom);

   // Add useEffect for Max Step Update
   useEffect(() => {
    if (problem?.id && selectedTestCaseIndex >= 0) { // Check if problem.id exists and index is valid
      console.log(`Visualizer: Fetching size for problem ${problem.id}, test case index ${selectedTestCaseIndex}`);
      getProblemSize(problem.id, selectedTestCaseIndex)
        .then((size) => {
          console.log(`Visualizer: Received size ${size}`);
          setMaxStep(size > 0 ? size : 1); // Ensure max is at least 1
        })
        .catch(error => { // Add error handling
          console.error("Visualizer: Failed to fetch problem size:", error);
          setMaxStep(1); // Fallback on error
          // Optionally set a default max step or show an error
        });
    }
   }, [problem?.id, selectedTestCaseIndex, setMaxStep]); // Add dependencies

  if (!state || !problem) { // Check problem prop
    return <p>Loading...</p>; // Or some other loading indicator
  }
  // Destructure testcases from problem prop
  const { title, code, id, testcases } = problem;

  const breakpointToLineMap = new Map<number, number>();
  const lines = code ? code.split("\n") : []; // Handle potentially null code
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
  // Handle potentially undefined breakpoint
  const line = state.breakpoint ? breakpointToLineMap.get(state.breakpoint) : undefined;

  const handleSliderChange = (value: number) => {
    setStep(value);
  };

  const handleCopyCode = () => {
    if(code) { // Check if code exists
        copy(code);
        alert("Code copied to clipboard!");
    }
  };

  // Handler for test case change
  const handleTestCaseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    if (!isNaN(newIndex)) { // Ensure parsing was successful
        console.log(`Visualizer: Setting test case index to ${newIndex}`);
        setSelectedTestCaseIndex(newIndex);
        setStep(1); // Reset step to 1 on test case change
    }
  };

  // Remove the old useEffect that relied on problem from atom

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
             {/* Add Test Case Selector UI */}
             <div className="flex items-center gap-2 mb-4"> {/* Added margin-bottom */}
               <label htmlFor="testcase-select" className="font-medium">Select Test Case:</label>
               <select
                 id="testcase-select"
                 className="select select-bordered select-sm" // Added DaisyUI classes
                 value={selectedTestCaseIndex}
                 onChange={handleTestCaseChange} // Use the handler function
               >
                 {/* Check if testcases exist before mapping */}
                 {testcases?.map((tc, index) => (
                   <option key={index} value={index}>
                     {/* Use description if available, otherwise default text */}
                     {tc.description ? `Case ${index + 1}: ${tc.description}` : `Test Case ${index + 1}`}
                     {tc.isDefault ? ' (Default)' : ''} {/* Indicate default */}
                   </option>
                 ))}
               </select>
             </div>
             {/* End Test Case Selector UI */}

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
