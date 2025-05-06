import React, { useState, useRef, useEffect } from "react";
import copy from "copy-to-clipboard";

import DisplayState from "./DisplayState";
import CodePreview from "./CodePreview";
import Slider from "./Slider";
import { useAtom } from "jotai";
import { maxStepAtom, problemAtom, problemStateAtom, stepAtom } from "../atom";
import { getProblem, getProblemSize } from "../api";

function ProblemVisualizer() {
  const [activeTab, setActiveTab] = useState("visualizer"); // Added state for active tab
  const [state] = useAtom(problemStateAtom);
  const [problem, setProblem] = useAtom(problemAtom);

  const [step, setStep] = useAtom(stepAtom);
  const [maxStep, setMaxStep] = useAtom(maxStepAtom);

  if (!state || !problem) {
    return null;
  }
  const { title, code, id } = problem;

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

  useEffect(() => {
    getProblemSize(problem.id!).then((size) => setMaxStep(size));
  }, [problem]);

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

        {/* Tabs */}
        <div role="tablist" className="tabs tabs-lifted mt-4">
          <button
            role="tab"
            className={`tab ${activeTab === 'visualizer' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('visualizer')}
          >
            Visualizer
          </button>
          <button
            role="tab"
            className={`tab ${activeTab === 'description' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="mt-4">
          {/* Visualizer Content Container */}
          {activeTab === 'visualizer' && (
            <div className="visualizer-content">
              {/* Moved original content here */}
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
                   <div>
                     <DisplayState state={state} problem={problem} />
                   </div>
                 </div>
               </div>
            </div>
          )}

          {/* Description Content Container */}
          {activeTab === 'description' && (
            <div className="description-content">
              {/* Display problem description or fallback */}
              <div className="p-4">
                {problem?.description ? (
                  <p>{problem.description}</p> // Assuming description is plain text
                ) : (
                  <p>No description available.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Original content block removed from here */}
      </div>
    </div>
  );
}

export default ProblemVisualizer;
