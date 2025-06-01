import { ListNode, NodeHighlight, SerializedListNode } from "./core";

export class LinkedListSerializer {
  /**
   * Serializes a linked list (potentially cyclic) into an array of SerializedListNode objects.
   * Each node is assigned a unique ID, and 'next' pointers are represented by the ID of the next node.
   * @param head The head of the linked list to serialize.
   * @returns An array of SerializedListNode objects.
   */
  public static serialize(
    head: ListNode | null | undefined
  ): SerializedListNode[] {
    if (head === undefined || head === null) {
      return [];
    }
    const serializedNodes: SerializedListNode[] = [];
    const nodeMap = new Map<ListNode, string>(); // Maps ListNode object to its assigned ID
    let currentNode: ListNode | null = head;
    let idCounter = 0;

    // First pass: Assign IDs and collect basic node data
    while (currentNode !== null) {
      if (nodeMap.has(currentNode)) {
        // Cycle detected, stop processing new nodes
        break;
      }

      const nodeId = currentNode.id || `node_${idCounter++}`;
      currentNode.id = nodeId; // Ensure the original node has an ID
      nodeMap.set(currentNode, nodeId);

      serializedNodes.push({
        id: nodeId,
        value: currentNode.val,
        next: null, // Will be filled in the second pass
      });

      currentNode = currentNode.next;
    }

    // Second pass: Fill in nextId for all serialized nodes
    // We need to iterate through the original list again to correctly set nextId,
    // as the first pass might have stopped early due to a cycle.
    currentNode = head;
    let serializedNodeIndex = 0;
    while (
      currentNode !== null &&
      serializedNodeIndex < serializedNodes.length
    ) {
      const serializedNode = serializedNodes[serializedNodeIndex];
      if (currentNode.next !== null) {
        // If the next node is in our map (meaning it was part of the traversed list,
        // either linear or part of a cycle), get its ID.
        serializedNode.next = nodeMap.get(currentNode.next) || null;
      } else {
        serializedNode.next = null;
      }
      currentNode = currentNode.next;
      serializedNodeIndex++;
    }
    console.log("sernodes", serializedNodes);
    return serializedNodes;
  }

  /**
   * Deserializes an array of SerializedListNode objects back into a linked list (potentially cyclic).
   * @param serializedNodes An array of SerializedListNode objects.
   * @returns The head of the reconstructed linked list.
   */
  public static deserialize(
    serializedNodes: SerializedListNode[] | undefined
  ): ListNode | null {
    if (serializedNodes === undefined || serializedNodes.length === 0) {
      return null;
    }

    const nodeMap = new Map<string, ListNode>(); // Maps ID to new ListNode object

    // First pass: Create all ListNode objects and populate the map
    for (const sNode of serializedNodes) {
      const newNode = new ListNode(Number(sNode.value));
      newNode.id = sNode.id; // Preserve the ID
      nodeMap.set(sNode.id, newNode);
    }

    // Second pass: Connect the nodes using the nextId
    for (const sNode of serializedNodes) {
      const currentNode = nodeMap.get(sNode.id);
      if (currentNode && sNode.next !== null) {
        const nextNode = nodeMap.get(sNode.next);
        if (nextNode) {
          currentNode.next = nextNode;
        }
      }
    }

    // The head is the first node in the serialized array
    return nodeMap.get(serializedNodes[0].id) || null;
  }

  public static serializeHighlights(
    highlights: NodeHighlight[]
  ): NodeHighlight[] {
    const result: NodeHighlight[] = [];
    if (!highlights) {
      return [];
    }
    for (const h of highlights) {
      const ln = h.node as ListNode;
      const sn: SerializedListNode = {
        id: ln?.id!,
        value: ln?.val!,
        next: ln?.next?.id!,
      };
      const nh: NodeHighlight = {
        color: h.color,
        label: h.label,
        node: sn,
        tooltipPosition: h.tooltipPosition,
      };
      result.push(nh);
    }
    return result;
  }
}
