import React, { useState } from "react";
import { trackUmamiEvent } from "../utils/umami";

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
        onClick={() => { setActiveTab("visualizer"); trackUmamiEvent('click-tab-visualizer'); }}
      >
        Visualizer
      </button>
      <button
        role="tab"
        className={`tab ${activeTab === "description" ? "tab-active" : ""}`}
        onClick={() => { setActiveTab("description"); trackUmamiEvent('click-tab-description'); }}
      >
        Description
      </button>
      <button
        role="tab"
        className={`tab ${activeTab === "explanation" ? "tab-active" : ""}`}
        onClick={() => { setActiveTab("explanation"); trackUmamiEvent('click-tab-explanation'); }}
      >
        Explanation
      </button>
    </div>
  );
}

export default ProblemTabs;