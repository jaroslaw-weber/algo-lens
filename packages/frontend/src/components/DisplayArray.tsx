import React, { useMemo } from "react";
import type { ArrayVariable, Pointer, Pointer2D } from "algo-lens-core/src/types";


const colors = ["primary", "secondary"];

const DisplayArray = ({ data }: { data: ArrayVariable }) => {
  const { value: array, label: title, pointers } = data;

  ////
  ////

  // Determine if the array is 2D
  const is2D = array.some((item) => Array.isArray(item));

  // Helper to get pointer info (style and label) for a cell
  const getCellPointerInfo = (rowIndex: number, colIndex: number) => {
    //console.log("pointers", pointers);
    //console.log("rowindex:", rowIndex, "colIndex", colIndex)
    if (is2D) {
      const pointer = pointers?.find(
        (x) => (x as Pointer2D).c == colIndex && (x as Pointer2D).r == rowIndex
      );
      return pointer;
    } else {
      const pointer = pointers?.find((x) => (x as Pointer).value == colIndex);
      return pointer;
    }
  };

  // Calculate number of columns
  const numCols = is2D
    ? Math.max(0, ...array.map((sub) => (Array.isArray(sub) ? sub.length : 0)))
    : array.length;

  // Render a row for 1D or 2D array
  const renderRow = (items: any[], rowIndex: number) => (
    <tr key={rowIndex} className="flex text-xs relative">
      {items.map((item, colIndex) => {
        const pointer = getCellPointerInfo(rowIndex, colIndex);
        //console.log("pointer", pointer);

        const tooltipData = pointer?.label;

        const color = pointer?.color;
        let style = "";
        if (color) {
          style = `bg-${color}`;
        } else {
          if (tooltipData) {
            style = `bg-primary`;
          }
        }

        const tootlipDirection = pointer?.dir;

        const tooltipStyles = [];

        tooltipStyles.push("tooltip-open");
        if (tootlipDirection) {
          tooltipStyles.push("tooltip-" + tootlipDirection);
        }

        return (
          <td
            key={colIndex}
            className={`px-2 py-1 flex-1 relative ${style}`} // Ensure 'relative' is here for absolute positioning
          >
            <div
              className={`text-center ${
                tooltipData
                  ? `tooltip ${tooltipStyles.join(" ")} tooltip-secondary `
                  : ""
              }`}
              data-tip={tooltipData}
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
