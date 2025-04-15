import { useAtom } from "jotai";
import ProblemVisualizer from "../../components/ProblemVisualizer";
import { maxStepAtom, problemAtom, problemStateAtom, stepAtom } from "../../atom";
import { getProblem, getProblemState } from "../../api";
import { useEffect } from "react";

export default function ProblemView() {
  const [problem, setProblem] = useAtom(problemAtom);
  const [step, setStep] = useAtom(stepAtom);
  const [state, setState] = useAtom(problemStateAtom);
  const [maxStep, setMaxStep] = useAtom(maxStepAtom);

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
    const s = await getProblemState(id!, step);

    console.log("init problem visualizer with problem", p);
    setProblem(p);
    setState(s);
  }
  useEffect(() => {
    init();
  }, []);
  return <div>{problem && state && <ProblemVisualizer />}</div>;
}
