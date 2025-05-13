import React, { useState, useEffect } from "react";
import { getProblemList, type ProblemInfo } from "../api"; // Import ProblemInfo
import type { Problem } from "algo-lens-core";

// Define props interface
interface ProblemListProps {
  tag?: string;
  title?: string;
}

function ProblemsList({ tag, title }: ProblemListProps) {
  // console.log(`ProblemsList rendering for tag: ${tag}, title: ${title}`); // Log component rendering with props

  // Use local state instead of Jotai atom
  const [problems, setProblems] = useState<ProblemInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        // console.log(`Fetching problems with tag: ${tag}`);
        setLoading(true);
        setError(null);
        const ps = await getProblemList(tag); // Pass tag to API call
        // console.log("Fetched problems data:", ps); // Log fetched data
        setProblems(ps);
      } catch (err) {
        console.error("Failed to fetch problems:", err);
        setError("Failed to load problems. Please try refreshing.");
      } finally {
        setLoading(false);
        // console.log("Finished fetching problems.");
      }
    };

    fetchProblems();
  }, [tag]); // Re-run effect if tag changes

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        {title || "Problems"}
      </h1>

      {loading && (
        <div className="text-center p-10">
          <span className="loading loading-lg loading-spinner text-primary"></span>
          <p>Loading problems...</p>
        </div>
      )}

      {error && (
        <div className="text-center p-10 text-error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {problems.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No problems found for this category.
            </p>
          ) : (
            problems.map((p) => {
              const { id, title, emoji } = p;

              return (
                <a
                  key={id}
                  href={`/problem/visualize?id=${id}`}
                  className="card border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 block" // Updated classes for outline style
                >
                  <div className="card-body">
                    <h2 className="card-title">
                      {emoji && <span className="mr-2">{emoji}</span>}
                      {title}
                    </h2>
                  </div>
                </a>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default ProblemsList;
