import { sample, cloneDeep, reverse, min, max } from "lodash";
import {
  ArrayVariable,
  ValueGroupVariable as ValueGroupVariable,
  Pointer2D,
  SimpleVariable,
  BinaryVariable,
  Variable,
  BooleanGroupVariable,
  IntervalVariable,
  NodeHighlight,
  HashsetVariable,
  HashHighlight,
  HashmapVariable,
} from "./types";
import { problems } from "./list";

export function getRandomProblem() {
  return sample(problems);
}

export function getProblemById(id: string) {
  console.log("getProblemById", id);
  return problems.find((p) => p.id === id);
}

export function asSimpleValue(o: any): SimpleVariable[] {
  return Object.keys(o).map(
    (k) => ({ label: k, value: o[k], type: "number" } as SimpleVariable)
  );
}

/** display similar values in a group */
export function asValueGroup(
  label: string,
  o: any,
  options: { min: number; max: number; reverse?: any }
): ValueGroupVariable {
  const result: ValueGroupVariable = {
    data: [],
    label,
    type: "value-group",
    options,
  };
  for (const key in o) {
    result.data.push({
      label: key,
      value: o[key],
    });
  }

  return result;
} /** Display similar boolean values in a group */
export function asBooleanGroup(
  label: string,
  o: Record<string, boolean>
): BooleanGroupVariable {
  const result: BooleanGroupVariable = {
    data: [],
    label,
    type: "boolean-group",
  };
  for (const key in o) {
    result.data.push({
      label: key,
      value: o[key],
    });
  }
  return result;
}

// utils.ts
import { BinaryTreeNode, TreeVariable } from "./types";

function addRandomIds(tree: BinaryTreeNode | null, i: number): number {
  if (!tree) {
    return;
  }

  tree.id = i.toString();
  i++;
  if (tree.left) {
    i = addRandomIds(tree.left, i);
  }
  i++;
  if (tree.right) {
    i = addRandomIds(tree.right, i);
  }
  return i;
}

export function asTree(
  label: string,
  value: BinaryTreeNode | null,
  highlight: NodeHighlight[]
): TreeVariable {
  //add random ids
  addRandomIds(value, 1);
  return {
    type: "tree",
    label,
    value,
    highlight,
  };
}

export function asIntervals(
  label: string,
  arr: number[][],
  highlight: number[],
  min: number,
  max: number
): IntervalVariable {
  const result: IntervalVariable = {
    label,
    type: "interval",
    value: deepClone2DArray(arr),
    indexes: highlight,
    options: {
      min,
      max,
    },
  };
  return result;
}

export function getIntervalBounds(arr: number[][]) {
  const min = Math.min(...arr.flat());
  const max = Math.max(...arr.flat());
  return { min, max };
}

export function asArray(
  label: string,
  arr: any[],
  column1?: number,
  column2?: number,
  column3?: number
): ArrayVariable {
  const result: ArrayVariable = {
    label,
    type: "array",
    value: cloneDeep(arr),
    pointers: [
      {
        value: column1,
        dimension: "column",
      },
      {
        value: column2,
        dimension: "column",
      },
      {
        value: column3,
        dimension: "column",
      },
    ],
  };
  return result;
}

export function asBinary(
  o: Record<string, number>,
  options?: {
    highlightLast?: boolean;
    /* pointers index but starting from left */
    pointersLeft?: number[];
    /* pointers index but starting from right */
    pointersRight?: number[];
  }
): BinaryVariable {
  const keys = Object.keys(o);
  if (keys.length != 1) {
    throw new Error("asBinary only support one key");
  }
  const [label] = keys;
  const value = o[label];

  //
  const result: BinaryVariable = {
    label,
    type: "binary",
    value: value,
    pointers: [],
  };
  const asBinaryString = value.toString(2);
  if (options?.highlightLast) {
    //check what is index of last element of binary representation of the value number and set it as pointer
    const lastIndex = asBinaryString.length - 1;
    result.pointers.push({
      value: lastIndex,
      dimension: "column",
    });
  }
  for (const pointer in options?.pointersLeft ?? []) {
    result.pointers.push({
      value: options?.pointersLeft[pointer],
      dimension: "column",
    });
  }

  for (const pointer in options?.pointersRight ?? []) {
    result.pointers.push({
      value: asBinaryString.length - 1 - options?.pointersRight[pointer],
      dimension: "column",
    });
  }

  return result;
}

export function deepClone2DArray<T>(array: T[][]): T[][] {
  return array.map((row) => cloneDeep(row));
}

export function asStringArray(
  label: string,
  s: string,
  column1?: number,
  column2?: number,
  column3?: number
): ArrayVariable {
  const result: ArrayVariable = {
    label,
    type: "array",
    value: s.split(""),
    pointers: [
      {
        value: column1,
        dimension: "column",
      },
      {
        value: column2,
        dimension: "column",
      },
      {
        value: column3,
        dimension: "column",
      },
    ],
  };
  return result;
}

export function as2dArray(
  label: string,
  arr: any[][],
  pointers: Pointer2D[]
): ArrayVariable {
  const result: ArrayVariable = {
    label,
    type: "array",
    value: deepClone2DArray(arr),
    pointers: [],
  };
  for (const p of pointers) {
    result.pointers.push({
      value: p.r,
      dimension: "row",
    });
    result.pointers.push({
      value: p.c,
      dimension: "column",
    });
  }
  return result;
}
export function asHashset<T>(
  label: string,
  set: Set<any>,
  highlight: HashHighlight
): HashsetVariable {
  return {
    label,
    type: "hashset",
    value: new Set(set), //cloning set
    highlight,
  };
}
export function asHashmap(
  label: string,
  map: Map<any, any>,
  highlight: HashHighlight
): HashmapVariable {
  return {
    label,
    type: "hashmap",
    value: new Map(map), // cloning the map
    highlight,
  };
}

export function from2dArrayToMap(arr: any[][]): Map<any, any> {
  const result = new Map();
  for (const row of arr) {
    if (row.length) {
      result.set(row[0], row.slice(1).map(x=>x.toString()).join(","));
    }
  }
  return result;
}
