import React, { useMemo } from "react";
import { ArrayVariable, Pointer } from "../src/problem/types";

const DisplayArray = ({ data }: { data: ArrayVariable }) => {
  const { value: array, label: title, pointers } = data;

  // Define a color scheme for pointers
  const colors = ["bg-primary", "bg-secondary", "bg-info"];

  // Memoize style calculation for cells
  const getCellStyle = useMemo(() => {
    return (rowIndex, colIndex) => {
      if (!pointers) return "";
      const foundPointer = pointers.find((pointer: Pointer) => {
        return (pointer.dimension === "row" && rowIndex === pointer.value) ||
               (pointer.dimension === "column" && colIndex === pointer.value);
      });
      return foundPointer ? `${colors[pointers.indexOf(foundPointer) % colors.length]} text-white` : "";
    };
  }, [pointers, colors]);

  // Function to determine if the array is 2D
  const is2D = useMemo(() => array.some(item => Array.isArray(item)), [array]);

  // Render a row for 1D or 2D array
  const renderRow = (items: any[], rowIndex: number) => (
    <tr key={rowIndex}>
      {items.map((item, colIndex) => (
        <td key={colIndex} className={`px-2 py-1 ${getCellStyle(rowIndex, colIndex)}`}>
          {typeof item === 'object' ? JSON.stringify(item) : item}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="overflow-x-auto">
      {title && <h3 className="pl-2 pb-2 text-xl font-semibold">{title}</h3>}
      <table className="w-full table-auto border-collapse border border-gray-200">
        <tbody>
          {is2D ? array.map((subArray, rowIndex) => renderRow(subArray, rowIndex))
                : <tr>{renderRow(array, 0)}</tr>}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayArray;
