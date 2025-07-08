import { useState, useEffect } from "react";
import { getProblemList, type ProblemInfo } from "../api"; // Import ProblemInfo
import { pb } from "../auth/pocketbase"; // Import pb
import _ from "lodash";
import BookmarkButton from "../bookmark/BookmarkButton";
import { trackUmamiEvent } from "../utils/umami";

function ProblemsList() {
  //
  const url = new URL(window.location.href);
  let tag = url.searchParams.get("tag");
  if (tag == "blind75") {
    tag = null;
  }
  const filter = url.searchParams.get("filter");
  const plan = url.searchParams.get("plan");
  const title = _.capitalize(tag || filter || "problems");

  // Use local state instead of Jotai atom
  const [problems, setProblems] = useState<ProblemInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        setError(null);
        const ps = await getProblemList(tag!, filter!, plan!); // Pass tag and filter to API call
        setProblems(ps);
      } catch (err) {
        console.error("Failed to fetch problems:", err);
        setError("Failed to load problems. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [tag, filter]); // Re-run effect if tag or showBookmarkedOnly changes

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
              const { id, title, emoji, tags } = p;

              return (
                <a
                  key={id}
                  href={`/problem/visualize?id=${id}`}
                  className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-300 text-primary block" // Added subtle hover shadow
                  onClick={() =>
                    trackUmamiEvent("click-problem-list-item", {
                      problemId: id,
                      title: title,
                    })
                  }
                >
                  <div className="card-body flex items-center">
                    {" "}
                    {/* Adjusted card-body for better layout */}
                    {emoji && <div className="text-4xl mr-4">{emoji}</div>}{" "}
                    {/* Increased emoji size and added margin */}
                    <div className="flex-grow">
                      {" "}
                      {/* Container for title, takes available space */}
                      <p className="">{title}</p>{" "}
                      {/* Adjusted title size and weight */}
                      {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="badge badge-outline badge-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Bookmark button */}
                    {pb.authStore.isValid && ( // Only show button if user is logged in
                      <BookmarkButton
                        problemId={id}
                        isBookmarked={p.bookmark!} // Pass the isBookmarked flag
                      />
                    )}
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
