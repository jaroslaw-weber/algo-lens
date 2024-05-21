/** Defines a generic interface for a problem, parameterized by Input and State types. */
export interface Problem<Input, State> {
  id?: string;
  /** Contains the source code for the problem-solving function. */
  code: string;

  /** A function that provides the input data for the problem. */
  getInput: () => Input;

  /** Title of the problem. */
  title: string;

  /** Function that processes the input and returns an array of states capturing each computation step. */
  func: (t: Input) => ProblemState[];

  /** Optional URL for reference or problem description. */
  url?: string;

  hide?: boolean;

  /* did i test this code? does it work well? */
  tested?: boolean;

  tags?: string[];
}

/** Represents a variable used within a ProblemState, can be a simple number or an array. */
export interface Variable {
  /** Name of the variable. */
  label: string;

  /** Type of the variable, determining whether it's a single number or an array. */
  type:
    | "number"
    | "array"
    | "value-group"
    | "binary"
    | "boolean-group"
    | "interval"
    | "tree"
    | "hashset"
    | "hashmap";
}
export interface BooleanGroupVariable extends Variable {
  data: Array<{ label: string; value: boolean }>;
  label: string;
  type: "boolean-group";
}

/** Represents a pointer in an array, useful for highlighting specific indices during algorithm execution. */
export interface Pointer {
  /** Specifies whether the pointer is for a column or a row in an array. */
  dimension: "column" | "row";

  /** The specific index of the column or row being pointed to. */
  value: number;

  /** Color of the pointer. */
  color?: 1 | 2 | 3;
}

/** Represents a 2D pointer for navigating through two-dimensional arrays. */
export interface Pointer2D {
  /** Row index. */
  r: number;

  /** Column index. */
  c: number;
}

/** Extends the Variable interface specifically for arrays. */
export interface ArrayVariable extends Variable {
  /** The type of variable, explicitly an array in this context. */
  type: "array";

  /** The array containing the values. */
  value: any[];

  /** Optional array of pointers for highlighting specific elements. */
  pointers?: Pointer[];
}

export interface BinaryVariable extends Variable {
  type: "binary";
  value: number;
  pointers?: Pointer[];
}

/** Extends the Variable interface specifically for numeric values. */
export interface SimpleVariable extends Variable {
  /** The type of variable, explicitly a number in this context. */
  type: "number";

  /** Numeric value of the variable. */
  value: number | string;
}

export interface ValueGroupVariable extends Variable {
  type: "value-group";
  data: {
    label: string;
    value: number;
  }[];
  options: {
    min: number;
    max: number;
  };
}

export interface IntervalVariable extends Variable {
  type: "interval";
  value: number[][];
  indexes: number[];
  options: {
    min: number;
    max: number;
  };
}

export interface HashsetVariable extends Variable {
  type: "hashset";
  label: string;
  value: Set<any>;
  highlight: HashHighlight;
} 

export interface HashmapVariable extends Variable {
  type: "hashmap";
  label: string;
  value: Map<any, any>;
  highlight: HashHighlight;
}

export interface TreeVariable extends Variable {
  type: "tree";
  label: string;
  value: BinaryTreeNode | null;
  highlight: NodeHighlight[];
}

export type HashHighlight = {
  value: string | number;
  color: ThemeColor
}

export type ThemeColor = "primary" | "secondary" | "accent" | "warning" | "error" | "neutral" | "success"

export type HighlightColor = "good" | "bad" | "neutral";



export interface NodeHighlight {
  node: BinaryTreeNode;
  color: HighlightColor;
}
/** Represents a state in a problem-solving process, containing an array of Variables and a breakpoint identifier. */
export interface ProblemState {
  /** Array of variables in this state, showing their values and changes. */
  variables: Variable[];

  /** Identifier for the step or phase in the computation when the state was recorded. */
  breakpoint: number;

  description?: string;
}

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
// TreeNode.ts
export interface BinaryTreeNode {
  id?: string;
  val: number | string;
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;
}
