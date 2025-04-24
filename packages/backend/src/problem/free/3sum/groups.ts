interface VariableGroup {
  name: string;
  label: string;
  description: string;
}

export const groups: VariableGroup[] = [
  {
    name: "tripletInfo",
    label: "Triplet Info",
    description: "Details about the current triplet being examined and its sum.",
  },
  {
    name: "pointers",
    label: "Loop Pointers",
    description: "Indices used to iterate through the sorted array.",
  },
];
