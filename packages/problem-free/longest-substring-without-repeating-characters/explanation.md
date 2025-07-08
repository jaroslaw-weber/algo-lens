## Approach

We use the sliding window technique with a set to find the length of the longest substring without repeating characters. We maintain a window defined by two pointers, `left` and `right`. The `right` pointer expands the window, and the `left` pointer contracts it when a repeating character is encountered.

1.  **Initialization:** Initialize `left = 0`, `right = 0`, `maxLength = 0`, and an empty set `charSet` to store characters in the current window.
2.  **Sliding Window:** Iterate with the `right` pointer from the beginning of the string.
3.  **Check for Duplicates:** If the character at `right` is not in `charSet`, add it to the set, update `maxLength` with the current window size (`right - left + 1`), and move `right` forward.
4.  **Handle Duplicates:** If the character at `right` is already in `charSet`, it means we have a repeating character. Remove the character at `left` from `charSet` and move `left` forward until the repeating character is no longer in the window. Then, add the character at `right` to the set and move `right` forward.
5.  **Result:** After iterating through the entire string, `maxLength` will hold the length of the longest substring without repeating characters.

## Data Structures

-   Set: Used to efficiently check for the presence of characters within the current window.

## Complexity

-   Time: O(N), where N is the length of the string. Although there is a nested loop in the worst case (e.g., "abcabcbb"), each character is visited by both `left` and `right` pointers at most twice.
-   Space: O(min(N, A)), where N is the length of the string and A is the size of the character set (e.g., 26 for lowercase English letters). In the worst case, if all characters are unique, the set will store N characters.
