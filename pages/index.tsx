// pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import ProblemVisualizer from "../components/ProblemVisualizer";
import { getRandomProblem } from "../src/problem/service";

const Home: NextPage = () => {
  const [randomProblem, setRandomProblem] = useState(null);

  useEffect(() => {
    setRandomProblem(getRandomProblem());
  }, []);
  return (
    <div className="">
      <Head>
        <title>TypeScript Code Visualizer</title>
        <meta
          name="description"
          content="Visualize TypeScript code execution"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-screen flex flex-col bg-primary items-center justify-center">
       
{randomProblem ? <ProblemVisualizer problem={randomProblem} /> : null}
      </main>
    </div>
  );
};

export default Home;
