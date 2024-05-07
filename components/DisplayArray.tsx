import React, { useMemo } from "react";
import { ArrayVariable } from "../src/problem/Problem";

const DisplayArray = ({ data }: { data: ArrayVariable }) => {
  const { value: array, label: title, pointers } = data;

  // Define a color scheme for pointers
  const colors = ["bg-primary", "bg-secondary", "bg-secondary"];

  // Memoize style calculation for cells
  const getCellStyle = useMemo(() => {
    return (rowIndex, colIndex) => {
      if (!pointers) return "";
      const foundPointer = pointers.find(pointer => {
        return (pointer.dimension === "row" && rowIndex === pointer.value) ||
               (pointer.dimension === "column" && colIndex === pointer.value);
      });
      return foundPointer ? colors[pointers.indexOf(foundPointer) % colors.length]+" text-white " : "";
    };
  }, [pointers, colors]);

  // Function to determine if the array is 2D
  const is2D = useMemo(() => Array.isArray(array[0]), [array]);

  // Render a row
  const renderRow = (items, rowIndex) => (
    <tr key={rowIndex}>
      {items.map((item, colIndex) => (
        <td key={colIndex}
            className={` px-2 join-item ${getCellStyle(rowIndex, colIndex)}`}>
          {JSON.stringify(item)}
        </td>
      ))}
    </tr>
  );

  return (
    <div>
      {title && <p className="pl-1 pb-2 text-xl">{title}</p>}
      <table className="w-full table-auto border join">
        {is2D ? array.map((subArray, rowIndex) => renderRow(subArray, rowIndex))
              : renderRow(array, 0)}
      </table>
    </div>
  );
};

export default DisplayArray;
