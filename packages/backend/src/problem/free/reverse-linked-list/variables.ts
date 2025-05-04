import { defineVariable } from "@problem/types/variable"; // Assuming this path is correct based on previous tasks

// Variables used in the Reverse Linked List algorithm visualization
export const variables = {
  head: defineVariable({
    label: "head",
    description: "Input linked list head ➡️",
    // Assuming a 'linked_list_node' type exists or can be represented
    type: "linked_list_node",
    role: "input",
  }),
  prev: defineVariable({
    label: "prev",
    description: "Previous node pointer (initially null) ⏪",
    type: "linked_list_node", // Or potentially a nullable type if supported
    role: "local",
    defaultValue: null, // Indicate initial value
  }),
  current: defineVariable({
    label: "current",
    description: "Current node pointer (iterates through list) 📍",
    type: "linked_list_node",
    role: "local",
  }),
  next: defineVariable({
    label: "next",
    description: "Temporary next node pointer ➡️",
    type: "linked_list_node", // Or potentially nullable
    role: "local",
  }),
  result: defineVariable({
    label: "result",
    description: "Head of the reversed list (output) ✅",
    type: "linked_list_node",
    role: "output",
  }),
};
