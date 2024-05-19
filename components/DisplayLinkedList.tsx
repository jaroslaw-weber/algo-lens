// DisplayLinkedList.tsx
import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import { ListNode, ListVariable } from "../src/problem/types"; // Assuming you have similar types for the linked list

interface DisplayLinkedListProps {
  data: ListVariable;
}

const DisplayLinkedList: React.FC<DisplayLinkedListProps> = ({ data }) => {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const highlight = new Map(data.highlight?.filter(x=>x.node).map(x => [x.node.id, x]));

  const transformListToGraph = (node: ListNode) => {
    const elements: cytoscape.ElementDefinition[] = [];
    let currentNode = node;
    while (currentNode != null) {
      const nodeClass = highlight.get(currentNode.id)?.color || "";
      elements.push({
        data: { id: currentNode.id, label: currentNode.val.toString() },
        classes: nodeClass,
      });
      if (currentNode.next) {
        elements.push({
          data: {
            id: `${currentNode.id}->${currentNode.next.id}`,
            source: currentNode.id.toString(),
            target: currentNode.next.id.toString(),
          },
        });
      }
      currentNode = currentNode.next;
    }
    return elements;
  };

  useEffect(() => {
    if (containerRef.current) {
      cyRef.current = cytoscape({
        container: containerRef.current,
        elements: transformListToGraph(data.value),
        style: [
          {
            selector: "node",
            style: {
              label: "data(label)",
              "text-valign": "center",
              color: "black",
              "text-outline-width": 1,
              "text-outline-color": "white",
              "background-color": "white",
              "border-width": 2,
              "border-color": "black",
              "user-select": "none",
              "user-drag": "none",
            },
          },
          // Retaining the node highlighting styles from previous component
          {
            selector: "node.neutral",
            style: {
              "background-color": "black", 
              color: "white"
            },
          },
          {
            selector: "node.good",
            style: {
              "background-color": "green",
              color: "white"
            },
          },
          {
            selector: "node.bad",
            style: {
              "background-color": "red",
              color: "white"
            },
          },
          {
            selector: "edge",
            style: {
              width: 2,
              "line-color": "#ddd",
              "target-arrow-color": "#ddd",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
            },
          },
        ],
        layout: {
          name: "grid",
          rows: 1,
          avoidOverlap: true,
          fit: true,
        },
      });
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [data]);

  return <div ref={containerRef} className="w-40 h-40" />;
};

export default DisplayLinkedList;
