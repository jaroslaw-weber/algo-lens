import { useAtom } from "jotai";
import ProblemVisualizer from "../../components/ProblemVisualizer";
import { maxStepAtom, problemAtom, problemStateAtom, stepAtom } from "../../atom";
import { getProblem, getProblemState } from "../../api";
import { useEffect } from "react";

export function useProblemState() {
  const [problem, setProblem] = useAtom(problemAtom);
  const [step, setStep] = useAtom(stepAtom);
  const [state, setState] = useAtom(problemStateAtom);

  useEffect(() => {
    if (problem && step) {
      const fetchState = async () => {
        const s = await getProblemState(problem.id!, step);
        setState(s);
      };
      fetchState();
    }
  }, [problem, step]);

  return state;
}

export default function ProblemView() {
  const [problem, setProblem] = useAtom(problemAtom);
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

    console.log("init problem visualizer with problem", p);
    setProblem(p);
  }
  useEffect(() => {
    init();
  }, []);
  return <div>{problem && state && <ProblemVisualizer />}</div>;
}
