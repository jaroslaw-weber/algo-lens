// pages/problems/index.tsx
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { problems } from "../src/problem/list";

const Problems: NextPage = () => {
  return (
    <div>
      <Head>
        <title>List of Problems</title>
        <meta name="description" content="Browse through a list of all available problems" />
      </Head>

      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-primary">
        <h1 className="text-2xl font-bold">Problems</h1>
        <ul>
          {problems.map((problem, index) => (
            <li key={index}>
              <Link href={`/problem/${problem.id}`} className="link">
           {problem.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Problems;
