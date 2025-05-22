import { useAtom } from "jotai";
import ProblemVisualizer from "../../components/ProblemVisualizer";
import {
  maxStepAtom,
  problemAtom,
  problemStateAtom,
  stepAtom,
  selectedTestCaseNumberAtom, // Import selectedTestCaseNumberAtom
} from "../../atom";
import { getProblem, getProblemState } from "../../api";
import { useEffect, useState } from "react"; // Import useState
import { pb } from "../../auth/pocketbase"; // Import pb
import BookmarkButton from "../../bookmark/BookmarkButton";
import { trackUmamiEvent } from "../../utils/umami";

export function useProblemState() {
  const [problem] = useAtom(problemAtom);
  const [step] = useAtom(stepAtom);
  const [selectedTestCaseNumber] = useAtom(selectedTestCaseNumberAtom); // Use selectedTestCaseNumberAtom
  const [state, setState] = useAtom(problemStateAtom);

  useEffect(() => {
    if (problem && selectedTestCaseNumber && step) {
      // Add selectedTestCaseNumber to dependencies
      const fetchState = async () => {
        const s = await getProblemState(
          problem.id!,
          selectedTestCaseNumber,
          step
        ); // Pass selectedTestCaseNumber
        setState(s);
      };
      fetchState();
    }
  }, [problem, selectedTestCaseNumber, step, setState]); // Add selectedTestCaseNumber to effect dependencies

  return state;
}

export default function ProblemView() {
  const [problem, setProblem] = useAtom(problemAtom);
  const [step] = useAtom(stepAtom);
  const state = useProblemState();

  async function init() {
    //

    if (problem) {
      return;
    }
    //get id from url query parameters
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    //
    //fetch problem details from backend
    const p = await getProblem(id!);

    //
    setProblem(p);
    // Track problem view event
    trackUmamiEvent("view-problem", { problemId: id });
  }
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    // Track step navigation event
    if (problem && step) {
      trackUmamiEvent("navigate-step", { problemId: problem.id, step: step });
    }
  }, [step, problem]);

  console.log("ProblemView - problem:", problem);
  console.log("ProblemView - state:", state);
  // Temporarily remove conditional rendering and pass problem and state directly for debugging
  return <div>{state && <ProblemVisualizer state={state} />}</div>;
}
