import React, { useMemo } from "react";
import type { ArrayVariable, Pointer } from "algo-lens-core";

const colors = ["primary", "secondary"];

const DisplayArray = ({ data }: { data: ArrayVariable }) => {
  const { value: array, label: title, pointers } = data;

  console.log("arr", array);

  // Determine if the array is 2D (computed directly)
  const is2D = useMemo(
    () => array.some((item) => Array.isArray(item)),
    [array]
  );

  // Memoize style calculation for cells
  const getCellStyle = useMemo(() => {
    return (rowIndex, colIndex) => {
      if (!pointers) return "";

      let rowPointer = null,
        colPointer = null;
      if (is2D) {
        rowPointer = pointers.find(
          (pointer) => pointer.dimension === "row" && rowIndex === pointer.value
        );
        colPointer = pointers.find(
          (pointer) =>
            pointer.dimension === "column" && colIndex === pointer.value
        );
      } else {
        colPointer = pointers.find(
          (pointer) =>
            pointer.dimension === "column" && colIndex === pointer.value
        );
      }

      const bgColor =
        colors[pointers.indexOf(rowPointer ?? colPointer) % colors.length];

      if (is2D && rowPointer && colPointer) {
        return `bg-${bgColor} text-${bgColor}-content`;
      } else if (!is2D && colPointer) {
        return `bg-${bgColor} text-${bgColor}-content`;
      }
      return "";
    };
  }, [pointers, is2D]);

  // Calculate number of columns
  const numCols = useMemo(() => {
    if (is2D) {
      // For 2D arrays, find the max length of subarrays
      return Math.max(0, ...array.map(sub => Array.isArray(sub) ? sub.length : 0));
    } else {
      // For 1D arrays, it's just the array length
      return array.length;
    }
  }, [array, is2D]);

  // Render a row for 1D or 2D array
  const renderRow = (items: any[], rowIndex: number) => (
    <tr key={rowIndex} className="flex text-xs">
      {items.map((item, colIndex) => (
        <td
          key={colIndex}
          className={`px-2 py-1 flex-1 ${getCellStyle(rowIndex, colIndex)}`}
        >
          {typeof item === "object" ? JSON.stringify(item) : formatValue(item)}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-200 ">
        <thead>
          <tr className="flex text-xs"> {/* Apply flex to header row like data rows */}
            {/* Generate header cells with column indices */}
            {Array.from({ length: numCols }, (_, i) => (
              <th key={i} className="px-2 py-1 text-center font-semibold flex-1"> {/* Added flex-1 for alignment */}
                {i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {is2D ? (
            array.map((subArray, rowIndex) => renderRow(subArray, rowIndex))
          ) : (
            // Directly render the row for 1D arrays, as renderRow returns a <tr>
            renderRow(array, 0)
          )}
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
