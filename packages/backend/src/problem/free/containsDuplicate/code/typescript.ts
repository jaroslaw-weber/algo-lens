// Add the core algorithm function here (if not already present)
export function containsDuplicateAlgorithm(nums: number[]): boolean {
  // Create a hash set to store unique numbers
  const seenSet = new Set<number>();

  //#1 Initialize seen set. Start loop.
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    //#2 Inside loop. Get current number nums[i].
    //#3 Check if the current number is already in the seen set.
    if (seenSet.has(num)) {
      //#4 Duplicate found. Return true.
      return true;
    } else {
      //#5 Number not seen before. Add it to the seen set.
      seenSet.add(num);
    }
     //#6 End of loop iteration. Continue loop.
  }

  //#7 Loop finished. No duplicates found. Return false.
  return false;
}


// Update the exported code string to match the algorithm with breakpoints
export const code = `function containsDuplicate(nums: number[]): boolean {
  const seenSet = new Set<number>();

  //#1 Initialize seen set. Start loop.
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    //#2 Inside loop. Get current number nums[i].

    //#3 Check if the current number is already in the seen set.
    if (seenSet.has(num)) {
      //#4 Duplicate found. Return true.
      return true;
    } else {
      //#5 Number not seen before. Add it to the seen set.
      seenSet.add(num);
    }
    //#6 End of loop iteration. Continue loop.
  }

  //#7 Loop finished. No duplicates found. Return false.
  return false;
}`;
