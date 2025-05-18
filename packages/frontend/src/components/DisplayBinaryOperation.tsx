import React from "react";
import type { BinaryOperationVariable, BinaryPointer, ThemeColor } from "algo-lens-core";

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

  return (
    <tr className="text-xs items-center">
      {label && <td className="px-2 py-1 font-semibold">{label}</td>}
      {paddedBits.map((bit, index) => {
        // Calculate the original index from the right for highlighting
        const colorClass = getBitColorClass(pointers, index, totalBits);
        return (
          <td
            key={index}
            className={`px-2 py-1 flex-1 ${colorClass}`}
          >
            {bit}
          </td>
        );
      })}
    </tr>
  );
};

const DisplayBinaryOperation = ({ data }: { data: BinaryOperationVariable }) => {
  const { label, operator, result } = data;

  return (
    <div className="overflow-x-auto">
      {label && (
        <h3 className="pl-2 pb-2 text-xl text-center font-semibold">{label}</h3>
      )}
      <table className="mx-auto table-auto border-collapse border border-gray-200">
        <tbody>
          {renderBinaryRow(operandA.value, operandA.pointers, "Operand A")}
          <tr>
            <td className="px-2 py-1 text-center font-semibold">{operator}</td>
            {Array(8).fill(null).map((_, index) => <td key={index} className="px-2 py-1 flex-1"></td>)} {/* Placeholder row for operator alignment */}
          </tr>
          {renderBinaryRow(operandB.value, operandB.pointers, "Operand B")}
          <tr>
             <td className="px-2 py-1 text-center font-semibold">={" "}</td>
             {Array(8).fill(null).map((_, index) => <td key={index} className="px-2 py-1 flex-1"></td>)} {/* Placeholder row for operator alignment */}
          </tr>
          {renderBinaryRow(result.value, result.pointers, "Result")}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayBinaryOperation;