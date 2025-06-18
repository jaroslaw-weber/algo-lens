## Problem

Given an `m x n` matrix, return all elements of the matrix in spiral order.

## Example

Input: `matrix = [[1,2,3],[4,5,6],[7,8,9]]`
Output: `[1,2,3,6,9,8,7,4,5]`
Explanation: The elements are traversed in a clockwise spiral order.

Input: `matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]`
Output: `[1,2,3,4,8,12,11,10,9,5,6,7]`
Explanation: The elements are traversed in a clockwise spiral order.

## Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100`

## Edge Cases

- A matrix with a single row or a single column.
- A 1x1 matrix.