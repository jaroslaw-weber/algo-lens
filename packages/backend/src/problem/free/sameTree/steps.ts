import {
  HighlightColor,
  ProblemState,
  BinaryTreeNode,
  Variable,
} from "algo-lens-core";
import { asBooleanGroup, asTree } from "../../core/utils"; // Import utility functions
import { SameTreeInput } from "./types"; // Import the input type
import { isSameTree } from "./code/typescript"; // Import the core logic function

// The main function that generates the steps for the visualization
export function sameTree(
  p: BinaryTreeNode | null,
  q: BinaryTreeNode | null
): ProblemState[] {
  const steps: ProblemState[] = [];

  // Log function to capture state at each breakpoint
  function log(
    point: number,
    pNode: BinaryTreeNode | null,
    qNode: BinaryTreeNode | null,
    result?: boolean
  ) {
    let color: HighlightColor = "neutral";
    if (result === true) {
      color = "good";
    }
    if (result === false) {
      color = "bad";
    }
    const variables: Variable[] = [
      asTree("pTree", p, [{ node: pNode, color }]), // Use asTree from core/utils
      asTree("qTree", q, [{ node: qNode, color }]), // Use asTree from core/utils
    ];
    if (result !== undefined) {
      variables.push(asBooleanGroup("is node same?", { return: result })); // Use asBooleanGroup
    }
    steps.push({ variables, breakpoint: point });
  }

  // Call the core logic function, passing the log function for step recording
  const result = isSameTree(p, q, log); // Pass log function to isSameTree

  // Create the result variable
  const resultVariable: Variable = {
    label: "result",
    type: "boolean",
    value: result,
  };

  // Add the result variable to the last step or create a new step
  if (steps.length > 0) {
    steps[steps.length - 1].variables.push(resultVariable);
  } else {
    // If steps is empty (e.g., both trees are initially null), create a new step
    steps.push({ variables: [resultVariable], breakpoint: 0 }); // Use breakpoint 0 or decide on a suitable value
  }

  return steps;
}
