// DisplayTree.tsx
import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { TreeNode, TreeVariable } from '../src/problem/types';

interface DisplayTreeProps {
  data: TreeVariable;
}

const DisplayTree: React.FC<DisplayTreeProps> = ({ data }) => {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const transformTreeToGraph = (node: TreeNode) => {
    const elements: cytoscape.ElementDefinition[] = [];

    const traverse = (currentNode: TreeNode, parentId: string | null) => {
      elements.push({ data: { id: currentNode.id, label: currentNode.val.toString() } });
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
            selector: 'node',
            style: {
              'label': 'data(label)',
              'text-valign': 'center',
              'color': '#fff',
              'text-outline-width': 2,
              'text-outline-color': '#888',
              'background-color': '#888',
              'border-width': 2,
              'border-color': '#888',
            },
          },
          {
            selector: 'edge',
            style: {
              'width': 2,
              'line-color': '#ddd',
              'target-arrow-color': '#ddd',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
            },
          },
        ],
        layout: {
          name: 'breadthfirst',
          directed: true,
          padding: 10,
        },
      });
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, [data]);

  return <div ref={containerRef} style={{ width: '100%', height: '500px' }} />;
};

export default DisplayTree;
