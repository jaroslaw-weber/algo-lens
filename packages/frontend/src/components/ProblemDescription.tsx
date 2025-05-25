import React, { useState } from "react";

interface ProblemDescriptionProps {
  description: string | undefined;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  description,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  if (!description) {
    return null;
  }

  return (
    <div className="mb-4 mt-4 w-full">
      {!isHidden && (
        <div className="relative pt-8 p-4 border border-dashed border-gray-400 rounded-lg bg-gray-50 w-full text-center min-h-24 mt-2">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-50 px-2 text-gray-500 text-sm font-semibold">
            💡 what is going on
          </div>
          <button
            onClick={() => setIsHidden(true)}
            className="absolute top-2 right-4 text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            &#x2715;
          </button>
          <p className="text-sm font-semibold text-gray-700 px-4">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProblemDescription;
