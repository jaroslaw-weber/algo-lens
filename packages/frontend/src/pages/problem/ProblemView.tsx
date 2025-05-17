import { useAtom } from "jotai";
import ProblemVisualizer from "../../components/ProblemVisualizer";
import { maxStepAtom, problemAtom, problemStateAtom, stepAtom } from "../../atom";
import { getProblem, getProblemState } from "../../api";
import { useEffect, useState } from "react"; // Import useState
import { addBookmark, removeBookmark, pb } from "../../auth/pocketbase"; // Import bookmark functions and pb
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
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false); // State for bookmark status

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
  }
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (pb.authStore.isValid && problem) {
        try {
          const bookmark = await pb.collection('bookmarks').getFirstListItem(
            `user='${pb.authStore.model?.id}' && problem='${problem.id}'`
          ).catch(() => null); // Use catch to handle no record found
          setIsBookmarked(!!bookmark);
        } catch (error) {
          console.error("Failed to check bookmark status:", error);
          setIsBookmarked(false); // Assume not bookmarked on error
        }
      } else {
        setIsBookmarked(false); // Not bookmarked if user is not logged in
      }
    };

    checkBookmarkStatus();
  }, [problem, pb.authStore.isValid]); // Re-run effect if problem or auth state changes

  const handleBookmarkToggle = async () => {
    if (!pb.authStore.isValid || !problem) {
      alert("Please log in to bookmark problems.");
      return;
    }

    try {
      if (isBookmarked) {
        await removeBookmark(problem.id!);
        setIsBookmarked(false);
      } else {
        await addBookmark(problem.id!);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div>
     
      {/* Bookmark button */}
      {problem && pb.authStore.isValid && ( // Only show button if problem is loaded and user is logged in
        <button className="btn btn-ghost btn-circle" onClick={handleBookmarkToggle}>
          {isBookmarked ? (
            <i className="fas fa-star text-yellow-500"></i> // Filled star
          ) : (
            <i className="far fa-star"></i> // Outline star
          )}
        </button>
      )}
      {problem && state && <ProblemVisualizer />}
    </div>
  );
}
