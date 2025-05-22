import React from "react";
import { useAtom } from "jotai";
import type { TestCase } from "algo-lens-core";
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
    <div>
      <label htmlFor="testcase-select">Select Test Case:</label>
      <select
        id="testcase-select"
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
