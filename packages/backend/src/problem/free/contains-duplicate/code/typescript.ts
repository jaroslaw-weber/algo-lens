export  function containsDuplicate(nums: number[]): boolean {
  //Create a hash set to store unique numbers
  const hashSet = new Set<number>();

  //#1 Iterate through the input array
  for (let i = 0; i < nums.length; i++) {
    //#2 Check if the current number is already in the hash set
    if (hashSet.has(nums[i])) {
      //#3 If the number exists, return true indicating a duplicate
      return true;
    } else {
      //#4 Add the number to the hash set
      hashSet.add(nums[i]);
    }
  }

  //#5 If no duplicates are found, return false
  return false;
}
