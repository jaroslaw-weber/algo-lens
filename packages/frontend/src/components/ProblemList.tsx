import { useAtom, useSetAtom } from "jotai"; // Import useSetAtom
import { problemsAtom, errorAtom } from "../atom"; // Import errorAtom
import { useEffect, useState } from "react";
import { getProblemList } from "../api";

function ProblemsList() {
  const [problems, setProblems] = useAtom(problemsAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const setErrorAtom = useSetAtom(errorAtom); // Get global error setter

  async function init() {
    setLoading(true); // Set loading true at the start
    setErrorAtom(null); // Reset global error before fetching
    console.log("init problem list");
    try {
      const ps = await getProblemList();
      console.log("init problem list done", ps);
      setProblems(ps);
    } catch (err) {
      console.error("Failed to fetch problems:", err); // Log the actual error
      setErrorAtom("Failed to load problems list. Please try again later."); // Set global error
    } finally {
      setLoading(false); // Set loading false when done (success or error)
    }
  }

  useEffect(() => {
    init();
    // Clear error on unmount
    return () => setErrorAtom(null);
  }, [setErrorAtom]); // Add setErrorAtom to dependency array

  // Display loading state
  if (loading) {
    return <div className="text-center p-6">Loading problems...</div>;
  }

  // Error display is now handled by the global ErrorPopup component

  // Display problem list when loaded
  return (
       <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Algorithm Visualization Tool</h1>
      <p className="mb-8 text-lg text-center text-gray-600">
        Explore and visualize algorithms step by step.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4  ">
        {problems.map((p) => {
          // Destructure emoji along with id and title
          const { id, title, emoji } = p; 

          return (
            <div
              key={id}
              className="flex items-center gap-2 p-3 bg-primary rounded-md transition-colors"
            >
              {/* Display emoji if it exists */}
              {emoji && <span className="text-lg mr-2">{emoji}</span>} 
              <a
                href={`/problem/visualize?id=${id}`}
                className="text-lg font-semibold text-primary-content hover:underline"
              >
                {title}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProblemsList;