

// pages/problems/index.tsx
import Head from "next/head";
import { allProblems } from "../../src/problem/list";
import { NextPage } from "next";
import ProblemsList from "../../components/ProblemList";

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

      <main className="container mx-auto p-4 justify-center flex flex-col items-center">
        <h1 className="text-3xl text-center mb-6 mt-6 font-display">
          Problems
        </h1>

        <ProblemsList groups={allProblems} />
      </main>
    </div>
  );
};

export default Problems;

