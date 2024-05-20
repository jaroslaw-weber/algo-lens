import React from "react";
import { HashsetVariable, Pointer } from "../src/problem/types";

const DisplayHashset = ({ data }: { data: HashsetVariable }) => {
  const { value: hashset, label: title, pointers } = data;

  return (
    <div className="overflow-x-auto">
      {title && <h3 className="pl-2 pb-2 text-xl font-semibold">{title}</h3>}
      <ul className="list-none mb-0">
        {hashset.value.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayHashset;
