export function threeSum(nums: number[]): number[][] {
  //#1
  const target = 0;
  nums.sort((a, b) => a - b); // Sort the array
  const seen = new Set(); // To track unique triplets
  const result = [];
  //#2
  for (let i = 0; i < nums.length - 2; i++) {
    //#3
    if (i > 0 && nums[i] === nums[i - 1]) {
      //#4
      continue; // Skip duplicate 'i' elements
    }
    let left = i + 1;
    let right = nums.length - 1;
    //#5
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      //#6
      if (sum === target) {
        const triplet = [nums[i], nums[left], nums[right]];
        const tripletKey = triplet.join(",");
        //#7
        if (!seen.has(tripletKey)) {
          seen.add(tripletKey);
          result.push(triplet); // Add unique triplet to the result
          //#8
        }
        while (left < right && nums[left] === nums[left + 1]) {
          left++; // Skip duplicate 'left' elements

          //#9
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--;

          //#10
        } // Skip duplicate 'right' elements
        //#11
        left++;
        right--;
        //#12
      } else if (sum < target) {
        left++; // Need more positive to reach zero
        //#13
      } else {
        right--; // Need more negative to reach zero
        //#14
      }
    }
    //#14.5
  }
  //#15
  return result;
}
