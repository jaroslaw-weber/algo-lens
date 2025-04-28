import { Variable, BinaryVariable } from "algo-lens-core";

// Helper function to represent a number as a binary variable for visualization
export function asBinary(
  o: Record<string, number>,
  options?: {
    highlightLast?: boolean; // Highlight the least significant bit
    pointersLeft?: number[]; // Indices from left (0-based) to highlight
    pointersRight?: number[]; // Indices from right (0-based, LSB is 0) to highlight
  }
): BinaryVariable {
  const keys = Object.keys(o);
  if (keys.length !== 1) {
    throw new Error("asBinary only supports one key (label for the variable)");
  }
  const [label] = keys;
  const value = o[label];

  const result: BinaryVariable = {
    label,
    type: "binary",
    value: value,
    pointers: [], // Initialize pointers array
  };

  const binaryString = (value >>> 0).toString(2); // Use unsigned right shift for non-negative binary rep

  // Highlight Last Bit (LSB)
  if (options?.highlightLast) {
    const lastIndex = binaryString.length - 1;
    if (lastIndex >= 0) { // Ensure string is not empty
        result.pointers.push({
            value: lastIndex,
            dimension: "column",
        });
    }
  }

  // Highlight bits by index from the left (MSB)
  if (options?.pointersLeft) {
      for (const pointerIndex of options.pointersLeft) {
          if (pointerIndex >= 0 && pointerIndex < binaryString.length) {
              result.pointers.push({
                  value: pointerIndex,
                  dimension: "column",
              });
          }
      }
  }


  // Highlight bits by index from the right (LSB)
  if (options?.pointersRight) {
      for (const pointerIndex of options.pointersRight) {
          const indexFromLeft = binaryString.length - 1 - pointerIndex;
          if (indexFromLeft >= 0 && indexFromLeft < binaryString.length) {
              result.pointers.push({
                  value: indexFromLeft,
                  dimension: "column",
              });
          }
      }
  }


  return result;
}
