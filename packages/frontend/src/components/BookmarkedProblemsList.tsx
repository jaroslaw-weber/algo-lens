import React, { useEffect, useState } from 'react';
import { pb } from '../auth/pocketbase'; // Import PocketBase client
import type { ProblemInfo } from '../api'; // Assuming ProblemInfo is defined in api.ts

interface ProblemBookmark {
  problem: string; // problem id
}

interface BookmarkedProblemsListProps {
  allProblems: ProblemInfo[]; // Local problem data
}

const BookmarkedProblemsList: React.FC<BookmarkedProblemsListProps> = ({ allProblems }) => {
  const [bookmarkedProblemIds, setBookmarkedProblemIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const bookmarks = await pb.collection('bookmarks').getFullList<ProblemBookmark>();
        const problemIds = bookmarks.map(bookmark => bookmark.problem);
        setBookmarkedProblemIds(problemIds);
      } catch (err) {
        setError('Failed to fetch bookmarked problem IDs.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const bookmarkedProblems = allProblems.filter(problem => bookmarkedProblemIds.includes(problem.id));

  if (loading) {
    return <div>Loading bookmarked problems...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (bookmarkedProblems.length === 0) {
    return <div>No bookmarked problems yet.</div>;
  }

  return (
    <div>
      <h2>Bookmarked Problems</h2>
      <ul>
        {bookmarkedProblems.map((problem) => (
          <li key={problem.id}>{problem.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkedProblemsList;