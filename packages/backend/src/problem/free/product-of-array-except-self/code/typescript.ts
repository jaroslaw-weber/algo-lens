// Calculates the product of all elements in the array except for the element at the current index.
export function productExceptSelf(nums: number[]): number[] {
  const length = nums.length;
  // The final output array.
  const output = new Array(length).fill(1);
  // productsLeft[i] will store the product of all elements to the left of index i.
  const productsLeft = new Array(length).fill(1);
  // productsRight[i] will store the product of all elements to the right of index i.
  const productsRight = new Array(length).fill(1);

  //#1 Calculate products to the left of each element
  // Start from the second element (index 1).
  for (let i = 1; i < length; i++) {
    // Product to the left of i is the product to the left of (i-1) multiplied by the element at (i-1).
    productsLeft[i] = productsLeft[i - 1] * nums[i - 1];
    //#2 Updated productsLeft[i]
  }

  //#3 Calculate products to the right of each element
  // Start from the second to last element (index length - 2).
  for (let i = length - 2; i >= 0; i--) {
    // Product to the right of i is the product to the right of (i+1) multiplied by the element at (i+1).
    productsRight[i] = productsRight[i + 1] * nums[i + 1];
    //#4 Updated productsRight[i]
  }

  // Calculate the final output array.
  for (let i = 0; i < length; i++) {
    // The product except self at index i is the product of elements to the left * product of elements to the right.
    output[i] = productsLeft[i] * productsRight[i];
    //#5 Calculated output[i]
  }

  //#6 Return the final output array
  return output;
}
