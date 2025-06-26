import ProblemHeader from "./ProblemHeader";
import StateDescription from "./ProblemDescription";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import copy from "copy-to-clipboard";

import DisplayState from "./DisplayState";
import CodePreview from "./CodePreview";
import Slider from "./Slider";
import ProblemTabs from "./ProblemTabs"; // Import the new component
import { useAtom, useSetAtom } from "jotai";
import {
  maxStepAtom,
  problemAtom,
  problemStateAtom,
  stepAtom,
  selectedTestCaseNumberAtom,
} from "../atom";
import { getProblem, getProblemState, getProblemSize } from "../api";
import TestCaseSelector from "./TestCaseSelector";
import type {
  Problem,
  ProblemMetadata,
  ProblemState,
  TestCase,
} from "algo-lens-core/src/types";


interface ProblemVisualizerProps {
  state: ProblemState;
}

function ProblemVisualizer({ state }: ProblemVisualizerProps) {
  const [activeTab, setActiveTab] = useState("visualizer"); // Keep state here for content rendering
  const [showHeader, setShowHeader] = useState(true); // New state for controlling visibility
  const [problem] = useAtom(problemAtom); // No need to set problem here anymore
  const [displayStateData, setDisplayStateData] = useState(state);

  const [step, setStep] = useAtom(stepAtom);
  const [maxStep, setMaxStep] = useAtom(maxStepAtom);
  const [selectedTestCaseNumber, setSelectedTestCaseNumber] = useAtom(
    selectedTestCaseNumberAtom
  );

  // Initialize selected test case number when problem changes
  useEffect(() => {
    if (problem && problem.testcases && problem.testcases.length > 0) {
      const defaultIndex = problem.testcases.findIndex(
        (tc: TestCase<any, any>) => tc.isDefault
      );
      setSelectedTestCaseNumber(defaultIndex !== -1 ? defaultIndex + 1 : 1);
    }
  }, [problem, setSelectedTestCaseNumber]);

  // Update local state when the state prop changes
  useEffect(() => {
    setDisplayStateData(state);
  }, [state]);

  // Use props instead of Jotai atoms for problem and state during debugging
  // if (!state || !problem || !problem.testcases) {
  //   return null;
  // }
  // const { title, code, id, testcases } = problem;

  // Add a check for problem and state here as they are now props
  if (!problem || !state || !problem.testcases) {
    console.log("ProblemVisualizer - problem or state or testcases is null", {
      problem,
      state,
    });
    return null;
  }

  const { title, code, id, testcases } = problem;

  const breakpointToLineMap = new Map<number, number>();
  const lines = code!.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const loc = lines[i];
    if (
      loc.trimStart().startsWith("//#") ||
      loc.trimStart().startsWith("// #")
    ) {
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

  // Fetch problem size when problem or selected test case changes
  useEffect(() => {
    if (problem && selectedTestCaseNumber) {
      getProblemSize(problem.id!, selectedTestCaseNumber).then((size) =>
        setMaxStep(size)
      );
    }
  }, [problem, selectedTestCaseNumber, setMaxStep]);

  // Reset step to 1 when selected test case changes
  useEffect(() => {
    setStep(1);
  }, [selectedTestCaseNumber, setStep]);

  // Removed state fetching useEffect as it's now in useProblemState

  const handleCloseProblemView = () => {
    setShowHeader(false);
  };

  return (
    <div className="mx-2 lg:mx-8 my-8 flex-1">
      <div className="">
        {/* Render ProblemTabs once, above the conditional content */}
        <ProblemTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {/* Tab Content Area */}
        <div className="mt-4">
          {/* Visualizer Content Container */}
          {activeTab === "visualizer" && (
            <div className="visualizer-content">
              {/* Moved original content here */}
              <div className="flex flex-col lg:flex-row  lg:gap-20">
                <div className="flex-1 p-2  lg:w-1/2">
                  {showHeader && (
                    <ProblemHeader
                      title={title}
                      id={id}
                      problem={problem}
                      handleCopyCode={handleCopyCode}
                      onClose={handleCloseProblemView} // Pass the new close handler
                    />
                  )}
                  {/* Integrate TestCaseSelector */}

                  {/* Add check for state before accessing description */}
                  {state?.description && (
                    <StateDescription description={state.description} />
                  )}

                  {/* Add check for code before passing to CodePreview */}
                  {code && (
                    <CodePreview code={code} highlightLineIndex={line!} />
                  )}
                </div>
                <div className="lg:pl-6 flex-1 lg:w-1/2  lg:p-2 space-y-4">
                  {testcases && testcases.length > 1 && (
                    <TestCaseSelector
                      testcases={testcases}
                      selectedTestCaseNumberAtom={selectedTestCaseNumberAtom}
                    />
                  )}
                  {/* Add check for maxStep before rendering Slider */}
                  {maxStep !== undefined && (
                    <Slider
                      min={1}
                      max={maxStep}
                      value={step}
                      onChange={handleSliderChange}
                    />
                  )}
                  {/* Add check for state before passing to DisplayState */}
                  {displayStateData && (
                    <DisplayState
                      key={displayStateData.breakpoint} // Add key prop based on breakpoint
                      state={displayStateData}
                      problem={problem}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Description Content Container */}
          {activeTab === "description" && (
            <div className="description-content">
              {/* Display problem description or fallback */}
              <div className="p-4">
                {(problem as any)?.description ? (
                  <p>{(problem as any).description}</p> // Assuming description is plain text
                ) : (
                  <p>No description available.</p>
                )}
              </div>
            </div>
          )}

          {/* Explanation Content Container */}
          {activeTab === "explanation" && (
            <div className="explanation-content p-4 prose">
              {" "}
              {/* Added padding and prose class */}
              {(problem as any)?.explanation ? (
                <ReactMarkdown>{(problem as any).explanation}</ReactMarkdown>
              ) : (
                "No explanation available. (Work in progress)"
              )}
            </div>
          )}
        </div>

        {/* Original content block removed from here */}
      </div>
    </div>
  );
}

export default ProblemVisualizer;
