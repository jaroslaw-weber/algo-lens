import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { SpiralMatrixInput, SpiralMatrixOutput } from "./types";

export function generateSteps(input: SpiralMatrixInput): ProblemState[] {
  const l = new StepLoggerV2();
  const matrix = input.matrix;
  const m = matrix.length;
  const n = matrix[0].length;

  let top = 0;
  let bottom = m - 1;
  let left = 0;
  let right = n - 1;
  const result: SpiralMatrixOutput = [];

  l.comment = "Initialize boundaries and result array.";
  l.simple({ matrix, m, n, top, bottom, left, right, result });
  l.breakpoint(1);

  while (top <= bottom && left <= right) {
    // Traverse right
    l.comment = "Traverse right along the top row.";
    l.simple({ top, bottom, left, right });
    l.grid(
      "matrix",
      matrix,
      {
        r: top,
        c: left,
        label: "top row start",
        color: "primary",
        dir: "right",
      },
      { r: top, c: right, label: "top row end", color: "primary", dir: "right" }
    );
    l.breakpoint(2);
    for (let j = left; j <= right; j++) {
      result.push(matrix[top][j]);
      l.comment = `Add element matrix[${top}][${j}] (${matrix[top][j]}) to result.`;
      l.simple({ matrix, top, bottom, left, right, result, i: top, j });
      l.grid("matrix", matrix, {
        r: top,
        c: j,
        label: "current",
        color: "secondary",
        dir: "bottom",
      });
      l.breakpoint(3);
    }
    top++;
    l.comment = "Move top boundary down.";
    l.simple({ top, bottom, left, right, result });
    l.breakpoint(4);

    // Traverse down
    l.comment = "Traverse down along the rightmost column.";
    l.simple({ top, bottom, left, right });
    l.grid(
      "matrix",
      matrix,
      {
        r: top,
        c: right,
        label: "right col start",
        color: "primary",
        dir: "bottom",
      },
      {
        r: bottom,
        c: right,
        label: "right col end",
        color: "primary",
        dir: "bottom",
      }
    );
    l.breakpoint(5);
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
      l.comment = `Add element matrix[${i}][${right}] (${matrix[i][right]}) to result.`;
      l.simple({ matrix, top, bottom, left, right, result, i, j: right });
      l.grid("matrix", matrix, {
        r: i,
        c: right,
        label: "current",
        color: "secondary",
        dir: "right",
      });
      l.breakpoint(6);
    }
    right--;
    l.comment = "Move right boundary left.";
    l.simple({ top, bottom, left, right, result });
    l.breakpoint(7);

    // Traverse left
    if (top <= bottom) {
      l.comment = "Traverse left along the bottom row.";
      l.simple({ top, bottom, left, right });
      l.grid(
        "matrix",
        matrix,
        {
          r: bottom,
          c: right,
          label: "bottom row start",
          color: "primary",
          dir: "left",
        },
        {
          r: bottom,
          c: left,
          label: "bottom row end",
          color: "primary",
          dir: "left",
        }
      );
      l.breakpoint(8);
      for (let j = right; j >= left; j--) {
        result.push(matrix[bottom][j]);
        l.comment = `Add element matrix[${bottom}][${j}] (${matrix[bottom][j]}) to result.`;
        l.simple({ matrix, top, bottom, left, right, result, i: bottom, j });
        l.grid("matrix", matrix, {
          r: bottom,
          c: j,
          label: "current",
          color: "secondary",
          dir: "top",
        });
        l.breakpoint(9);
      }
      bottom--;
      l.comment = "Move bottom boundary up.";
      l.simple({ top, bottom, left, right, result });
      l.breakpoint(10);
    }

    // Traverse up
    if (left <= right) {
      l.comment = "Traverse up along the leftmost column.";
      l.simple({ top, bottom, left, right });
      l.grid(
        "matrix",
        matrix,
        {
          r: bottom,
          c: left,
          label: "left col start",
          color: "primary",
          dir: "top",
        },
        { r: top, c: left, label: "left col end", color: "primary", dir: "top" }
      );
      l.breakpoint(11);
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
        l.comment = `Add element matrix[${i}][${left}] (${matrix[i][left]}) to result.`;
        l.simple({ matrix, top, bottom, left, right, result, i, j: left });
        l.grid("matrix", matrix, {
          r: i,
          c: left,
          label: "current",
          color: "secondary",
          dir: "left",
        });
        l.breakpoint(12);
      }
      left++;
      l.comment = "Move left boundary right.";
      l.simple({ top, bottom, left, right, result });
      l.breakpoint(13);
    }
  }

  l.comment = "All elements traversed. Final result.";
  l.simple({ result });
  l.breakpoint(14);

  return l.getSteps();
}
