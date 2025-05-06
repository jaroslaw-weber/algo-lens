import { useAtom } from "jotai";
import ProblemVisualizer from "../../components/ProblemVisualizer";
import { maxStepAtom, problemAtom, problemStateAtom, stepAtom, testcaseIndexAtom } from "../../atom";
import { getProblem, getProblemState, getCurrentTestcaseIndex } from "../../api";
import { useEffect } from "react";

export function useProblemState() {
  const [problem, setProblem] = useAtom(problemAtom);
  const [step, setStep] = useAtom(stepAtom);
  const [state, setState] = useAtom(problemStateAtom);
  const [testcaseIndex] = useAtom(testcaseIndexAtom);

  useEffect(() => {
    if (problem && step) {
      const fetchState = async () => {
        const s = await getProblemState(problem.id!, step, testcaseIndex);
        setState(s);
      };
      fetchState();
    }
  }, [problem, step, testcaseIndex]);

  return state;
}

export default function ProblemView() {
  const [problem, setProblem] = useAtom(problemAtom);
  const [, setTestcaseIndex] = useAtom(testcaseIndexAtom);
  const state = useProblemState();

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
    const p = await getProblem(id!);
    
    // Get current testcase index
    try {
      const currentIndex = await getCurrentTestcaseIndex(id!);
      setTestcaseIndex(currentIndex);
    } catch (error) {
      console.error("Failed to get current testcase index:", error);
      setTestcaseIndex(0);
    }

    console.log("init problem visualizer with problem", p);
    setProblem(p);
  }
  
  useEffect(() => {
    init();
  }, []);
  
  return <div>{problem && state && <ProblemVisualizer />}</div>;
}
