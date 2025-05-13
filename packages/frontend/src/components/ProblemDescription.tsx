import React from 'react';

interface ProblemDescriptionProps {
  description: string | undefined;
}

const StateDescription: React.FC<ProblemDescriptionProps> = ({ description }) => {
  if (!description) {
    return null;
  }

  return (
    <div className="mb-4 mt-4 p-4 border border-dashed border-gray-400 rounded-lg bg-gray-50 w-full text-center">
      <p className="text-lg font-semibold text-gray-700">
        {description}
      </p>
    </div>
  );
};

export default StateDescription;