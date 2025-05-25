import React from "react";
import { pb } from "../auth/pocketbase";
import BookmarkButton from "../bookmark/BookmarkButton";
import type { Problem } from "algo-lens-core";

interface ProblemHeaderProps {
  title: string;
  id: string;
  handleCopyCode: () => void;
  problem: Problem<any, any>;
  onClose: () => void; // Add onClose prop
}

const ProblemHeader: React.FC<ProblemHeaderProps> = ({
  title,
  id,
  problem,
  handleCopyCode,
  onClose, // Destructure onClose
}) => {
  return (
    <div className="flex items-center gap-6">
      {/* Adjust the gap as needed */}
      <h2 className="font-display text-3xl pl-2">{title}</h2>
      <a
        href={`https://leetcode.com/problems/${id}/description/`}
        className="button button-primary hover:opacity-80 tooltip tooltip-top"
        data-tip="Go to Leetcode"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fas fa-external-link-alt" aria-hidden="true"></i>
      </a>
      <button
        className="button button-primary hover:opacity-80 tooltip tooltip-top"
        onClick={handleCopyCode}
        data-tip="Copy code"
      >
        <i className="fas fa-copy"></i>
      </button>
      {id &&
        pb.authStore.isValid && ( // Only show button if problem is loaded and user is logged in
          <BookmarkButton
            problemId={id!}
            isBookmarked={problem?.bookmark ?? false}
          />
        )}
      <button
        className="button button-primary hover:opacity-80 tooltip tooltip-top"
        onClick={onClose} // Add onClose handler
        data-tip="Close"
      >
        <i className="fas fa-times"></i> {/* Close icon */}
      </button>
    </div>
  );
};

export default ProblemHeader;
