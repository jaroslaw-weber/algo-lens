import {
  ArrayVariable,
  BinaryTreeNode,
  HashHighlight,
  ListNode,
  NodeHighlight,
  Pointer,
  Pointer2D,
  ProblemState,
  Variable,
  VariableMetadata,
  BinaryOperationVariable,
  BinaryPointer,
  LabeledInterval,
} from "./types.js";
import {
  as2dArray,
  asBinary,
  asHashmap,
  asHashset,
  asIntervals,
  asLabeledIntervals,
  asList,
  asSimpleValue,
  asTree,
  asValueGroup,
  getIntervalBounds,
} from "./utils.js";

import _ from "lodash";
/**
 * The StepLoggerV2 class is designed to capture the state of variables
 * at different points during an algorithm's execution. It allows logging
 * various data structures like arrays, linked lists, trees, hash maps, etc.,
 * along with relevant highlighting or pointer information for visualization.
 *
 * By calling the logging methods (e.g., `array()`, `tree()`, `list()`)
 * followed by `breakpoint()`, the state of the logged variables is captured
 * as a "step". These steps are stored internally and can be retrieved using
 * `getSteps()`.
 *
 * The primary purpose of this class is to facilitate the step-by-step
 * visualization of algorithms, enabling users to understand how data structures
 * and variables change throughout the execution process. The output from
 * `getSteps()` can be consumed by a frontend component to render the
 * algorithm's progression.
 */
export class StepLoggerV2 {
  private steps: ProblemState[];
  private variables: Variable[];
  private metadata: Map<string, VariableMetadata>;
  private currentBreakpoint = 0;

  /** explanation of the current step */
  comment?: string;
  groupOptions: Map<string, { min?: number; max?: number; reverse?: boolean }> =
    new Map();
  hashmapOptions: Map<string, { keyLabel?: string; valueLabel?: string }> =
    new Map();
  constructor() {
    // Initialize the array to store the history of problem states (steps).
    this.steps = [];
    // Initialize the array to hold the current state of tracked variables.
    this.variables = [];
    // Initialize the map to store metadata associated with variables (e.g., display options).
    this.metadata = new Map();
  }

  /**
   * Captures the current state of all tracked variables and the current breakpoint,
   * creating a snapshot (ProblemState). This snapshot is then deep-cloned to prevent
   * mutations from affecting previous steps, and the clone is added to the `steps` history.
   * This method is typically called by `breakpoint()`.
   */
  private save() {
    // Aggregate the current variable states and the current breakpoint into a ProblemState object.
    const aggregated: ProblemState = {
      variables: this.variables,
      breakpoint: this.currentBreakpoint,
      description: this.comment,
    };
    // Deep-clone the aggregated state to ensure immutability of past steps.
    const cloned = _.cloneDeep(aggregated);
    // Add the cloned state snapshot to the history of steps.
    this.steps.push(cloned);
  }

  /**
   * Marks a specific point (breakpoint) in the algorithm's execution.
   * This updates the internal breakpoint identifier and triggers the `save` method
   * to capture the current state of all tracked variables at this point.
   * An optional description can be provided, though it's not currently used in the state saving.
   * @param breakpoint - A numerical identifier for this breakpoint.
   * @param description - An optional description for the breakpoint (currently unused).
   */
  public breakpoint(breakpoint: number) {
    // Update the current breakpoint identifier. This value will be stored in the saved state.
    this.currentBreakpoint = breakpoint;
    // Call the save method to capture and store the current variable state snapshot.
    this.save();
  }

  /**
   * Updates an existing variable or inserts a new one into the `variables` array.
   * It identifies variables based on their `label`. If a variable with the same
   * label already exists, it's replaced with the new variable object. Otherwise,
   * the new variable is appended to the end of the array.
   * This ensures that the relative order of other variables is preserved.
   * @param variable - The variable object to add or update.
   */
  private upsert(variable: Variable) {
    // Check if a variable with the same label already exists in the array.
    const index = this.variables.findIndex((s) => s.label === variable.label);
    if (index !== -1) {
      // If found, update the existing variable at its current position.
      this.variables[index] = variable;
    } else {
      // If not found, append the new variable to the end of the array.
      this.variables.push(variable);
    }
  }

