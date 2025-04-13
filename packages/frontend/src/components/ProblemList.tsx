import { useAtom } from "jotai";
import { problemsAtom } from "../atom";
import { useEffect } from "react";
import { getProblemList } from "../api";

function ProblemsList() {
  const [problems, setProblems] = useAtom(problemsAtom);

  async function init() {
    console.log(
  "init problem list"
    )
    const ps = await getProblemList();
    console.log("init problem list done", ps)
    setProblems(ps);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {problems.map((p) => {
        const { id, title } = p;

        return (
          <div key={id} className="flex items-center gap-2">
            <a href={`/problem/visualize?id=${id}`}>{title}</a>
          </div>
        );
      })}
    </div>
  );
}

export default ProblemsList;
