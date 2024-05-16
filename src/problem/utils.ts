import { sample, cloneDeep, reverse } from "lodash";
import {
  ArrayVariable,
  ValueGroupVariable as ValueGroupVariable,
  Pointer2D,
  SimpleVariable,
  BinaryVariable,
  Variable,
  BooleanGroupVariable,
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
}/** Display similar boolean values in a group */
export function asBooleanGroup(label: string, o: Record<string, boolean>): BooleanGroupVariable {
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
  return array.map(row => cloneDeep(row));
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
