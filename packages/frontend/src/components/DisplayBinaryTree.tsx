// DisplayTree.tsx
import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import type { BinaryTreeNode as BinaryTreeNode, TreeVariable } from "algo-lens-core/src/types";

import type {Config} from "daisyui"

interface DisplayBinaryTreeProps {
  data: TreeVariable;
}

const DisplayTree: React.FC<DisplayBinaryTreeProps> = ({ data }) => {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const highlight = new Map(data.highlight?.filter(x=> x.node).map((x) => [x.node.id,x]));

  // todo: load colors with theme const theme = getCurrentTheme()

  const transformTreeToGraph = (node: BinaryTreeNode) => {
    const elements: cytoscape.ElementDefinition[] = [];

    const traverse = (currentNode: BinaryTreeNode, parentId: string | null) => {
      const nodeClass = highlight?.get(currentNode?.id)?.color ??""
      elements.push({
        data: { id: currentNode.id, label: currentNode.val.toString() },
        classes: nodeClass, // Add classes to nodes
      });
      if (parentId !== null) {
        elements.push({
          data: {
            id: `${parentId}->${currentNode.id}`,
            source: parentId.toString(),
            target: currentNode.id.toString(),
          },
        });
      }
      if (currentNode.left) {
        traverse(currentNode.left, currentNode.id);
      }
      if (currentNode.right) {
        traverse(currentNode.right, currentNode.id);
      }
    };

    traverse(node, null);
    return elements;
  };

  useEffect(() => {
    if (containerRef.current) {
      cyRef.current = cytoscape({
        container: containerRef.current,
        elements: transformTreeToGraph(data.value),
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
          {
            selector: "node.neutral",
            style: {
              "background-color": "black", // Change color for highlighted nodes
              color:"white"
            },
          },
          {
            selector: "node.good",
            style: {
              "background-color": "green", // Change color for highlighted nodes
              color:"white"
            },
          },
          {
            selector: "node.bad",
            style: {
              "background-color": "red", // Change color for highlighted nodes
              color:"white"
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
          name: "breadthfirst",
          directed: true,
          padding: 10,
          fit: true,
          align: "center",
          avoidOverlap: true,
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

export default DisplayTree;
