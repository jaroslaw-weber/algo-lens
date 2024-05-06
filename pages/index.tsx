// pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import ClimbingStairs from "../components/problems/ClimbingStairs";
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [code, setCode] = useState("// Type your TypeScript code here");
  const [output, setOutput] = useState("");

  const handleEditorChange = (value: string | undefined) => {
    setCode(value ?? "");
  };

  const runCode = () => {
    // This should send the code to an API or use a TypeScript interpreter in the browser
    // Placeholder functionality
    setOutput("Running the code...\n" + code);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>TypeScript Code Visualizer</title>
        <meta
          name="description"
          content="Visualize TypeScript code execution"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>TypeScript Code Visualizer</h1>

        <ClimbingStairs />
      </main>
    </div>
  );
};

export default Home;