  /**
   * Logs the state of a Binary Tree variable.
   * Uses `asTree` to format the data and `upsert` to add/update it.
   * @param label - The name of the variable.
   * @param value - The root node of the binary tree (or null).
   * @param highlight - Optional array of node highlights.
   */
  public tree(
    label: string,
    value: BinaryTreeNode | null,
    highlight: NodeHighlight[] = []
  ) {
    const variable = asTree(label, value, highlight);
    this.upsert(variable);
  }

  /**
   * Logs the state of a binary representation (e.g., bits of a number).
   * Uses `asBinary` to format the data and `upsert` to add/update it.
   * @param o - A record where keys are labels (e.g., 'bit 0') and values are numbers (0 or 1).
   * @param options - Optional configuration for highlighting or pointers.
   */
  public binary(
    o: Record<string, number>,
    options?: {
      highlightLast?: boolean;
      pointersLeft?: number[];
      pointersRight?: number[];
    }
  ) {
    const variable = asBinary(o, options);
    this.upsert(variable);
  }

  /**
   * Logs the state of a binary operation.
   * @param label - The name of the variable.
   * @param operandA - The first operand.
   * @param operandB - The second operand.
   * @param operator - The binary operator (e.g., "AND", "OR", "XOR", "ADD").
   * @param highlightA - Optional highlighting for operand A.
   * @param highlightB - Optional highlighting for operand B.
   * @param highlightResult - Optional highlighting for the result.
   */
  public binaryOperation(
    label: string,
    values: Record<string, number>,
    operator: "AND" | "OR" | "XOR" | "ADD" | "SHIFT_LEFT" | "SHIFT_RIGHT"
  ) {
    const [v1, v2] = _.values(values);
    const [label1, label2] = _.keys(values);

    // Calculate the result based on the operator (basic implementation for now)
    let resultValue: number;
    switch (operator) {
      case "AND":
        resultValue = v1 & v2;
        break;
      case "OR":
        resultValue = v1 | v2;
        break;
      case "XOR":
        resultValue = v1 ^ v2;
        break;
      case "ADD":
        resultValue = v1 + v2;
        break;
      case "SHIFT_LEFT":
        resultValue = v1 << 1;
        break;
      case "SHIFT_RIGHT":
        resultValue = v1 >> 1;
        break;
      default:
        resultValue = 0; // Or throw an error for unsupported operator
    }

    const resultPointers: BinaryPointer[] = [];
    const totalBits = 8; // Assuming 8-bit padding as in frontend

    const binaryString = resultValue.toString(2).padStart(totalBits, "0");
    for (let i = 0; i < totalBits; i++) {
      const v = binaryString[i];
      resultPointers.push({
        index: i,
        color: v == "1" ? "success" : "error",
        direction: "right",
      });
    }

    const variable: BinaryOperationVariable = {
      label,
      type: "binary-operation",
      v1: {
        value: v1,
        label: label1,
      },

      v2: {
        value: v2,
        label: label2,
      },
      result: {
        value: resultValue,
        label: "result",
      },

      pointers: resultPointers, // Use the generated pointers here
      operator,
    };
    this.upsert(variable);
  }

  public arrayV3(
    arrayContaner: Record<string, any[]>,
    pointers: (Pointer | Pointer2D)[]
  ) {
    const arrayKey = Object.keys(arrayContaner)[0];
    const values = arrayContaner[arrayKey];
    const v: ArrayVariable = {
      label: arrayKey,
      type: "array",
      value: values.map((item) => (item === Infinity ? "INFINITY" : item)), // Replace Infinity with placeholder
      pointers: pointers
        .filter((x) => !!x)
        .map((p) => {
          if ("dimension" in p && p.dimension === undefined) {
            return { ...p, dimension: "column" };
          }
          return p;
        }),
    };
    this.upsert(v);
  }

