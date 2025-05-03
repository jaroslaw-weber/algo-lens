/**
 * Initializes a 2D DP table of size m x n with a given initial value.
 * @param m Number of rows.
 * @param n Number of columns.
 * @param initialValue The value to fill the table with.
 * @returns A new m x n 2D array.
 */
export function initializeDPTable(m: number, n: number, initialValue: number): number[][] {
  if (m <= 0 || n <= 0) {
    return [];
  }
  return Array.from({ length: m }, () => Array(n).fill(initialValue));
}
