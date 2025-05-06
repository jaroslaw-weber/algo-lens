import React from "react";
import type { HashsetVariable, Pointer } from "algo-lens-core";

const DisplayHashset = ({ data }: { data: HashsetVariable }) => {
  const { value, label, highlight } = data;

  const arr = value as [];

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
          {arr.map((item, index) => (
            <tr
              key={index}
              className={
                highlight.value === item
                  ? `bg-${highlight.color} text-${highlight.color}-content`
                  : ""
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
