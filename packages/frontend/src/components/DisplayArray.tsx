import React, { useMemo, useRef, useEffect } from "react";
import type { ArrayVariable, Pointer, Pointer2D } from "algo-lens-core/src/types";
import { motion } from "framer-motion";


const colors = ["primary", "secondary"];

const DisplayArray = ({ data }: { data: ArrayVariable }) => {
  const { value: array, label: title, pointers } = data;
  const pointerPositionsRef = useRef<Map<string, { r: number; c: number }>>(new Map());
  const prevPointerPositionsRef = useRef<Map<string, { r: number; c: number }>>(new Map());

  useEffect(() => {
    prevPointerPositionsRef.current = new Map(pointerPositionsRef.current); // Store old positions
    const newPointerPositions = new Map<string, { r: number; c: number }>();
    pointers?.forEach(p => {
      if (p.id) {
        if ('r' in p && 'c' in p) { // Pointer2D
          newPointerPositions.set(p.id, { r: p.r, c: p.c });
        } else if ('value' in p) { // Pointer
          newPointerPositions.set(p.id, { r: 0, c: p.value });
        }
      }
    });
    pointerPositionsRef.current = newPointerPositions;
  }, [pointers]);

  // Determine if the array is 2D
  const is2D = array.some((item) => Array.isArray(item));

  // Calculate number of columns
  const numCols = is2D
    ? Math.max(0, ...array.map((sub) => (Array.isArray(sub) ? sub.length : 0)))
    : array.length;

  // Render a row for 1D or 2D array
  const renderRow = (items: any[], rowIndex: number) => (
    <tr key={rowIndex} className="flex text-xs relative">
      {items.map((item, colIndex) => {
        return (
          <td
            key={colIndex}
            className={`px-2 py-1 flex-1 relative border border-gray-300`} // Ensure 'relative' is here for absolute positioning
            // Each cell needs an ID for framer-motion to target for layout animation
            id={`cell-${rowIndex}-${colIndex}`}
          >
            <div className={`text-center`}>
              {typeof item === "object"
                ? JSON.stringify(item)
                : formatValue(item)}
            </div>
          </td>
        );
      })}
    </tr>
  );

  return (
    <div className="relative"> {/* Container needs to be relative for absolute positioning of pointers */}
      <table className="w-full table-auto border-collapse border border-gray-200">
        <tbody>
          {array.length === 0 ? (
            <tr>
              <td
                colSpan={numCols > 0 ? numCols : 1}
                className="text-center text-gray-500 py-1 text-xs"
              >
                Empty Array
              </td>
            </tr>
          ) : is2D ? (
            array.map((subArray, rowIndex) => renderRow(subArray, rowIndex))
          ) : (
            renderRow(array, 0)
          )}
        </tbody>
      </table>
      {/* Render pointers absolutely positioned over the table */}
      {pointers?.map((pointer) => {
        if (!pointer.id) return null; // Skip pointers without ID

        const currentPos = pointerPositionsRef.current.get(pointer.id);
        if (!currentPos) return null;


        const cellElement = document.getElementById(`cell-${currentPos.r}-${currentPos.c}`);
        if (!cellElement) return null;

        const tooltipData = pointer?.label;
        const color = pointer?.color || (tooltipData ? "primary" : "");
        const tootlipDirection = pointer?.dir;
        const tooltipStyles = ["tooltip-open"];
        if (tootlipDirection) {
          tooltipStyles.push("tooltip-" + tootlipDirection);
        }

        return (
          <motion.div
            key={pointer.id}
            layoutId={pointer.id} // Enables layout animation
            initial={false} // We handle initial position via useEffect or direct calculation
            animate={{
              top: cellElement.offsetTop,
              left: cellElement.offsetLeft,
              width: cellElement.offsetWidth,
              height: cellElement.offsetHeight,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute px-2 py-1 ${color ? `bg-${color}` : ""} ${
              tooltipData ? `tooltip ${tooltipStyles.join(" ")} tooltip-secondary` : ""
            }`}
            style={{
              // Ensure pointer is visible above cells if needed, though layout animation handles positioning
              pointerEvents: "none", // Allows clicks to pass through to table cells if necessary
            }}
            data-tip={tooltipData}
          >
            {/* Optionally, render pointer label or icon inside the motion.div */}
          </motion.div>
        );
      })}
    </div>
  );
};

function formatValue(value: any): any {
  if (value === "INFINITY") {
    return "∞";
  }
  if (value === true) {
    return "✓";
  }
  if (value === false) {
    return "✗";
  }
  return value;
}

export default DisplayArray;
