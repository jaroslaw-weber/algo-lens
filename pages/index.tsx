// pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import ProblemVisualizer from "../components/ProblemVisualizer";
import { getRandomProblem } from "../src/problem/utils";

const Home: NextPage = () => {
  const [randomProblem, setRandomProblem] = useState(null);

  useEffect(() => {
    setRandomProblem(getRandomProblem());
  }, []);

  return (
    <div className="flex-grow flex">
      <Head>
        <title>Algo-Lens: Algorithm Visualization Tool</title>
        <meta
          name="description"
          content="Explore and visualize the execution of algorithms with Algo-Lens. Gain insights into algorithm behavior and step-by-step code execution to enhance your understanding and debugging skills."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>

      <main className="">
        <p className="text-center font-display mt-8 flex-shrink">algo-lens: see algorithms in action! </p>
        <div className="w-full">
        {randomProblem ? <ProblemVisualizer problem={randomProblem} /> : null}</div>
      </main>
    </div>
  );
};

export default Home;
