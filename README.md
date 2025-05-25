# algolens

Easily visualize and practice Data Structures and Algorithms (DSA). AlgoLens currently supports dynamic programming, bit manipulation, binary search, and more, with interactive visualizations to help you understand how algorithms work step-by-step.

**Note:** We are currently undergoing a significant refactor to improve the project's architecture and pave the way for exciting new features. While this is in progress, setting up and running the project locally might be unstable. For the best experience, please use the official website:

**👉 Quick Start: [https://algolens.dev/](https://algolens.dev/)**

## Project Structure

This repository uses a monorepo structure managed by npm workspaces:

- `packages/frontend`: The main web application built with Astro.
- `packages/backend`: The Node.js backend API.
- `packages/landing-page`: The simple landing page built with Astro.
- `packages/algo-lens-core`: Core logic shared across the monorepo (e.g., types, utilities), currently used by the frontend.

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
      npm run dev
      ```
    - This command uses `concurrently` to start the development servers for the frontend, backend, and landing page simultaneously.

4.  **Access the applications:**
    - Frontend: `http://localhost:4321`
    - Backend API: `http://localhost:4005`
    - Landing page: `http://localhost:4322`

## Progress Tracker

See our progress on implementing popular DSA problems (like the Blind 75 list) in [PROGRESS.md](PROGRESS.md).

## Preview



https://github.com/user-attachments/assets/3e116275-0c40-4bb5-8a98-33ce40696248



## Adding New Problem Guidelines

If you're interested in contributing new problems to AlgoLens, please refer to the [New Problem Guidelines](packages/backend/src/problem/NEW_PROBLEM_GUIDELINES.md) for instructions on file structure, comment guidelines, and more.
