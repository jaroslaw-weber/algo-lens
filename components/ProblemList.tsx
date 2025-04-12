import Link from "next/link";
import { ProblemGroup } from "../backend/problem/core/types";

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
  groups: ProblemGroup[];
};

const ProblemsList: React.FC<ProblemsListProps> = ({ groups }) => {
  console.log("groups: ", groups);
  return (
    <div className="max-w-lg mx-auto">
      <div className="p-4">
        {groups.map((group, index) => (
          <div key={index} className="pb-4">
            <p className="font-display">{group.label}</p>
            <ul className="list-decimal list-inside" key={index}>
              {group.problems.map((problem) => (
                <li key={problem.id} className="py-2">
                  <Link href={`/problem/${problem.id}`}>{problem.title}</Link>
                  {problem.tested && (
                    <i
                      className="fas fa-check ml-2 text-success"
                      aria-label="Tested"
                    ></i>
                  )}
                  {problem.tags &&
                    problem.tags.map((tag) => (
                      <span
                        className={`badge badge-${
                          tagColors[tag] || "default"
                        } ml-4 badge-sm text-${
                          tagColors[tag] || "default"
                        }-content opacity-60`}
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemsList;
