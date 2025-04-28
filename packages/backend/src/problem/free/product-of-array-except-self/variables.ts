import { Variable } from "algo-lens-core";
import { asArray } from "../../core/utils"; // Adjusted path assuming utils is two levels up

// Helper function to create the 'nums' variable array representation
export function asNums(
  nums: number[],
  numsIndex?: number[]
): Variable {
  return asArray("nums", nums, ...(numsIndex ?? []));
}

// Helper function to create the 'productsLeft' variable array representation
export function asProductsLeft(
  productsLeft: number[],
  leftIndex?: number[]
): Variable {
  return asArray("productsLeft", productsLeft, ...(leftIndex ?? []));
}

// Helper function to create the 'productsRight' variable array representation
export function asProductsRight(
  productsRight: number[],
  rightIndex?: number[]
): Variable {
  return asArray("productsRight", productsRight, ...(rightIndex ?? []));
}

// Helper function to create the 'output' variable array representation
export function asOutput(
  output: number[],
  outputIndex?: number[]
): Variable {
  return asArray("output", output, ...(outputIndex ?? []));
}
