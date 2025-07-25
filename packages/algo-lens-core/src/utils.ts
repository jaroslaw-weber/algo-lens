import pkg from "lodash";
const { cloneDeep } = pkg;

import {
  ArrayVariable,
  BinaryTreeNode,
  BinaryVariable,
  BooleanGroupVariable,
  HashHighlight,
  HashmapVariable,
  HashsetVariable,
  IntervalVariable,
  LabeledInterval,
  LabeledIntervalVariable,
  ListNode,
  ListVariable,
  NodeHighlight,
  Pointer2D,
  Problem,
  SimpleVariable,
  TreeVariable,
  ValueGroupVariable,
} from "./types";
import { LinkedListSerializer } from "./LinkedListSerializer";

export function asSimpleValue(o: any): SimpleVariable[] {
  return Object.keys(o).map((k) => {
    const value = o[k];
    const type = typeof value === "string" ? "string" : "number";

    return { label: k, value, type } as SimpleVariable;
  });
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

function addRandomIds(tree: BinaryTreeNode | null, i: number): number {
  if (!tree) {
    return i;
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
function addRandomIdsToList(node: ListNode | null, i: number): number {
  let current = node;
  while (current !== null) {
    if (current.id !== undefined) {
      // If the current node already has an ID, we assume we've encountered a cycle and stop
      return i;
    }
    current.id = i.toString(); // Assign ID as a string
    i++; // Increment i for the next node
    current = current.next; // Move to the next node
  }
  return i; // Return the last used index
}

export function asList(
  label: string,
  value?: ListNode | null,
  highlight?: NodeHighlight[]
): ListVariable {
  const serialized = LinkedListSerializer.serialize(value ?? null);
  //console.log("serialized list: " + serialized);
  const serializedHighlights = LinkedListSerializer.serializeHighlights(
    highlight!
  );
  return {
    type: "list",
    label,
    value: serialized,
    highlight: serializedHighlights,
  };
}

export function cloneList(node: ListNode | null): ListNode | null {
  const visited = new Map<ListNode, ListNode>();

  function clone(node: ListNode | null): ListNode | null {
    if (!node) return null;

    if (visited.has(node)) {
      return visited.get(node) || null;
    }

    const newNode = new ListNode(node.val);
    visited.set(node, newNode);
    newNode.next = clone(node.next);
    return newNode;
  }

  return clone(node);
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
    value: arr,
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

export function asLabeledIntervals(
  label: string,
  arr: LabeledInterval[],
  highlight: number[],
  min: number,
  max: number
): LabeledIntervalVariable {
  const value = arr.map((x) => x.interval);
  const labels: string[] = arr.map((x) => x.label!);
  const result: LabeledIntervalVariable = {
    label,
    type: "labeled-interval",
    value,
    indexes: highlight,
    options: {
      min,
      max,
    },
    labels,
  };
  return result;
}

export function asArray(
  label: string,
  arr: any[],
  column1?: number,
  column2?: number,
  column3?: number
): ArrayVariable {
  // Initialize result object
  const result: ArrayVariable = {
    label,
    type: "array",
    value: cloneDeep(arr), // Assuming deep cloning is desired for arrays too
    pointers: [],
  };

  if (column1 !== undefined) {
    result.pointers!.push({
      value: column1,
      dimension: "column",
    });
  }
  if (column2 !== undefined) {
    result.pointers!.push({
      value: column2,
      dimension: "column",
    });
  }
  if (column3 !== undefined) {
    result.pointers!.push({
      value: column3,
      dimension: "column",
    });
  }

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
    // check what is index of last element of binary representation of the value number and set it as pointer
    const lastIndex = asBinaryString.length - 1;
    if (result.pointers) {
      // Guard added
      result.pointers.push({
        value: lastIndex,
        dimension: "column",
        label: "last",
      });
    }
  }
  for (const pointer in options?.pointersLeft ?? []) {
    const value = options?.pointersLeft?.[pointer];
    if (value !== undefined) {
      if (result.pointers) {
        // Guard added
        result.pointers.push({
          value,
          dimension: "column",
          label: "left",
        });
      }
    }
  }

  for (const pointer in options?.pointersRight ?? []) {
    const rightPointerValue = options?.pointersRight?.[pointer];
    if (rightPointerValue !== undefined) {
      if (result.pointers) {
        // Guard added
        result.pointers.push({
          value: asBinaryString.length - 1 - rightPointerValue,
          dimension: "column",
          label: "right",
        });
      }
    }
  }

  return result;
}

export function asStringArray(
  label: string,
  s: string,
  column1?: number,
  column2?: number,
  column3?: number
): ArrayVariable {
  // Initialize result object
  const result: ArrayVariable = {
    label,
    type: "array",
    value: s.split(""), // Convert string to array of characters
    pointers: [],
  };

  if (column1 !== undefined) {
    result.pointers!.push({
      value: column1,
      dimension: "column",
    });
  }
  if (column2 !== undefined) {
    result.pointers!.push({
      value: column2,
      dimension: "column",
    });
  }
  if (column3 !== undefined) {
    result.pointers!.push({
      value: column3,
      dimension: "column",
    });
  }
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
    value: cloneDeep(arr),
    pointers: pointers,
  };
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
  highlights?: HashHighlight[]
): HashmapVariable {
  const obj: { [key: string]: any } = {};
  map.forEach((value, key) => {
    obj[String(key)] = value;
  });
  return {
    label,
    type: "hashmap",
    value: obj, // Convert Map to object for serialization
    highlights,
  };
}

export function from2dArrayToMap<T, U>(arr: any[][]): Map<T, U> {
  const result = new Map();
  for (const row of arr) {
    if (row.length) {
      result.set(
        row[0],
        row
          .slice(1)
          .map((x) => x.toString())
          .join(",")
      );
    }
  }
  // //
  // //
  return result;
}
