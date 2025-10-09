import React from "react";
import type { HashsetVariable, Pointer } from "@algolens/core/src/types";

const DisplayHashset = ({ data }: { data: HashsetVariable }) => {
  const { value, label, highlight } = data;
  //console.log("hightlight", highlight, value)

  const arr: (string | number)[] =
    value instanceof Set ? Array.from(value) : (value as []);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Hashset</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((item, index) => {
            const hasHighlight =
              highlight?.key !== undefined && highlight.key == item;
            console.log("has highlight", hasHighlight, highlight, item);
            return (
              <tr
                key={index}
                className={
                  hasHighlight
                    ? `bg-${highlight.color} text-${highlight.color}-content`
                    : ""
                }
              >
                <td>
                  {item}
                  {hasHighlight && highlight.label && (
                    <span className="ml-2 badge badge-sm">
                      {highlight.label}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayHashset;
