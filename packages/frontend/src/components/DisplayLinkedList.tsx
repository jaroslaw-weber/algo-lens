// DisplayLinkedList.tsx
import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import type { ListNode, ListVariable, NodeHighlight } from "algo-lens-core"; // Assuming you have similar types for the linked list

interface DisplayLinkedListProps {
  data: ListVariable;
}


export const transformListToGraph = (node: ListNode, highlight: Map<string, NodeHighlight>) => {
  const elements: cytoscape.ElementDefinition[] = [];
  const visited = new Set<ListNode>();
  let currentNode = node;

  while (currentNode != null) {
    if (visited.has(currentNode)) {
      // If we encounter a node we've already seen, add an edge back to it and stop processing
      elements.push({
        data: {
          id: `${currentNode.id}->cycle`,
          source: currentNode.id.toString(),
          target: currentNode.id.toString(),
        },
        classes: 'cycle',
      });
      break;
    }

    visited.add(currentNode);

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

const DisplayLinkedList: React.FC<DisplayLinkedListProps> = ({ data }) => {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const highlight = new Map(
    data.highlight?.filter((x) => x.node).map((x) => [x.node.id, x])
  );

  useEffect(() => {
    if (containerRef.current) {
      cyRef.current = cytoscape({
        container: containerRef.current,
        elements: transformListToGraph(data.value, highlight),
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
              color: "white",
            },
          },
          {
            selector: "node.good",
            style: {
              "background-color": "green",
              color: "white",
            },
          },
          {
            selector: "node.bad",
            style: {
              "background-color": "red",
              color: "white",
            },
          },
          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "black",
              "target-arrow-color": "black",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
            },
          },
        ],
        layout: {
          name: "grid",
          rows: 1,
          avoidOverlap: true,
          fit: false,
        },
      });
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="w-full">
      <p>{data.label}</p>
      <div ref={containerRef} className="w-80 h-36" />
    </div>
  );
};

export default DisplayLinkedList;
