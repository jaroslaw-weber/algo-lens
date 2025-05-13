import React from "react";
import type { HashmapVariable, Pointer } from "algo-lens-core";

const DisplayHashmap = ({ data }: { data: HashmapVariable }) => {
  const { value, label, highlight } = data;
  if (!value) {
    throw new Error("No data provided for the hashmap display");
  }

  //get entries from value
  const entries = Object.entries(value);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(entries).map(([key, val], index) => (
            <tr
              key={index}
              className={
                highlight?.value === key
                  ? `bg-${highlight.color} text-${highlight.color}-content`
                  : ""
              }
            >
              <td>{key}</td>
              <td>
                {Array.isArray(val) ? `[${val.join(', ')}]` : val}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayHashmap;
