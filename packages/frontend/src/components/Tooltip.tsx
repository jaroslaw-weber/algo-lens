import React from "react";

interface TooltipProps {
  label: string;
}

const Tooltip: React.FC<TooltipProps> = ({ label }) => {
  return (
    <span className="tooltip tooltip-open tooltip-top" data-tip={label}>
      <span className="absolute top-0 left-0 text-xs font-bold opacity-75 px-1">
        bb {label}
      </span>
    </span>
  );
};

export default Tooltip;
