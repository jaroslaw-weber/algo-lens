export default function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  //#1 Start the loop to find the maximum area
  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;

    //#2 Check if the current area is greater than the maximum area
    if (area > maxArea) {
      //#3 Update the maximum area
      maxArea = area;
    }

    // Move the pointer with the shorter height to the center
    if (height[left] < height[right]) {
      left++;
      //#4 Move the pointer with the shorter height to the center
    } else {
      right--;
      //#5 Move the pointer with the shorter height to the center
    }
  }

  //#6 Return the maximum area
  return maxArea;
}
