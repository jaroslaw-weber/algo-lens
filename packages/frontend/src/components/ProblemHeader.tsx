import React from 'react';
import { pb } from '../auth/pocketbase';
import BookmarkButton from './BookmarkButton';

interface ProblemHeaderProps {
  title: string;
  id: string;
  handleCopyCode: () => void;
}

const ProblemHeader: React.FC<ProblemHeaderProps> = ({ title, id, handleCopyCode }) => {
  return (
    <div className="flex items-center gap-6">
      {/* Adjust the gap as needed */}
      <h2 className="font-display text-3xl pl-2">{title}</h2>
      <a
        href={`https://leetcode.com/problems/${id}/description/`}
        className="link  tooltip tooltip-right"
        data-tip="Go to Leetcode"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i
          className="fas fa-external-link-alt transition-transform duration-300 hover:scale-110"
          aria-hidden="true"
        ></i>
      </a>
      <button
        className="button button-primary tooltip tooltip-right"
        onClick={handleCopyCode}
        data-tip="Copy code"
      >
        <i className="fas fa-copy"></i>
      </button>
      {id && pb.authStore.isValid && ( // Only show button if problem is loaded and user is logged in
        <BookmarkButton
          problemId={id!}
        />
      )}
    </div>
  );
};

export default ProblemHeader;