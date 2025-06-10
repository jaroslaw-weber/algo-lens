import { ProblemState, Pointer2D } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { SpiralMatrixInput, SpiralMatrixOutput } from "./types";

// HIDE_START
function getOutOfBoundsPointers(
  top: number,
  bottom: number,
  left: number,
  right: number,
  m: number,
  n: number
): Pointer2D[] {
  const pointers: Pointer2D[] = [];

  // Above top boundary
  for (let i = 0; i < top; i++) {
    for (let j = 0; j < n; j++) {
      pointers.push({ r: i, c: j, color: "error" });
    }
  }
  // Below bottom boundary
  for (let i = bottom + 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      pointers.push({ r: i, c: j, color: "error" });
    }
  }
  // Left of left boundary (within current rows)
  for (let i = top; i <= bottom; i++) {
    for (let j = 0; j < left; j++) {
      pointers.push({ r: i, c: j, color: "error" });
    }
  }
  // Right of right boundary (within current rows)
  for (let i = top; i <= bottom; i++) {
    for (let j = right + 1; j < n; j++) {
      pointers.push({ r: i, c: j, color: "error" });
    }
  }

  return pointers;
}
// HIDE_END

export function generateSteps(input: SpiralMatrixInput): ProblemState[] {
  const l = new StepLoggerV2();
  // HIDE_START
  const matrix = input.matrix;
  // HIDE_END
  const m = matrix.length;
  const n = matrix[0].length;

  let top = 0;
  let bottom = m - 1;
  let left = 0;
  let right = n - 1;
  const result: number[] = [];

  l.comment = "Initialize boundaries and result array.";
  l.arrayV3({ result }, []);
  l.grid(
    "matrix",
    matrix,
    ...getOutOfBoundsPointers(top, bottom, left, right, m, n)
  );
  l.breakpoint(1);

  while (top <= bottom && left <= right) {
    // Traverse right
    l.comment = "Traverse right along the top row.";
    l.grid(
      "matrix",
      matrix,
      ...getOutOfBoundsPointers(top, bottom, left, right, m, n)
    );
    l.breakpoint(2);
    for (let j = left; j <= right; j++) {
      result.push(matrix[top][j]);
      l.comment = `Add element matrix[${top}][${j}] (${matrix[top][j]}) to result.`;
      l.grid(
        "matrix",
        matrix,
        ...getOutOfBoundsPointers(top, bottom, left, right, m, n),
        { r: top, c: j, label: "current", color: "secondary", dir: "bottom" }
      );
      l.arrayV3({ result }, [{ value: result.length - 1, color: "success" }]);
      l.breakpoint(3);
    }
    top++;
    l.comment = "Move top boundary down.";
    l.grid(
      "matrix",
      matrix,
      ...getOutOfBoundsPointers(top, bottom, left, right, m, n)
    );
    l.arrayV3({ result }, []);
    l.breakpoint(4);

    // Traverse down
    l.comment = "Traverse down along the rightmost column.";
    l.grid(
      "matrix",
      matrix,
      ...getOutOfBoundsPointers(top, bottom, left, right, m, n)
    );
    l.breakpoint(5);
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
      l.comment = `Add element matrix[${i}][${right}] (${matrix[i][right]}) to result.`;
      l.grid(
        "matrix",
        matrix,
        ...getOutOfBoundsPointers(top, bottom, left, right, m, n),
        { r: i, c: right, label: "current", color: "secondary", dir: "top" }
      );
      l.arrayV3({ result }, [{ value: result.length - 1, color: "success" }]);
      l.breakpoint(6);
    }
    right--;
    l.comment = "Move right boundary left.";
    l.grid(
      "matrix",
      matrix,
      ...getOutOfBoundsPointers(top, bottom, left, right, m, n)
    );
    l.arrayV3({ result }, []);
    l.breakpoint(7);

    // Traverse left
    if (top <= bottom) {
      l.comment = "Traverse left along the bottom row.";
      l.grid(
        "matrix",
        matrix,
        ...getOutOfBoundsPointers(top, bottom, left, right, m, n)
      );
      l.breakpoint(8);
      for (let j = right; j >= left; j--) {
        result.push(matrix[bottom][j]);
        l.comment = `Add element matrix[${bottom}][${j}] (${matrix[bottom][j]}) to result.`;
        l.grid(
          "matrix",
          matrix,
          ...getOutOfBoundsPointers(top, bottom, left, right, m, n),
          { r: bottom, c: j, label: "current", color: "secondary", dir: "top" }
        );
        l.arrayV3({ result }, [{ value: result.length - 1, color: "success" }]);
        l.breakpoint(9);
      }
      bottom--;
      l.comment = "Move bottom boundary up.";
      l.grid(
        "matrix",
        matrix,
        ...getOutOfBoundsPointers(top, bottom, left, right, m, n)
      );
      l.arrayV3({ result }, []);
      l.breakpoint(10);
    }

    // Traverse up
    if (left <= right) {
      l.comment = "Traverse up along the leftmost column.";
      l.grid(
        "matrix",
        matrix,
        ...getOutOfBoundsPointers(top, bottom, left, right, m, n)
      );
      l.breakpoint(11);
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
        l.comment = `Add element matrix[${i}][${left}] (${matrix[i][left]}) to result.`;
        l.grid(
          "matrix",
          matrix,
          ...getOutOfBoundsPointers(top, bottom, left, right, m, n),
          { r: i, c: left, label: "current", color: "secondary", dir: "top" }
        );
        l.arrayV3({ result }, [{ value: result.length - 1, color: "success" }]);
        l.breakpoint(12);
      }
      left++;
      l.comment = "Move left boundary right.";
      l.grid(
        "matrix",
        matrix,
        ...getOutOfBoundsPointers(top, bottom, left, right, m, n)
      );
      l.arrayV3({ result }, []);
      l.breakpoint(13);
    }
  }

  l.comment = "All elements traversed. Final result.";
  l.arrayV3({ result }, []);
  l.breakpoint(14);

  return l.getSteps();
}
