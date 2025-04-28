import { Variable, Pointer2D } from "algo-lens-core";
import { as2dArray as utilAs2dArray, asBooleanGroup as utilAsBooleanGroup } from "../../core/utils"; // Adjust path

// Helper function to create the matrix variable representation
export function asMatrix(
  matrix: number[][],
  pointers: Pointer2D[] = []
): Variable {
    // Note: Original log function had a comment about potential highlighting bug for (0,0).
    // This helper directly uses the provided pointers.
  return utilAs2dArray("matrix", matrix, pointers);
}

// Helper function to create the flags boolean group variable
export function asFlags(firstRowHasZero: boolean, firstColHasZero: boolean): Variable {
  return utilAsBooleanGroup("flags", { firstRowHasZero, firstColHasZero });
}
