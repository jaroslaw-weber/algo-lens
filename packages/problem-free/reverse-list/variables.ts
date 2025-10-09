import { VariableMetadata } from "@algolens/core/src/types";

// ListNode type is not directly used in VariableMetadata definition,
// but might be relevant elsewhere in the problem setup.

export const variables: VariableMetadata[] = [
  {
    name: "head", // Use 'name' instead of 'label'
    description: "The head node of the input linked list.", // Added description
    emoji: "➡️", // Added placeholder emoji
  },
  {
    name: "result", // Use 'name' instead of 'label'
    description: "The head node of the reversed linked list.", // Added description
    emoji: "↩️", // Added placeholder emoji (matches problem emoji)
  },
];
