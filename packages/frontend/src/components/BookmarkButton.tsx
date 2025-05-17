import React, { useState, useEffect } from 'react';
import { addBookmark, removeBookmark, pb } from '../auth/pocketbase';

interface BookmarkButtonProps {
  problemId: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ problemId }) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (pb.authStore.isValid && problemId) {
        try {
          const bookmark = await pb.collection('bookmarks').getFirstListItem(
            `user='${pb.authStore.model?.id}' && problem='${problemId}'`
          ).catch(() => null);
          setIsBookmarked(!!bookmark);
        } catch (error) {
          console.error("Failed to check bookmark status:", error);
          setIsBookmarked(false);
        }
      } else {
        setIsBookmarked(false);
      }
    };

    checkBookmarkStatus();
  }, [problemId, pb.authStore.isValid]);

  const handleToggle = async () => {
    if (!pb.authStore.isValid) {
      alert("Please log in to bookmark problems.");
      return;
    }

    try {
      if (isBookmarked) {
        await removeBookmark(problemId);
        setIsBookmarked(false);
      } else {
        await addBookmark(problemId);
        setIsBookmarked(true);
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