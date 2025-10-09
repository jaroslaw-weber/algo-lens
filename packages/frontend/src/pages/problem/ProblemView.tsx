import { useAtom } from "jotai";
import ProblemVisualizer from "../../components/ProblemVisualizer";
import {
  maxStepAtom,
  problemAtom,
  problemStateAtom,
  stepAtom,
  selectedTestCaseNumberAtom,
  loadingAtom, // Import selectedTestCaseNumberAtom
} from "../../atom";
import {
  getProblem,
  getProblemState,
  getProblemStatesChunk,
  getProblemSize,
} from "../../api"; // Import getProblemStatesChunk and getProblemSize
import { useEffect, useState } from "react"; // Import useState
import { pb } from "../../auth/pocketbase"; // Import pb
import BookmarkButton from "../../bookmark/BookmarkButton";
import { trackUmamiEvent } from "../../utils/umami";
import PlayIcon from "../../components/icons/PlayIcon"; // Import a play icon
import { HTTPError } from "ky";
import { AlgolensError, type ProblemState } from "@algolens/core/src"; // Import ProblemState
import { BACKEND_URL } from "astro:env/client";
import PricingPage from "../../../../frontend-premium/src/components/PricingPage";

export default function ProblemView() {
  const [problem, setProblem] = useAtom(problemAtom);
  const [step, setStep] = useAtom(stepAtom); // Added setStep
  const [loading, setLoading] = useAtom(loadingAtom);
  const [maxStep, setMaxStep] = useAtom(maxStepAtom); // Added maxStep and setMaxStep
  const [selectedTestCaseNumber] = useAtom(selectedTestCaseNumberAtom);
  const [problemState, setProblemState] = useAtom(problemStateAtom); // Renamed state to problemState
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stateCache, setStateCache] = useState<Map<number, ProblemState>>(
    new Map()
  );
  const [error, setError] = useState<AlgolensError | null>(null);

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
    const state = stateCache.get(step);
    if (!state) {
      return;
    }
    setProblemState(state);
  }, [step, problem, stateCache]);

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
  }, [problem?.podcastUrl, audio]); // Added audio to dependencies

  async function init() {
    let p = problem;
    if (!problem) {
      setLoading(true);
      const url = new URL(window.location.href);
      const id = url.searchParams.get("id");
      const result = await getProblem(id!);
      if (result instanceof AlgolensError) {
        if (result.code === "NEED_PREMIUM_ACCESS") {
          setError(result);
          setLoading(false);
          return;
        }
        throw result; // Re-throw other errors
      }
      p = result;
      setProblem(p);
      trackUmamiEvent("view-problem", { problemId: id });
    }
    // Clear state cache when loading new states
    setStateCache(new Map());
    // Load states and set maxStep
    const totalSize = await getProblemSize(p!.id!, selectedTestCaseNumber);
    setMaxStep(totalSize); // Set maxStep
    const chunkSize = 10; // Define chunk size
    for (let i = 1; i <= totalSize; i += chunkSize) {
      const startStep = i;
      const endStep = Math.min(i + chunkSize - 1, totalSize);
      const fetchedStates = await getProblemStatesChunk(
        p!.id!,
        selectedTestCaseNumber,
        startStep,
        endStep
      );
      if (fetchedStates instanceof AlgolensError) {
        if (fetchedStates.code === "NEED_PREMIUM_ACCESS") {
          setError(fetchedStates);
          setLoading(false);
          return;
        }
        throw fetchedStates; // Re-throw other errors
      }
      setStateCache((prevCache: Map<number, ProblemState>) => {
        const newCache = new Map(prevCache);
        fetchedStates.forEach((s: ProblemState) => {
          newCache.set(s.number!, s);
        });
        return newCache;
      });
    }
    setLoading(false);
  }
  useEffect(() => {
    init();
  }, [problem, setProblem, selectedTestCaseNumber]); // Added selectedTestCaseNumber to dependencies

  useEffect(() => {
    if (problem && step) {
      trackUmamiEvent("navigate-step", { problemId: problem.id, step: step });
    }
  }, [step, problem]);

  //console.log("ProblemView - problem:", problem);
  //console.log("ProblemView - state:", state);
  // Temporarily remove conditional rendering and pass problem and state directly for debugging
  return (
    <div>
      {error ? (
        <div className="text-center my-12">
          <p className=" text-gray-700 mb-4  max-w-3xl mx-auto font-bold text-2xl">
            You don't have access to this problem.
          </p>
          <p className=" text-gray-700 mb-4  max-w-3xl mx-auto">
            This problem is part of our premium collection, featuring advanced
            algorithms, comprehensive step-by-step visualizations, and in-depth
            explanations to accelerate your learning journey. To access this
            exclusive content and unlock your full potential in algorithmic
            problem-solving, you'll need a premium subscription.
          </p>
          <PricingPage env={{ BACKEND_URL }} />
        </div>
      ) : (
        <>
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
          {loading && (
            <p className="text-center my-4 text-lg">please wait...</p>
          )}
          <ProblemVisualizer state={problemState!} />
        </>
      )}
    </div>
  );
}