  /**
   * Logs the state of a string variable, automatically splitting it into characters.
   * Uses `upsert` to add/update it.
   * @param stringContainer - A record where the key is the label for the string and the value is the string itself.
   * @param pointers - Optional array of pointers for highlighting or indicating positions within the string.
   */
  public string(
    stringContainer: Record<string, string>,
    pointers: (Pointer | Pointer2D)[] = []
  ) {
    const stringKey = Object.keys(stringContainer)[0];
    const value = stringContainer[stringKey];
    const v: ArrayVariable = {
      label: stringKey,
      type: "array", // Represent string as an array of characters
      value: value.split(""), // Split the string into an array of characters
      pointers: pointers
        .filter((x) => !!x)
        .map((p) => {
          if ("dimension" in p && p.dimension === undefined) {
            return { ...p, dimension: "column" };
          }
          return p;
        }),
    };
    this.upsert(v);
  }

  /**
   * Logs the state of a Linked List variable.
   * Uses `asList` to format the data and `upsert` to add/update it.
   * @param name - The name of the variable.
   * @param node - The head node of the linked list.
   * @param highlight - Optional array of node highlights.
   */
  public list(
    name: string,
    node?: ListNode | null,
    highlight?: NodeHighlight[]
  ) {
    // Filter out highlights where the node is null or undefined
    const filteredHighlight = highlight?.filter((h) => h.node != null);
    const variable = asList(name, node, filteredHighlight);
    this.upsert(variable);
  }

  /**
   * Logs the state of a 2-dimensional array (matrix) variable.
   * Uses `as2dArray` to format the data and `upsert` to add/update it.
   * @param name - The name of the variable.
   * @param values - The 2D array elements.
   * @param pointer1 - Optional 2D coordinate for the first pointer.
   * @param pointer2 - Optional 2D coordinate for the second pointer.
   * @param pointer3 - Optional 2D coordinate for the third pointer.
   * @deprecated use .grid instead
   */
  public array2d(
    name: string,
    values: any[][],
    pointer1?: Pointer2D,
    pointer2?: Pointer2D,
    pointer3?: Pointer2D
  ) {
    const variable = as2dArray(
      name,
      values,
      [pointer1, pointer2, pointer3].filter((x) => !!x)
    );
    this.upsert(variable);
  }

  public grid(name: string, values: any[][], ...pointers: Pointer2D[]) {
    const variable = as2dArray(
      name,
      values,
      pointers.filter((x) => !!x)
    );
    this.upsert(variable);
  }

  /**
   * Logs the state of a group of related simple values (e.g., counters, flags).
   * Uses `asValueGroup` to format the data and `upsert` to add/update it.
   * Requires group options (like min/max) to be set beforehand or passed directly.
   * @param name - The name of the value group.
   * @param values - A record of key-value pairs representing the group members.
   * @param options - Optional configuration (min, max, reverse display). Uses stored options if not provided.
   */
  public group(
    name: string,
    values: Record<string, any>,
    options?: { min?: number; max?: number; reverse?: any }
  ) {
    const o = options ?? this.groupOptions.get(name);
    if (!o) {
      console.error("no options for this group: " + name);
      throw new Error("no options for this group: " + name);
    }

    const variable = asValueGroup(name, values, o as any);
    this.upsert(variable);
  }

  /**
   * Logs the state of an array of intervals.
   * Uses `asIntervals` to format the data and `upsert` to add/update it.
   * @param label - The name of the variable.
   * @param arr - The array of intervals (each interval is typically [start, end]).
   * @param highlight - Optional array of indices to highlight.
   * @param min - The minimum value for the visualization range.
   * @param max - The maximum value for the visualization range.
   * @deprecated use intervalsV2
   */
  public intervals(
    label: string,
    arr: number[][],
    highlight: number[],
    min: number,
    max: number
  ) {
    const variable = asIntervals(label, arr, highlight, min, max);
    this.upsert(variable);
  }

  /**
   * Logs the state of an array of labeled intervals.
   * Uses `asLabeledIntervals` to format the data and `upsert` to add/update it.
   * @param label - The name of the variable.
   * @param highlight - Optional array of indices to highlight.
   * @param min - The minimum value for the visualization range.
   * @param max - The maximum value for the visualization range.
   */
  public intervalsV2(p: {
    label: string;
    arr: LabeledInterval[];
    highlight: number[];
    min: number;
    max: number;
  }) {
    const { label, arr, highlight, min, max } = p;
    const variable = asLabeledIntervals(label, arr, highlight, min, max);
    this.upsert(variable);
  }

