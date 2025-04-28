import { Variable } from "algo-lens-core";
import { asArray as utilAsArray, asSimpleValue as utilAsSimpleValue } from "../../core/utils"; // Adjust path assuming utils is two levels up

// Helper function to create the 'nums' array variable representation with highlights
export function asNumsArray(
  nums: number[],
  left: number,
  right: number,
  mid?: number
): Variable {
    // Filter out undefined mid before passing to asArray
    const highlights = [left, right];
    if (mid !== undefined) {
        highlights.push(mid);
    }
  return utilAsArray("nums", nums, ...highlights);
}

// Helper function to create variables for simple values like target and result
export function asTargetAndResult(target: number, result: number): Variable[] {
  return utilAsSimpleValue({ target, result });
}
