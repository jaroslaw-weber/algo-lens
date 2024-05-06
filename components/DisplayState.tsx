import React from "react";
import DisplayArray from "./DisplayArray";
import DisplayNumber from "./DisplayNumber"; // Make sure to import the new component

const DisplayState = ({ state }) => {
  return Object.entries(state).map(([key, value]) => {
    if (Array.isArray(value)) {
      return <DisplayArray key={key} array={value} title={key} />;
    } else if (typeof value === "object" && value !== null) {
      return <DisplayState key={key} state={value} />;
    } else if (typeof value === "number") {
      // Check if the value is a number and use the DisplayNumber component
      return <DisplayNumber key={key} number={value} title={key} />;
    } else {
      // Handle other types of values as before
      return (
        <p key={key} className="font-mono text-sm">{`${key}: ${value}`}</p>
      );
    }
  });
};

export default DisplayState;
