// Finds two numbers in the array that add up to the target sum.
export function twoSum(nums: number[], target: number): number[] {
  // Use a Map to store numbers encountered so far and their indices.
  const map = new Map<number, number>();
  //#1 Initialize map

  // Iterate through the input array.
  for (let i = 0; i < nums.length; i++) {
    //#2 Start loop iteration
    // Calculate the complement needed to reach the target.
    const complement = target - nums[i];
    //#3 Calculate complement

    // Check if the complement exists in the map.
    if (map.has(complement)) {
      // If complement exists, we found the pair.
      // Return the index of the complement (from the map) and the current index.
      //#4 Found complement in map
      return [map.get(complement)!, i];
    }
    //#5 Complement not found yet

    // If complement not found, add the current number and its index to the map.
    map.set(nums[i], i);
    //#6 Add current number and index to map
  }
  //#7 Loop finished

  // Return an empty array if no solution is found after checking all elements.
  //#8 No solution found
  return [];
}
