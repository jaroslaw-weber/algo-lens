export function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  //#1 Start the loop to find the target number in the rotated array
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    //#2 Check if the middle element is the target
    if (nums[mid] === target) {
      //#3 If the middle element is the target, return its index
      return mid;
    }

    //#4 Check if the left half is sorted
    if (nums[left] <= nums[mid]) {
      //#5 If the target is in the left half, move the right pointer
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        //#6 If the target is not in the left half, move the left pointer
        left = mid + 1;
      }
    } else {
      //#7 Check if the right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        //#8 If the target is in the right half, move the left pointer
        left = mid + 1;
      } else {
        //#9 If the target is not in the right half, move the right pointer
        right = mid - 1;
      }
    }
  }

  //#10 If the target is not found, return -1
  return -1;
}
