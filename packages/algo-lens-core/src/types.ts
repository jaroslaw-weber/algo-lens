export interface ProblemMetadata {
  variables: VariableMetadata[];
  groups?: GroupMetadata[];
  solutionCode?: string;
  visualizerCode?: string;
}

export interface TestCase<Input, State> {
  input: Input;
  expected: any;
  name: string;
  serializer?: string;
  description: string; // Changed to required based on testcase-guidelines.md
  isDefault?: boolean;
}

export type Plan = "free" | "premium";

/** Defines a generic interface for a problem, parameterized by Input and State types. */
export interface Problem<Input, State> {
  id: string;

  testcases: TestCase<Input, any>[];

  /** Title of the problem. */
  title: string;

  /** Function that processes the input and returns an array of states capturing each computation step. */
  func: (t: Input) => ProblemState[];

  func2?: (t: Input) => ProblemState[];

  code?: string;

  /** emoji to display with the problem title. */
  emoji: string;

  tags: string[];

  difficulty: Difficulty;

  description?: string; // Content from description.md
  explanation?: string; // Content from explanation.md

  metadata: ProblemMetadata;

  codegen?: {
    signature: string;
  };
  bookmark?: boolean;
  podcastUrl?: string;

  plan?: "premium" | "free";
}

export type ProblemGroup = {
  label: string;
  problems: Problem<any, any>[];
};

export type Difficulty = "easy" | "medium" | "hard";

/** Represents a variable used within a ProblemState, can be a simple number or an array. */
export interface Variable {
  /** Name of the variable. */
  label: string;

  /** if true, make it gray or less visible */
  hide?: boolean;

  /** Type of the variable, determining whether it's a single number or an array. */
  type:
    | "number"
    | "string"
    | "array"
    | "value-group"
    | "binary"
    | "boolean-group"
    | "interval"
    | "tree"
    | "list"
    | "hashset"
    | "hashmap"
    | "binary-operation"
    | "labeled-interval";
}
export interface BooleanGroupVariable extends Variable {
  data: Array<{ label: string; value: boolean }>;
  label: string;
  type: "boolean-group";
}

/** Represents a pointer in an array, useful for highlighting specific indices during algorithm execution. */
export interface Pointer {
  /** Specifies whether the pointer is for a column or a row in an array. */
  dimension?: "column" | "row";

  /** The specific index of the column or row being pointed to. */
  value: number;

  /** Color of the pointer. */
  color?:
    | "primary"
    | "neutral"
    | "success"
    | "warning"
    | "error"
    | "accent"
    | "info";

  label?: string;
  dir?: "left" | "right" | "top" | "bottom";
}

/** Represents a pointer for binary values. */
export interface BinaryPointer {
  index: number; // The index of the bit to highlight (0-based)
  color: ThemeColor; // The color to use for highlighting
  direction: "left" | "right"; // The direction from which the index is counted
}

/** Represents a 2D pointer for navigating through two-dimensional arrays. */
export interface Pointer2D {
  /** Row index. */
  r: number;

  /** Column index. */
  c: number;

  color?: string;

  label?: string;

  dir?: string; //"left" | "right" | "up" | "bottom"
}

/** Extends the Variable interface specifically for arrays. */
export interface ArrayVariable extends Variable {
  /** The type of variable, explicitly an array in this context. */
  type: "array";

  /** The array containing the values. */
  value: any[];

  /** Optional array of pointers for highlighting specific elements. */
  pointers?: (Pointer | Pointer2D)[];
}

export interface BinaryVariable extends Variable {
  type: "binary";
  value: number;
  pointers?: Pointer[];
}

export interface BinaryOperationVariable extends Variable {
  type: "binary-operation";
  label: string;
  pointers: BinaryPointer[];
  v1: {
    value: number;
    label: string;
  };
  v2: {
    value: number;
    label: string;
  };
  result: {
    value: number;
    label: string;
  };

  operator: string; // e.g., "AND", "OR", "XOR", "ADD"
}

/** Extends the Variable interface specifically for numeric values. */
export interface SimpleVariable extends Variable {
  /** The type of variable, explicitly a number in this context. */
  type: "number" | "string";

  /** Numeric value of the variable. */
  value: number | string;
}

export interface ValueGroupVariable extends Variable {
  type: "value-group";
  data: {
    label: string;
    value: number;
    description?: string;
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

export interface LabeledInterval {
  interval: number[];
  label?: string; // Optional label for each interval
}

export interface LabeledIntervalVariable extends Variable {
  type: "labeled-interval"; // A new type
  value: number[][];
  indexes: number[];
  options: {
    min: number;
    max: number;
  };
  labels?: string[];
}

export interface HashsetVariable extends Variable {
  type: "hashset";
  label: string;
  value: Set<any> | any[];
  highlight: HashHighlight;
}

export interface HashmapVariable extends Variable {
  type: "hashmap";
  label: string;
  value: Map<any, any> | Record<string, any>;
  keyLabel?: string;
  valueLabel?: string;
  highlights?: HashHighlight[];
}

export interface TreeVariable extends Variable {
  type: "tree";
  label: string;
  value: BinaryTreeNode | null;
  highlight: NodeHighlight[];
}

export interface SerializedListNode {
  id: string; // Unique identifier for the serialized node
  next: string | null; // ID of the next node in the linked list
  value: number | string;
}

export interface ListVariable extends Variable {
  type: "list"; // Specify the variable type as "list"
  label: string; // Descriptive label for the variable
  value: ListNode | SerializedListNode[] | null; // nodes or head node
  highlight: NodeHighlight[]; // Array of nodes to be highlighted with specific colors
}

export type HashHighlight = {
  key?: string | number;
  value?: string | number;
  color?: ThemeColor;
  label?: string;
};

export type ThemeColor =
  | "primary"
  | "secondary"
  | "accent"
  | "warning"
  | "error"
  | "neutral"
  | "success";

export type HighlightColor = "good" | "bad" | "neutral";

export interface NodeHighlight {
  node?: BinaryTreeNode | ListNode | null | SerializedListNode;
  color: HighlightColor;
  label?: string;
  tooltip?: {
    position: "top" | "bottom";
  };
}
/** Represents a state in a problem-solving process, containing an array of Variables and a breakpoint identifier. */
export interface ProblemState {
  /** Array of variables in this state, showing their values and changes. */
  variables: Variable[];

  /** Identifier for the step or phase in the computation when the state was recorded. */
  breakpoint: number;

  description?: string;

  number?: number;
}

export interface VariableMetadata {
  name: string;
  label?: string;
  emoji: string;
  description: string;

  //default value is 1, if set to 2, it will be very wide
  width?: number;
  /** how to order each variable? */
  order?: number;
}

export interface GroupMetadata {
  name: string;
  label?: string;
  emoji?: string;
  description?: string;
}

export class ListNode {
  id?: string;
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
