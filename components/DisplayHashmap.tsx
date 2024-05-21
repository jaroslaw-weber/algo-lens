import React from "react";
import { HashmapVariable, Pointer } from "../src/problem/types";

const DisplayHashmap = ({ data }: { data: HashmapVariable }) => {
  const { value, label, highlight } = data;

  return (
    <div className="overflow-x-auto">
      {label && <h3 className="pl-2 pb-2 text-xl font-semibold">{label}</h3>}
      <table className="table w-full">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(value.entries()).map(([key, val], index) => (
            <tr
              key={index}
              className={
                highlight.value === key ? `bg-${highlight.color} text-${highlight.color}-content` : ""
              }
            >
              <td>{key}</td>
              <td>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayHashmap;