  /**
   * Marks a variable as hidden in the current state.
   * This finds the variable with the given name (label) in the `variables` array
   * and sets its `hide` property to true. The variable will not be displayed
   * in the visualization for any subsequent steps captured after this call,
   * unless it is explicitly logged again (which would reset the hide flag via upsert).
   * @param name - The label of the variable to hide.
   */
  public hide(name: string) {
    // Find the variable in the current list of variables by its label.
    const variable = this?.variables.find((v) => v.label === name);
    // If the variable is found, set its 'hide' property to true.
    if (variable) {
      variable.hide = true;
    }
  }

  /**
   * Logs one or more simple key-value pair variables.
   * Uses `asSimpleValue` to format the data and iterates, calling `upsert` for each pair.
   * @param value - A record where keys are variable names and values are their simple values (string, number, boolean).
   */
  public simple(value: Record<string, any>) {
    const variables = asSimpleValue(value);
    variables.forEach((variable: Variable) => this.upsert(variable));
  }

  /**
   * Logs the state of a HashSet variable.
   * Uses `asHashset` to format the data and `upsert` to add/update it.
   * @param label - The name of the variable.
   * @param set - The Set object.
   * @param highlight - Optional highlighting information for the hash set.
   */
  public hashset(label: string, set: Set<any>, highlight: HashHighlight) {
    const variable = asHashset(label, set, highlight);
    this.upsert(variable);
  }

  /**
   * Logs the state of a HashMap (Map) variable.
   * Uses `asHashmap` to format the data and `upsert` to add/update it.
   * @param label - The name of the variable.
   * @param map - The Map object.
   * @param highlight - Optional highlighting information for the hash map.
   */
  public hashmap(label: string, map: Map<any, any>, highlight?: HashHighlight) {
    const variable = asHashmap(label, map, highlight ? [highlight] : undefined);
    this.upsert(variable);
  }

  /**
   * Logs the state of a HashMap (Map) variable with custom key and value labels and multiple highlights.
   * Accepts an options object for easier extension.
   * @param options - An object containing the hashmap details.
   * @param options.label - The name of the variable.
   * @param options.map - The Map object.
   * @param options.highlights - Optional array of highlighting information for the hash map.
   * @param options.keyLabel - Optional custom label for the key column.
   * @param options.valueLabel - Optional custom label for the value column.
   */
  public hashmapV2(options: {
    label: string;
    map: Map<any, any>;
    highlights?: HashHighlight[];
    keyLabel?: string;
    valueLabel?: string;
  }) {
    const { label, map, highlights } = options;
    const storedOptions = this.hashmapOptions.get(label);
    const finalKeyLabel = options.keyLabel ?? storedOptions?.keyLabel;
    const finalValueLabel = options.valueLabel ?? storedOptions?.valueLabel;

    const variable = {
      ...asHashmap(label, map), // asHashmap no longer handles highlights
      highlights,
      keyLabel: finalKeyLabel,
      valueLabel: finalValueLabel,
    };
    this.upsert(variable);
  }

  /**
   * Stores metadata associated with a variable name (label).
   * This metadata can include display preferences, type hints, or other
   * information relevant to the visualization or processing of the variable's state,
   * though it's not directly part of the core variable value logged in steps.
   * The metadata is stored in an internal map keyed by the variable name.
   * @param name - The label of the variable to associate the metadata with.
   * @param metadata - The metadata object to store.
   */
  public setMeta(name: string, metadata: VariableMetadata) {
    // Add or update the metadata entry for the given variable name in the internal map.
    this.metadata.set(name, metadata);
  }

  /**
   * Retrieves the complete history of captured algorithm states.
   * Each element in the returned array is a `ProblemState` snapshot,
   * representing the state of all tracked variables at a specific breakpoint
   * recorded during the execution via calls to `breakpoint()`.
   * @returns An array of `ProblemState` objects.
   */
  public getSteps(): ProblemState[] {
    return this.steps;
  }

  public getIntervalBounds(intervals: number[][]) {
    return getIntervalBounds(intervals);
  }
}
