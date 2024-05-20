// pages/blind75/index.tsx
import Head from "next/head";
import { blind75 } from "../src/problem/list"; // Adjust the import path as needed
import { NextPage } from "next";
import ProblemsList from "../components/ProblemList";

const Blind75: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Blind 75 Problems</title>
        <meta
          name="description"
          content="Browse through a curated list of 75 essential coding interview problems"
        />
      </Head>

      <main className="container mx-auto p-4 justify-center flex flex-col items-center">
        <h1 className="text-3xl text-center mb-6 mt-6 font-display">
          Blind 75 Problems
        </h1>

        <ProblemsList problems={blind75} />
      </main>
    </div>
  );
};

export default Blind75;
