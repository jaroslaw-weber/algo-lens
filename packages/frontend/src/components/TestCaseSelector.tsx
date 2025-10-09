import React from "react";
import { useAtom } from "jotai";
import type { TestCase } from "@algolens/core/src/types";

import type { PrimitiveAtom } from "jotai";

interface TestCaseSelectorProps {
  testcases: TestCase<any, any>[];
  selectedTestCaseNumberAtom: PrimitiveAtom<number>;
}

const TestCaseSelector: React.FC<TestCaseSelectorProps> = ({
  testcases,
  selectedTestCaseNumberAtom,
}) => {
  const [selectedTestCaseNumber, setSelectedTestCaseNumber] = useAtom(
    selectedTestCaseNumberAtom
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTestCaseNumber(parseInt(event.target.value, 10));
  };

  return (
    <div className="form-control w-full pb-4">
      <label className="label" htmlFor="testcase-select">
        <span className="label-text">Select Test Case:</span>
      </label>
      <select
        id="testcase-select"
        className="select select-bordered w-full"
        value={selectedTestCaseNumber}
        onChange={handleSelectChange}
      >
        {testcases.map((testcase, index) => (
          <option key={index} value={index + 1}>
            {testcase.description || `Test Case ${index + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TestCaseSelector;
