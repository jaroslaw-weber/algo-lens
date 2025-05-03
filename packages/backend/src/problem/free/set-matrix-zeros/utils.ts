/**
 * Creates a deep clone of a 2D number array (matrix).
 * @param matrix The 2D array to clone.
 * @returns A new 2D array with the same values.
 */
export function deepClone2DArray(matrix: number[][]): number[][] {
  if (!matrix) {
    return [];
  }
  return matrix.map(row => [...row]);
}
