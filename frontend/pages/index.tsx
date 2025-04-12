// pages/index.tsx
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import ProblemVisualizer from "../frontend/components/ProblemVisualizer";
import { getRandomProblem } from "../backend/problem/core/utils";

const Home: NextPage = () => {
  const [randomProblem, setRandomProblem] = useState(null);

  useEffect(() => {
    setRandomProblem(getRandomProblem());
  }, []);

  return (
    <div className="flex-grow flex w-full ">
      

      <main className="lg:mx-12 w-full mx-auto">
       <div className="w-full lg:pt-10">
        {randomProblem ? <ProblemVisualizer problem={randomProblem} /> : null}</div>
      </main>
    </div>
  );
};

export default Home;
