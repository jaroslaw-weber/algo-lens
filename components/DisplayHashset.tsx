import React from "react";
import { HashsetVariable, Pointer } from "../backend/problem/core/types";

const DisplayHashset = ({ data }: { data: HashsetVariable }) => {
  const { value, label, highlight } = data;

  return (
    <div className="overflow-x-auto">
      {label && <h3 className="pl-2 pb-2 text-xl font-semibold">{label}</h3>}
      <table className="table w-full">
        <thead>
          <tr>
            <th>Hashset Values</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(value).map((item, index) => (
            <tr
              key={index}
              className={
                highlight.value === item ? `bg-${highlight.color} text-${highlight.color}-content` : ""
              }
            >
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayHashset;
