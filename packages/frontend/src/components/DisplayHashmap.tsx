import React from "react";
import type { HashmapVariable, Pointer } from "algo-lens-core";

const DisplayHashmap = ({ data }: { data: HashmapVariable }) => {
  const { value, label, highlights, keyLabel, valueLabel } = data;
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
            <th>{keyLabel || "Key"}</th>
            <th>{valueLabel || "Value"}</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(entries).map(([key, val], index) => {
            const matchingHighlight = highlights?.find((h) => {
              return (
                (h.key !== undefined && h.key == key) ||
                (h.value !== undefined && h.value == val)
              );
            });
            return (
              <tr
                key={index}
                className={
                  matchingHighlight
                    ? `bg-${matchingHighlight.color} text-${matchingHighlight.color}-content`
                    : ""
                }
              >
                <td>
                  {key}
                  {matchingHighlight?.label && (
                    <span className="ml-2 badge badge-sm">
                      {matchingHighlight.label}
                    </span>
                  )}
                </td>
                <td>{Array.isArray(val) ? `[${val.join(", ")}]` : val}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayHashmap;
