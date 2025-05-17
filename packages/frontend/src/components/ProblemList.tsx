import React, { useState, useEffect } from "react";
import { getProblemList, type ProblemInfo } from "../api"; // Import ProblemInfo
import type { Problem } from "algo-lens-core";
import { addBookmark, removeBookmark, pb } from "../auth/pocketbase"; // Import bookmark functions and pb
import { useAtom } from "jotai"; // Import useAtom
import _ from "lodash";
import BookmarkButton from './BookmarkButton';


function ProblemsList() {
  // 
  const url = new URL(window.location.href)
  let tag = url.searchParams.get("tag")
  if(tag == "blind75"){
  tag = null
  }
  const filter = url.searchParams.get("filter")
  const showBookmarkedOnly = filter == "bookmark"
  const title = _.capitalize(tag || filter || "problems")

  console.log("show bookmarked?", showBookmarkedOnly)
  // Use local state instead of Jotai atom
  const [problems, setProblems] = useState<ProblemInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarkedProblems, setBookmarkedProblems] = useState<string[]>([]); // State for bookmarked problem IDs

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        // 
        setLoading(true);
        setError(null);
        const ps = await getProblemList(tag!); // Pass tag to API call
        // 
        setProblems(ps);
      } catch (err) {
        console.error("Failed to fetch problems:", err);
        setError("Failed to load problems. Please try refreshing.");
      } finally {
        setLoading(false);
        // 
      }
    };

    fetchProblems();
  }, [tag]); // Re-run effect if tag changes

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (pb.authStore.isValid) {
        try {
          const bookmarks = await pb.collection('bookmarks').getFullList({
            filter: `user='${pb.authStore.model?.id}'`,
            fields: 'problem', // Fetch only the problem ID
          });
          setBookmarkedProblems(bookmarks.map(b => b.problem));
        } catch (error) {
          console.error("Failed to fetch bookmarks:", error);
        }
      } else {
        setBookmarkedProblems([]); // Clear bookmarks if user is not logged in
      }
    };

    fetchBookmarks();
  }, [pb.authStore.isValid]); // Re-run effect if auth state changes

  const handleBookmarkToggle = async (problemId: string, isBookmarked: boolean) => {
    try {
      if (isBookmarked) {
        await removeBookmark(problemId);
        setBookmarkedProblems(bookmarkedProblems.filter(id => id !== problemId));
      } else {
        await addBookmark(problemId);
        setBookmarkedProblems([...bookmarkedProblems, problemId]);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      // Optionally show an error message to the user
    }
  };

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
            problems
              .filter(p => showBookmarkedOnly ? bookmarkedProblems.includes(String(p.id)) : true) // Apply filter
              .map((p) => {
                const { id, title, emoji } = p;

              return (
                <a
                  key={id}
                  href={`/problem/visualize?id=${id}`}
                  className="card border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 block" // Updated classes for outline style
                >
                  <div className="card-body flex-row justify-between items-center">
                    <h2 className="card-title">
                      {emoji && <span className="mr-2">{emoji}</span>}
                      {title}
                    </h2>
                    
                    {/* Bookmark button */}
                    {pb.authStore.isValid && ( // Only show button if user is logged in
                      <BookmarkButton
                        problemId={id}
                        isBookmarked={bookmarkedProblems.includes(id)}
                        onBookmarkToggle={handleBookmarkToggle}
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
