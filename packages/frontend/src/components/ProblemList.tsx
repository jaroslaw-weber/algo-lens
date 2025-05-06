import { useAtom } from "jotai";
import { problemsAtom } from "../atom";
import { useEffect } from "react";
import { getProblemList } from "../api";

function ProblemsList() {
  console.log("ProblemsList rendering"); // Log component rendering
  const [problems, setProblems] = useAtom(problemsAtom);

  async function init() {
    console.log("init problem list");
    const ps = await getProblemList();
    console.log("Fetched problems data:", ps); // Log fetched data
    console.log("Setting problems state with fetched data"); // Log before setting state
    setProblems(ps);
    console.log("Problems state update initiated"); // Log after setting state
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Algorithm Visualization Tool
      </h1>
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
