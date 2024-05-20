import Link from "next/link";
import { Problem, ProblemState } from "../src/problem/types";

// Define your tag colors here, as previously
const tagColors = {
  array: "accent",
  backtracking: "accent",
  "bit manipulation": "neutral",
  "dynamic programming": "secondary",
  "2d dynamic programming": "secondary",
  graph: "accent",
  greedy: "accent",
  hash: "neutral",
  math: "neutral",
  recursion: "neutral",
  searching: "neutral",
  string: "accent",
  tree: "accent",
  "union-find": "neutral",
  "two pointers": "accent",
};

type ProblemsListProps = {
  problems: Problem<any, ProblemState>[];
};
const ProblemsList: React.FC<ProblemsListProps> = ({ problems }) => {
  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4">
        <ul className="list-decimal list-inside">
          {problems.map((problem, index) => (
            <li key={index} className="py-2">
              <Link className="link link-hover" href={`/problem/${problem.id}`}>
                {problem.title}
              </Link>
              {problem.tested && (
                <i className="fas fa-check ml-2 text-content"></i> // Font Awesome icon for tested problems
              )}
              {problem.tags
                ? problem.tags.map((x) => (
                    <div
                      className={`badge badge-${tagColors[x]} ml-4 badge-sm text-${tagColors[x]}-content opacity-60`}
                      key={x}
                    >
                      {x}
                    </div>
                  ))
                : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProblemsList;
