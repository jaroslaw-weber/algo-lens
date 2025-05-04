import React, { useMemo } from "react";
import type { ArrayVariable, Pointer } from "algo-lens-core";
import Tooltip from "./Tooltip"; // Import the Tooltip component

const colors = ["primary", "secondary"];

const DisplayArray = ({ data }: { data: ArrayVariable }) => {
  const { value: array, label: title, pointers } = data;

  console.log("arr", array);

  // Determine if the array is 2D (computed directly)
  const is2D = useMemo(
    () => array.some((item) => Array.isArray(item)),
    [array]
  );

  // Memoized helper to get pointer info (style and label) for a cell
  const getCellPointerInfo = useMemo(() => {
    return (rowIndex: number, colIndex: number) => {
      if (!pointers || pointers.length === 0) {
        console.log("No pointers available");
        return { style: "", pointerLabel: null };
      }

      let rowPointer: Pointer | null = null;
      let colPointer: Pointer | null = null;

      if (is2D) {
        rowPointer =
          pointers.find((p) => p.dimension === "row" && p.value === rowIndex) ??
          null;
        colPointer =
          pointers.find(
            (p) => p.dimension === "column" && p.value === colIndex
          ) ?? null;
      } else {
        colPointer =
          pointers.find(
            (p) => p.dimension === "column" && p.value === colIndex
          ) ?? null;
      }

      console.log("rowPointer:", rowPointer, "colPointer:", colPointer);

      // Determine the primary pointer for styling and labeling
      const primaryPointer = colPointer ?? rowPointer; // Prioritize column pointer

      if (!primaryPointer) {
        return { style: "", pointerLabel: null };
      }

      // Check if the cell is targeted by the primary pointer (or both in 2D)
      const isTargeted = is2D
        ? (rowPointer && colPointer) ||
          (!rowPointer &&
            colPointer &&
            primaryPointer.dimension === "column") ||
          (!colPointer && rowPointer && primaryPointer.dimension === "row")
        : colPointer; // Only colPointer matters for 1D

      if (!isTargeted) {
        return { style: "", pointerLabel: null };
      }

      const pointerIndex = pointers.indexOf(primaryPointer);
      const bgColor = colors[pointerIndex % colors.length];
      const style = `bg-${bgColor} text-${bgColor}-content`;
      const pointerLabel = primaryPointer.label; // Label from the prioritized pointer

      console.log("pointerLabel:", pointerLabel);

      return { style, pointerLabel };
    };
  }, [pointers, is2D]);

  // Calculate number of columns
  const numCols = useMemo(() => {
    if (is2D) {
      // For 2D arrays, find the max length of subarrays
      return Math.max(
        0,
        ...array.map((sub) => (Array.isArray(sub) ? sub.length : 0))
      );
    } else {
      // For 1D arrays, it's just the array length
      return array.length;
    }
  }, [array, is2D]);

  // Render a row for 1D or 2D array
  const renderRow = (items: any[], rowIndex: number) => (
    <tr key={rowIndex} className="flex text-xs relative">
      {items.map((item, colIndex) => {
        const { style, pointerLabel } = getCellPointerInfo(rowIndex, colIndex);
        console.log("the label: ", pointerLabel);
        return (
          <td
            key={colIndex}
            className={`px-2 py-1 flex-1 relative ${style}`} // Ensure 'relative' is here for absolute positioning
          >
            {pointerLabel && <Tooltip label={pointerLabel} />}
            <div className="text-center">
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
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-200 ">
        <tbody>
          {is2D
            ? array.map((subArray, rowIndex) => renderRow(subArray, rowIndex))
            : // Directly render the row for 1D arrays, as renderRow returns a <tr>
              renderRow(array, 0)}
        </tbody>
      </table>
    </div>
  );
};

function formatValue(value: any): any {
  if (value === Infinity) {
    return "∞";
  }
  if (value === true) {
    //checkbox
    return "✓";
  }
  if (value === false) {
    //checkbox
    return "✗";
  }
  return value;
}

export default DisplayArray;
