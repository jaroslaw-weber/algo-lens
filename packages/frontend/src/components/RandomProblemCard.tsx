import React, { useState, useEffect } from "react";
import { getRandomProblem, type ProblemInfo } from "../api";
import ProblemView from "../pages/problem/ProblemView";
import { useAtom } from "jotai";
import { problemAtom } from "../atom";

const RandomProblemCard: React.FC = () => {
  const [problem, setProblem] = useAtom(problemAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomProblem = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRandomProblem();
        setProblem(data);
      } catch (err) {
        console.error("Failed to fetch random problem:", err);
        setError("Failed to load a random problem. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProblem();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Random Problem</h2>
          <p>Loading...</p>
          <span className="loading loading-dots loading-md"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Random Problem</h2>
          <div className="text-error">{error}</div>
        </div>
      </div>
    );
  }

  if (!problem) {
    // Should not happen if loading is false and no error, but good practice
    return null;
  }

  // Determine badge color based on difficulty
  let badgeColor = "badge-info"; // Default
  if (problem.difficulty?.toLowerCase() === "easy")
    badgeColor = "badge-success";
  if (problem.difficulty?.toLowerCase() === "medium")
    badgeColor = "badge-warning";
  if (problem.difficulty?.toLowerCase() === "hard") badgeColor = "badge-error";

  return <ProblemView />;
};

export default RandomProblemCard;
