import React from 'react';
import { addBookmark, removeBookmark, pb } from '../auth/pocketbase';

interface BookmarkButtonProps {
  problemId: string;
  isBookmarked: boolean;
  onBookmarkToggle: (problemId: string, isBookmarked: boolean) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ problemId, isBookmarked, onBookmarkToggle }) => {
  const handleToggle = async () => {
    if (!pb.authStore.isValid) {
      alert("Please log in to bookmark problems.");
      return;
    }
    onBookmarkToggle(problemId, isBookmarked);
  };

  return (
    <button className="btn btn-ghost btn-circle" onClick={handleToggle}>
      {isBookmarked ? (
        <i className="fas fa-star text-yellow-500"></i> // Filled star
      ) : (
        <i className="far fa-star"></i> // Outline star
      )}
    </button>
  );
};

export default BookmarkButton;