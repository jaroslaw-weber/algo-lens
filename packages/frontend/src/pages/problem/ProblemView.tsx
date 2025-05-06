import { useAtom } from "jotai";
import ProblemVisualizer from "../../components/ProblemVisualizer";
import {
  maxStepAtom,
  problemAtom,
  problemStateAtom,
  selectedTestCaseIndexAtom, // Import the new atom
  stepAtom,
} from "../../atom";
import { getProblem, getProblemSize, getProblemState } from "../../api"; // Import getProblemSize
import { useEffect } from "react";

export function useProblemState() {
  const [problem] = useAtom(problemAtom); // Only need to read problem here
  const [step] = useAtom(stepAtom); // Only need to read step
  const [, setState] = useAtom(problemStateAtom); // Only need setter for state
  const [selectedTestCaseIndex] = useAtom(selectedTestCaseIndexAtom); // Read the selected index

  useEffect(() => {
    // Ensure problem, step, and selectedTestCaseIndex are valid before fetching
    if (problem?.id && step >= 1 && selectedTestCaseIndex >= 0) {
      const fetchState = async () => {
        try {
          // Pass selectedTestCaseIndex to getProblemState
          const s = await getProblemState(problem.id, selectedTestCaseIndex, step);
          setState(s);
        } catch (error) {
          console.error(`Failed to fetch state for step ${step}, test case ${selectedTestCaseIndex}:`, error);
          setState(null); // Reset state on error
        }
      };
      fetchState();
    } else {
       // Reset state if dependencies are invalid (e.g., step becomes 0 or problem is null)
       setState(null);
    }
    // Add selectedTestCaseIndex to dependency array
  }, [problem?.id, step, selectedTestCaseIndex, setState]); // Depend on problem.id for safety

  // No need to return state, as it's managed globally
}


export default function ProblemView() {
  const [problem, setProblem] = useAtom(problemAtom);
  const [state] = useAtom(problemStateAtom); // Read state for conditional rendering
  const [, setMaxStep] = useAtom(maxStepAtom); // Need setter for maxStep
  const [, setSelectedTestCaseIndex] = useAtom(selectedTestCaseIndexAtom); // Need setter for selected index
  const [, setStep] = useAtom(stepAtom); // Need setter for step


  // Effect to initialize or react to problem changes (e.g., fetched or from static props)
   useEffect(() => {
    const initializeProblemData = async () => {
      let currentProblem = problem; // Use the atom's current value

      // If problem is not loaded yet, try fetching based on URL
      if (!currentProblem) {
        const url = new URL(window.location.href);
        const id = url.searchParams.get("id");
        if (id) {
          console.log("Fetching problem with id", id);
          try {
            currentProblem = await getProblem(id);
            if (currentProblem) {
              setProblem(currentProblem); // Set the fetched problem globally
            } else {
               console.error("Problem not found for id:", id);
               return; // Stop initialization if problem fetch fails
            }
          } catch (error) {
            console.error("Failed to fetch problem:", error);
            return; // Stop initialization on error
          }
        } else {
           console.log("No ID in URL and no initial problem data.");
           return; // Cannot initialize
        }
      }


      // Proceed with initialization if we have a problem object
      if (currentProblem) {
        console.log("Initializing test case and size for problem:", currentProblem.id);
        // Find default test case index
        const defaultIndex = currentProblem.testcases?.findIndex(tc => tc.isDefault === true) ?? -1;
        const initialIndex = defaultIndex >= 0 ? defaultIndex : 0;

        // Check if test cases exist before setting index and fetching size
        if (currentProblem.testcases && currentProblem.testcases.length > 0 && initialIndex < currentProblem.testcases.length) {
           setSelectedTestCaseIndex(initialIndex);
           setStep(1); // Reset step

           try {
             // Fetch initial size based on the determined initial index
             const initialSize = await getProblemSize(currentProblem.id, initialIndex);
             setMaxStep(initialSize > 0 ? initialSize : 1); // Ensure maxStep is at least 1
             console.log(`Set initial test case index to ${initialIndex}, max steps to ${initialSize}`);
           } catch (error) {
              console.error(`Failed to get size for initial test case ${initialIndex}:`, error);
              setMaxStep(1); // Fallback size
           }
        } else {
            console.warn(`Problem ${currentProblem.id} has no test cases or invalid default index.`);
            setSelectedTestCaseIndex(0); // Default to 0 even if no test cases exist
            setStep(1);
            setMaxStep(1); // No steps if no test cases
        }
      }
    };

    initializeProblemData();

    // Re-run this effect if the problem ID changes (e.g., navigating between problem pages client-side if that were implemented)
   }, [problem?.id, setProblem, setSelectedTestCaseIndex, setStep, setMaxStep]); // Use problem.id as primary dependency

  // Use the globally managed problem state for rendering
  const currentProblem = useAtom(problemAtom)[0]; // Read the latest problem value

  // Render visualizer only when problem and state are ready
  // Pass problem data as a prop to ProblemVisualizer
  return <div>{currentProblem ? <ProblemVisualizer problem={currentProblem} /> : <p>Loading problem...</p>}</div>;
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
