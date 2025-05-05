export default function containsDuplicate(nums: number[]): boolean {
  // Create a hash set to store unique numbers
  const hashSet = new Set<number>();

  // Iterate through the input array
  for (let i = 0; i < nums.length; i++) {
    // Check if the current number is already in the hash set
    if (hashSet.has(nums[i])) {
      // If the number exists, return true indicating a duplicate
      return true;
    } else {
      // Add the number to the hash set
      hashSet.add(nums[i]);
    }
  }

  // If no duplicates are found, return false
  return false;
}
