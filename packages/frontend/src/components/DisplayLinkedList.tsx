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
import popperjs, {
  RefElement,
  type PopperFactory,
  type PopperInstance,
} from "cytoscape-popper";

import { computePosition, flip, shift, limitShift } from "@floating-ui/dom";

interface DisplayLinkedListProps {
  data: ListVariable;
}

const factory: PopperFactory = (node, content, opts) => {
  // see https://floating-ui.com/docs/computePosition#options
  const popperOptions = {
    // matching the default behaviour from Popper@2
    // https://floating-ui.com/docs/migration#configure-middleware
    middleware: [flip(), shift({ limiter: limitShift() })],
    ...opts,
  };
  console.log("creating popper", content);

  function update() {
    computePosition(node, content, popperOptions).then(({ x, y }) => {
      console.log("x", x);
      const bounding = node.getBoundingClientRect();
      console.log(bounding);
      Object.assign(content.style, {
        left: `${bounding.left}px`,
        top: `${bounding.top - 30}px`,
        position: "absolute",
      });
    });
  }
  update();
  return { update };
};

const popper = popperjs(factory);

cytoscape.use(popper);

export const transformListToGraph = (
  nodes: SerializedListNode[],
  highlight: Map<string, NodeHighlight>
) => {
  const elements: cytoscape.ElementDefinition[] = [];
  const nodeMap = new Map<string, SerializedListNode>();

  // First pass: Create a map for quick lookup and add nodes
  for (const node of nodes) {
    nodeMap.set(node.id, node);
    const nodeHighlight = highlight.get(node.id);
    const nodeClass = nodeHighlight?.color || "";
    const topLabel = nodeHighlight?.label || ""; // Get the label from highlight
    elements.push({
      data: { id: node.id, label: node.value.toString(), topLabel: topLabel }, // Add topLabel to node data
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
  const poppers = useRef<PopperInstance[]>([]); // Ref to store popper instances
  const popperDivs = useRef<HTMLElement[]>([]);

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
              label: "data(label)", // Node's value
              "text-valign": "center",
              color: "black",
              "text-outline-width": 1,
              "text-outline-color": "white",
              "background-color": "white",
              "border-width": 2,
              "border-color": "black",
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
      for (const node of cyRef.current.nodes()) {
        console.log("nodeee");

        const tooltip = node.data("topLabel");
        if (tooltip) {
          const pop = node.popper({
            content: () => {
              let div = document.createElement("div");
              div.innerHTML = tooltip;
              popperDivs.current.push(div);
              document.body.appendChild(div); // Append the div to the body
              return div;
            },
          });
          poppers.current.push(pop);
        }
      }

      // After layout is done, update popper positions
      cyRef.current.ready(() => {
        cyRef.current?.nodes().forEach((node) => {
          const popper = node.data("popper");
          if (popper) {
            popper.update();
          }
        });
      });
    }

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
      if (popperDivs.current) {
        for (const d of popperDivs.current) {
          d?.remove();
        }
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
