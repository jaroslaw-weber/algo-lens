import React from 'react';
import { addBookmark, removeBookmark, pb } from '../auth/pocketbase';

interface BookmarkButtonProps {
  problemId: string;
  isBookmarked: boolean; // Receive isBookmarked as a prop
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ problemId, isBookmarked }) => {

  const handleToggle = async () => {
    if (!pb.authStore.isValid) {
      alert("Please log in to bookmark problems.");
      return;
    }

    try {
      if (isBookmarked) {
        await removeBookmark(problemId);
        // Note: The parent component (ProblemList) will re-fetch problems
        // and update the isBookmarked prop, triggering a re-render.
      } else {
        await addBookmark(problemId);
        // Note: The parent component (ProblemList) will re-fetch problems
        // and update the isBookmarked prop, triggering a re-render.
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <button
      className="button button-primary hover:opacity-80 tooltip tooltip-top"
      onClick={handleToggle}
        data-tip="Toggle Bookmark"
    >
      {isBookmarked ? (
        <i className="fas fa-star text-yellow-500"></i> // Filled star
      ) : (
        <i className="far fa-star"></i> // Outline star
      )}
    </button>
  );
};

export default BookmarkButton;