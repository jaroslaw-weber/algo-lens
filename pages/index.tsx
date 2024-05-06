// pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import ProblemVisualizer from "../components/ProblemVisualizer";
import { getRandomProblem } from "../problems/_list";
const Home: NextPage = () => {

  const randomProblem = getRandomProblem();
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

      <main className="w-full min-h-screen flex flex-col bg-blue-200 items-center justify-center">
       

        <ProblemVisualizer problem={randomProblem} />
      </main>
    </div>
  );
};

export default Home;
