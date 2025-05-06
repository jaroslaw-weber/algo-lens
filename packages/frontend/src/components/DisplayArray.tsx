import React, { useMemo } from "react";
import type { ArrayVariable, Pointer } from "algo-lens-core";

const colors = ["primary", "secondary"];

const DisplayArray = ({ data }: { data: ArrayVariable }) => {
  const { value: array, label: title, pointers } = data;

  console.log("DisplayArray pointers:", pointers);

  // Determine if the array is 2D
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

      const rowPointer =
        pointers.find((p) => p.dimension === "row" && p.value === rowIndex) ??
        null;
      const colPointer =
        pointers.find(
          (p) => p.dimension === "column" && p.value === colIndex
        ) ?? null;

      console.log("rowPointer:", rowPointer, "colPointer:", colPointer);

      // Determine if the cell is targeted
      const isTargeted = is2D
        ? rowPointer && colPointer // Both pointers must be present in 2D
        : (rowPointer && rowPointer.dimension === "row") ||
          (colPointer && colPointer.dimension === "column");

      if (!isTargeted) {
        return { style: "", pointerLabel: null };
      }

      const primaryPointer = colPointer ?? rowPointer; // Prioritize column pointer
      const pointerIndex = pointers.indexOf(primaryPointer);
      const bgColor = colors[pointerIndex % colors.length];
      const style = `bg-${bgColor} text-${bgColor}-content`;
      const pointerLabel = primaryPointer.label;

      return { style, pointerLabel };
    };
  }, [pointers, is2D]);

  // Calculate number of columns
  const numCols = useMemo(() => {
    if (is2D) {
      return Math.max(
        0,
        ...array.map((sub) => (Array.isArray(sub) ? sub.length : 0))
      );
    } else {
      return array.length;
    }
  }, [array, is2D]);

  // Render a row for 1D or 2D array
  const renderRow = (items: any[], rowIndex: number) => (
    <tr key={rowIndex} className="flex text-xs relative">
      {items.map((item, colIndex) => {
        const { style, pointerLabel } = getCellPointerInfo(rowIndex, colIndex);
        const tooltipStyle = !style?.includes("primary")
          ? "tooltip-top"
          : "tooltip-bottom";
        return (
          <td
            key={colIndex}
            className={`px-2 py-1 flex-1 relative ${style}`} // Ensure 'relative' is here for absolute positioning
          >
            <div
              className={`text-center ${
                pointerLabel
                  ? `tooltip ${tooltipStyle} tooltip-secondary tooltip-open`
                  : ""
              }`}
              data-tip={pointerLabel}
            >
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
    <div className="">
      <table className="w-full table-auto border-collapse border border-gray-200">
        <tbody>
          {is2D
            ? array.map((subArray, rowIndex) => renderRow(subArray, rowIndex))
            : renderRow(array, 0)}
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
    return "✓";
  }
  if (value === false) {
    return "✗";
  }
  return value;
}

export default DisplayArray;
