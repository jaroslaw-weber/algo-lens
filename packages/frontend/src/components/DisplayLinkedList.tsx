// DisplayLinkedList.tsx
import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import type {
  ListNode,
  ListVariable,
  NodeHighlight,
  SerializedListNode,
  LinkedListSerializer, // Add this import
} from "algo-lens-core"; // Assuming you have similar types for the linked list

interface DisplayLinkedListProps {
  data: ListVariable;
}

export const transformListToGraph = (
  nodes: SerializedListNode[],
  highlight: Map<string, NodeHighlight>
) => {
  const elements: cytoscape.ElementDefinition[] = [];
  const nodeMap = new Map<string, SerializedListNode>();

  // First pass: Create a map for quick lookup and add nodes
  for (const node of nodes) {
    nodeMap.set(node.id, node);
    const nodeClass = highlight.get(node.id)?.color || "";
    elements.push({
      data: { id: node.id, label: node.value.toString() },
      classes: nodeClass,
    });
  }

  // Second pass: Add edges
  for (const node of nodes) {
    if (node.next) {
      // Ensure the next node exists in our map (handles cases where next might point outside the current set of nodes)
      if (nodeMap.has(node.next)) {
        elements.push({
          data: {
            id: `${node.id}->${node.next}`,
            source: node.id.toString(),
            target: node.next.toString(),
          },
        });
      }
    }
  }
  return elements;
};

const DisplayLinkedList: React.FC<DisplayLinkedListProps> = ({ data }) => {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const highlights = data.highlight;
  const nodes = data.value as SerializedListNode[];

  const highlightMap = new Map<string, NodeHighlight>(
    highlights?.filter((x) => x.node?.id).map((x) => [x.node!.id!, x])
  );

  useEffect(() => {
    if (containerRef.current) {
      let nodesToDisplay: SerializedListNode[] = nodes;

      cyRef.current = cytoscape({
        container: containerRef.current,
        elements: transformListToGraph(nodesToDisplay, highlightMap),
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
              // "user-drag": "none",
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
  }, [nodes]);

  return (
    <div className="w-full">
      <div ref={containerRef} className="w-80 h-36" />
    </div>
  );
};

export default DisplayLinkedList;
