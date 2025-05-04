import { useAtom, useSetAtom } from "jotai"; // Import useSetAtom
import ProblemVisualizer from "../../components/ProblemVisualizer";
import { errorAtom, maxStepAtom, problemAtom, problemStateAtom, stepAtom } from "../../atom"; // Import errorAtom
import { getProblem, getProblemState } from "../../api";
import { useEffect, useState } from "react"; // Keep useState for now

const setErrorAtom = useSetAtom(errorAtom); // Define setter once at module scope

export function useProblemState() {
  const [problem, setProblem] = useAtom(problemAtom);
  const [step, setStep] = useAtom(stepAtom);
  const [state, setState] = useAtom(problemStateAtom);
  // Removed local getStateError state

  useEffect(() => {
    if (problem && step !== undefined) { // Ensure step is defined
      const fetchState = async () => {
        setErrorAtom(null); // Reset global error before fetching state
        try {
          const s = await getProblemState(problem.id!, step);
          setState(s);
        } catch (err) {
          console.error("Failed to fetch problem state:", err);
          setErrorAtom("Failed to load visualization state. Please try refreshing."); // Set global error
        }
      };
      fetchState();
    }
    // Cleanup function to clear error on unmount or dependency change
    return () => setErrorAtom(null);
  }, [problem, step, setState]); // setErrorAtom is stable, no need to add

  // Only return state now
  return state;
}

export default function ProblemView() {
  const [problem, setProblem] = useAtom(problemAtom);
  // Removed local getProblemError state
  const state = useProblemState(); // Get state directly

  async function init() {
    console.log("init problem visualizer");
    if (problem) {
      return;
    }
    //get id from url query parameters
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    console.log("init problem visualizer with id", id);
    //fetch problem details from backend
    try {
      const p = await getProblem(id!);
      console.log("init problem visualizer with problem", p);
      setProblem(p);
    } catch (err) {
      console.error("Failed to fetch problem details:", err);
      setErrorAtom("Failed to load problem details. Please check the ID or try again later."); // Set global error
    }
  }
  useEffect(() => {
    setErrorAtom(null); // Reset global error on init/mount
    init();
    // Cleanup function to clear error on unmount
    return () => setErrorAtom(null);
  }, []); // Keep dependency array empty for init on mount

  // Removed conditional rendering for local errors

  // Render visualizer only if problem data is loaded.
  // Error display is now handled globally by ErrorPopup.
  // ProblemVisualizer and its children handle the 'state' potentially being null.
  return <div>{problem && <ProblemVisualizer />}</div>;
}
