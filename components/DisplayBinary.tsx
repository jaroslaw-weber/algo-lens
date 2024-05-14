import React from "react";
import { BinaryVariable, Pointer } from "../src/problem/types";

const DisplayBinary = ({ data }: { data: BinaryVariable }) => {
  const { value, label: title, pointers } = data;

  // Convert the number to a binary string and split into an array of characters
  const binaryArray = value.toString(2).split("");

  // Define a color scheme for pointers
  const colors = ["bg-primary", "bg-secondary", "bg-info"];

  // Memoize style calculation for cells
  const getCellStyle = React.useMemo(() => {
    return (colIndex) => {
      if (!pointers) return "";

      const pointer = pointers.find((pointer) => pointer.dimension === "column" && colIndex === pointer.value);

      if (pointer) {
        return `${colors[pointers.indexOf(pointer) % colors.length]} text-white`;
      }
      return "";
    };
  }, [pointers, colors]);

  // Render a row for the binary array
  const renderRow = (items: string[]) => (
    <tr className=" text-xs items-center">
      {items.map((item, colIndex) => (
        <td key={colIndex} className={`px-2 py-1 flex-1 ${getCellStyle(colIndex)}`}>{item}</td>
      ))}
    </tr>
  );

  return (
    <div className="overflow-x-auto">
      {title && <h3 className="pl-2 pb-2 text-xl font-semibold">{title}</h3>}
      <table className="table-auto border-collapse border border-gray-200">
        <tbody>
          {renderRow(binaryArray)}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayBinary;