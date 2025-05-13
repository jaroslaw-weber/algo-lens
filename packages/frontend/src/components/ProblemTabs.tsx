import React, { useState } from "react";

interface ProblemTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function ProblemTabs({ activeTab, setActiveTab }: ProblemTabsProps) {
  return (
    <div role="tablist" className="tabs tabs-lifted mt-4">
      <button
        role="tab"
        className={`tab ${activeTab === "visualizer" ? "tab-active" : ""}`}
        onClick={() => setActiveTab("visualizer")}
      >
        Visualizer
      </button>
      <button
        role="tab"
        className={`tab ${activeTab === "description" ? "tab-active" : ""}`}
        onClick={() => setActiveTab("description")}
      >
        Description
      </button>
      <button
        role="tab"
        className={`tab ${activeTab === "explanation" ? "tab-active" : ""}`}
        onClick={() => setActiveTab("explanation")}
      >
        Explanation
      </button>
    </div>
  );
}

export default ProblemTabs;