import React from 'react';
import { useAtom } from 'jotai';
import { errorAtom } from '../atom';

const ErrorPopup: React.FC = () => {
  const [error, setError] = useAtom(errorAtom);

  // If there's no error, render nothing
  if (!error) {
    return null;
  }

  const handleClose = () => {
    setError(null); // Clear the error when the close button is clicked
  };

  return (
    <div
      className="fixed top-5 right-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md z-50 flex items-center"
      role="alert" // Add role for accessibility
    >
      <span className="block sm:inline">{error}</span> {/* Ensure error message wraps well */}
      <button
        onClick={handleClose}
        className="ml-4 text-red-700 hover:text-red-900 font-bold"
        aria-label="Close error message"
      >
        &times; {/* HTML entity for 'X' */}
      </button>
    </div>
  );
};

export default ErrorPopup;
