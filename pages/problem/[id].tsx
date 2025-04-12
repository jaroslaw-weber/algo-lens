// pages/problem/[id].tsx
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import ProblemVisualizer from "../../components/ProblemVisualizer";
import { getProblemById } from "../../backend/problem/core/utils";

const ProblemPage = () => {
  const router = useRouter();
  const { query } = router;
  const id = query["id"];
  const [problem, setProblem] = useState(null);
  console.log("id", id);
  useEffect(() => {
	  const currProblem = getProblemById(id as string);
	  console.log("currProblem", currProblem);
    if (id) setProblem(currProblem);
  }, [id]);

  return (
    <div className="w-full ">
      <Head>
        <title>{problem?.title}</title>
      </Head>

      <main className="min-h-screen lg:flex   lg:mx-12 items-center justify-center">
        {problem ? <ProblemVisualizer problem={problem} /> : <p>Loading...</p>}
      </main>
    </div>
  );
};

export default ProblemPage;
