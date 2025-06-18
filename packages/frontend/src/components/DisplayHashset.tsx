import React from "react";
import type { HashsetVariable, Pointer } from "algo-lens-core/src/types";


const DisplayHashset = ({ data }: { data: HashsetVariable }) => {
  const { value, label, highlight } = data;
  //console.log("hightlight", highlight, value)

  const arr:(string|number)[] = value as [];

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
            const hasPointer =  highlight?.value == item
            console.log("has pointer", hasPointer)
            return <tr
              key={index}
              className={
                hasPointer
                  ? `bg-${highlight.color} text-${highlight.color}-content`
                  : ""
              }
            >
              <td>{item}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayHashset;
