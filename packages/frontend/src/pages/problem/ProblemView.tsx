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
import PlayIcon from "../../components/icons/PlayIcon"; // Import a play icon

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
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (problem?.podcastUrl) {
      const audioElement = new Audio(problem.podcastUrl);
      setAudio(audioElement);

      // Event listeners for the audio element
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("ended", handleEnded);

      // Cleanup
      return () => {
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener("ended", handleEnded);
        audioElement.pause(); // Ensure audio stops if component unmounts
        setAudio(null); // Clear the audio object
      };
    } else {
      // Ensure audio is stopped and cleared if podcastUrl is not present or removed
      if (audio) {
        audio.pause();
        setAudio(null);
      }
      setIsPlaying(false);
    }
  }, [problem?.podcastUrl]);

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

  //console.log("ProblemView - problem:", problem);
  //console.log("ProblemView - state:", state);
  // Temporarily remove conditional rendering and pass problem and state directly for debugging
  return (
    <div>
      {problem?.podcastUrl && (
        <div className="mb-4 flex items-center justify-end">
          <button
            onClick={togglePlayPause}
            className="btn btn-sm btn-outline flex items-center space-x-2"
          >
            <PlayIcon className={`h-5 w-5 ${isPlaying ? "hidden" : ""}`} />
            {isPlaying ? (
              <svg // Pause Icon
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : null}
            <span>{isPlaying ? "Pause Podcast" : "Play Podcast"}</span>
          </button>
        </div>
      )}
      {state && <ProblemVisualizer state={state} />}
    </div>
  );
}
