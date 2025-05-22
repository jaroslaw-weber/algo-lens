import React from "react";
import type { BinaryVariable, Pointer } from "algo-lens-core";

// Define a color scheme for pointers
const colors = ["bg-primary", "bg-secondary", "bg-info"];

const DisplayBinary = ({ data }: { data: BinaryVariable }) => {
  const { value, label: title, pointers } = data;

  // Convert the number to a binary string and split into an array of characters
  const binaryArray = value.toString(2).split("");

  // Memoize style calculation for cells
  const getCellStyle = React.useMemo(() => {
    return (colIndex: number) => {
      if (!pointers) return "";

      const pointer = pointers.find(
        (pointer) =>
          pointer.dimension === "column" && colIndex === pointer.value
      );

      if (pointer) {
        const color = pointer.color
        if(color){
          return `bg-${color}`
        }
        return `bg-primary`
      }
      return "";
    };
  }, [pointers]);

  // Render a row for the binary array
  const renderRow = (items: string[]) => (
    <tr className=" text-xs items-center">
      {items.map((item, colIndex) => (
        <td
          key={colIndex}
          className={`px-2 py-1 flex-1 ${getCellStyle(colIndex)}`}
        >
          {item}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="overflow-x-auto">
      {title && (
        <h3 className="pl-2 pb-2 text-xl text-center font-semibold">{title}</h3>
      )}
      <div className="flex">
        <div className="w-1/2 pr-2">
          <div className="flex items-center justify-end pb-2">
            <span className="text-xs font-semibold">2 base (binary)</span>
          </div>
          <table className="ml-auto table-auto border-collapse border border-gray-200">
            <tbody>{renderRow(binaryArray)}</tbody>
          </table>
        </div>
        <div className="w-1/2 pl-2">
          <div className="flex items-center  pb-2">
            <span className="text-xs font-semibold">base 10</span>
          </div>
          <div className="flex items-center justify-left  ">
            <span className="text-base font-semibold">{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBinary;
