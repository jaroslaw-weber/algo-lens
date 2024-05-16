// pages/problems/index.tsx
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { problems } from "../src/problem/list";

//accent -> important
//neutral -> only a bit important, depending on your goal
const tagColors = {
  array: "accent",
  backtracking: "accent",
  "bit manipulation": "neutral",
  "dynamic programming": "secondary",
  "2d dynamic programming": "secondary",
  graph: "accent",
  greedy: "accent",
  hash: "neutral",
  math: "neutral",
  recursion: "neutral",
  searching: "neutral",
  string: "accent",
  tree: "accent",
  "union-find": "neutral",
  "two pointers": "accent",
};

const Problems: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>List of Problems</title>
        <meta
          name="description"
          content="Browse through a list of all available problems"
        />
      </Head>

      <main className="container mx-auto p-4  justify-center flex flex-col items-center">
        <h1 className="text-3xl text-center mb-6 mt-6 font-display">
          Problems
        </h1>

        <div className="h-0 invisible">
          { /* hotfix for missing classes*/}
          <div className="badge badge-primary">primary</div>
          <div className="badge badge-secondary">secondary</div>
          <div className="badge badge-accent">accent</div>
        </div>
        <div className="max-w-lg mx-auto">
          <div className="p-4">
            <ul className="list-decimal list-inside">
              {problems.map((problem, index) => (
                <li key={index} className="py-2">
                  <Link
                    className="link link-hover"
                    href={`/problem/${problem.id}`}
                  >
                    {problem.title}
                  </Link>
                  {problem.tags
                    ? problem.tags.map((x) => (
                        <div
                          className={`badge badge-${tagColors[x]} ml-4 badge-sm text-${tagColors[x]}-content opacity-60`}
                          key={x}
                        >
                          {x}
                        </div>
                      ))
                    : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Problems;
