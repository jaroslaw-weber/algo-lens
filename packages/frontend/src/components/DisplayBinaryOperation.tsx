import React from "react";
import type { BinaryOperationVariable, BinaryPointer, ThemeColor } from "algo-lens-core/src/types";


const getBitColorClass = (pointers: BinaryPointer[] | undefined, index: number, totalBits: number): string => {
  if (!pointers) return "";
  const pointer = pointers.find(p => {
    if (p.direction === "right") {
      return p.index === index;
    } else { // direction === "left"
      return p.index === totalBits - 1 - index;
    }
  });
  if (pointer) {
    return `bg-${pointer.color}`;
  }
  return "";
};

const renderBinaryRow = (value: number, pointers: BinaryPointer[] | undefined, label?: string) => {
  const binaryString = value.toString(2);
  const bits = binaryString.split("").reverse(); // Reverse to easily work with 0-based index from the right

  // Pad with leading zeros to a fixed length (e.g., 8 bits for simplicity, can be adjusted)
  const paddedBits = Array(8).fill('0').map((bit, index) => bits[index] || bit).reverse(); // Pad and reverse back
  const totalBits = paddedBits.length;

  console.log("Value:", value);
  console.log("Binary String:", binaryString);
  console.log("Bits:", bits);
  console.log("Padded Bits:", paddedBits);

  console.log("Value:", value);
  console.log("Binary String:", binaryString);
  console.log("Bits:", bits);
  console.log("Padded Bits:", paddedBits);

  return (
    <tr>
      {label && <td className="px-2 py-1 font-semibold text-xs border border-gray-200">{label}</td>}
      {paddedBits.map((bit, index) => {
        const colorClass = getBitColorClass(pointers, index, totalBits);
        return (
          <td
            key={index}
            className={`px-2 py-1 flex-1 text-center border border-gray-200 ${colorClass}`}
          >
            {bit}
          </td>
        );
      })}
    </tr>
  );
};

const DisplayBinaryOperation = ({ data }: { data: BinaryOperationVariable }) => {
  const { label, operator, result, v1, v2 , pointers} = data;

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-200">
        <tbody>
          {renderBinaryRow(v1.value, pointers, v1.label)}
          <tr>
            <td colSpan={v1.label ? 9 : 8} className="text-center font-bold border border-gray-200">{operator}</td>
          </tr>
          {renderBinaryRow(v2.value, pointers, v2.label)}
          {renderBinaryRow(result.value, pointers, result.label)}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayBinaryOperation;