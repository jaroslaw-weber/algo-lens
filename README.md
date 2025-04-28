# algo-vision
Easily visualize and practice Data Structures and Algorithms (DSA). Starting with dynamic programming, we also support bit manipulation, binary search, and more.

## Huge refactor in progress

Some things may not work when running it on local env so please use the Quick Start (go to https://algolens.dev/).

## Quick start

Just go to https://algolens.dev/ to start using it!

## Project Structure

This repository uses a monorepo structure managed by npm workspaces:

- `packages/frontend`: The main web application built with Astro.
- `packages/backend`: The Node.js backend API.
- `packages/landing-page`: The simple landing page built with Astro.
- `packages/algo-lens-core`: Core logic shared between packages (potential future use).

## How to run on local

1.  **Environment Setup:**
    - Add a `.env` file in the `packages/frontend/` folder with the following content:
      ```
      BACKEND_URL="http://localhost:4005"
      ```

2.  **Install Dependencies:**
    - Run `bun i` in the root directory. This will install dependencies for all workspaces.

3.  **Run Development Servers:**
    - Run the following command in the root directory:
      ```
      bun run dev
      ```
    - This command uses `concurrently` to start the development servers for the frontend, backend, and landing page simultaneously.

4.  **Access the applications:**
    - Frontend application: Typically runs on `http://localhost:4321` (check console output).
    - Backend API: Typically runs on `http://localhost:30004005` (check console output).
    - Landing page: Typically runs on a different port (check console output, often `http://localhost:4322`).

## What’s Inside
- **Dynamic Programming**: See step-by-step visualizations to understand how solutions are built.
- **Bit Manipulation and Binary Search**: Visualize and practice these techniques.
- **Interactive Tools**: Experiment with algorithms to learn how they work.
- **More to Come**: New algorithms are added regularly.

## Blind 75 Problems

### Array
- [x] Two Sum
- [x] Best Time to Buy and Sell Stock
- [ ] Contains Duplicate
- [x] Product of Array Except Self
- [x] Maximum Subarray
- [ ] Maximum Product Subarray
- [ ] Find Minimum in Rotated Sorted Array
- [ ] Search in Rotated Sorted Array
- [ ] 3 Sum
- [x] Container With Most Water

### Binary
- [x] Sum of Two Integers
- [x] Number of 1 Bits
- [x] Counting Bits
- [x] Missing Number
- [ ] Reverse Bits

### Dynamic Programming
- [x] Climbing Stairs
- [x] Coin Change
- [ ] Longest Increasing Subsequence
- [ ] Longest Common Subsequence
- [x] Word Break Problem
- [ ] Combination Sum
- [x] House Robber
- [ ] House Robber II
- [ ] Decode Ways
- [x] Unique Paths
- [ ] Jump Game

### Graph
- [ ] Clone Graph
- [ ] Course Schedule
- [ ] Pacific Atlantic Water Flow
- [x] Number of Islands
- [ ] Longest Consecutive Sequence
- [ ] Alien Dictionary (Leetcode Premium)
- [ ] Graph Valid Tree (Leetcode Premium)
- [ ] Number of Connected Components in an Undirected Graph (Leetcode Premium)

### Interval
- [ ] Insert Interval
- [x] Merge Intervals
- [x] Non-overlapping Intervals
- [ ] Meeting Rooms (Leetcode Premium)
- [ ] Meeting Rooms II (Leetcode Premium)

### Linked List
- [x] Reverse a Linked List
- [ ] Detect Cycle in a Linked List
- [ ] Merge Two Sorted Lists
- [ ] Merge K Sorted Lists
- [ ] Remove Nth Node From End Of List
- [ ] Reorder List

### Matrix
- [x] Set Matrix Zeroes
- [ ] Spiral Matrix
- [ ] Rotate Image
- [ ] Word Search

### String
- [ ] Longest Substring Without Repeating Characters
- [ ] Longest Repeating Character Replacement
- [ ] Minimum Window Substring
- [ ] Valid Anagram
- [ ] Group Anagrams
- [ ] Valid Parentheses
- [ ] Valid Palindrome
- [ ] Longest Palindromic Substring
- [ ] Palindromic Substrings
- [ ] Encode and Decode Strings (Leetcode Premium)

### Tree
- [ ] Maximum Depth of Binary Tree
- [x] Same Tree
- [ ] Invert/Flip Binary Tree
- [ ] Binary Tree Maximum Path Sum
- [ ] Binary Tree Level Order Traversal
- [ ] Serialize and Deserialize Binary Tree
- [ ] Subtree of Another Tree
- [ ] Construct Binary Tree from Preorder and Inorder Traversal
- [ ] Validate Binary Search Tree
- [ ] Kth Smallest Element in a BST
- [ ] Lowest Common Ancestor of BST
- [ ] Implement Trie (Prefix Tree)
- [ ] Add and Search Word
- [ ] Word Search II

### Heap
- [ ] Merge K Sorted Lists
- [ ] Top K Frequent Elements
- [ ] Find Median from Data Stream


## Preview

https://github.com/jaroslaw-weber/algo-lens/assets/9774233/c4e639e5-ebf0-4a46-84fc-0bfbe9698cad


https://github.com/jaroslaw-weber/algo-lens/assets/9774233/cf24f697-dc33-42ed-a768-50002247c346


https://github.com/jaroslaw-weber/algo-lens/assets/9774233/94f5b974-b3f6-498b-a781-b90c09225dc7


## Screenshots

![Screenshot (11)](https://github.com/jaroslaw-weber/algo-lens/assets/9774233/d26c35cc-0353-44e4-89b2-9208daed4ef0)
