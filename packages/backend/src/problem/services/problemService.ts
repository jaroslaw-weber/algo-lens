import { getAllProblems as coreGetAllProblems } from "../core/list";
import { getProblemById as coreGetProblemById } from "../core/utils";
import { loadProblemWithId as coreLoadProblemWithId } from "../core/load";
import {
  ProblemState,
  HashmapVariable,
  HashsetVariable,
  ListNode,
  ListVariable,
  LinkedListSerializer,
} from "algo-lens-core";
import { cloneDeep } from "lodash";
import { ProblemStateCache } from "../../cache/ProblemStateCache";
import { getPocketbase } from "../../db/pocketbase";

const stateCache = new ProblemStateCache();

export async function getAllProblemsService(userId?: string, filter?: string) {
  console.log("info", { userId, filter });
  let allProblems = await coreGetAllProblems();
  if (userId) {
    const pb = await getPocketbase();
    const pbFilter = `user.id='${userId}'`;
    console.log("pb filter", pbFilter);
    const bookmarks = await pb.collection("bookmarks").getList(0, 200, {
      // Fetching up to 50 bookmarks, adjust as needed
      filter: pbFilter,
    });
    console.log("bookmarks", bookmarks);
    const bookmarkIds = bookmarks.items.map((x) => x.problem);

    let bookmarkSet = new Set<string>(bookmarkIds);
    console.log("bm set", bookmarkSet);
    for (const problem of allProblems) {
      if (bookmarkSet.has(problem.id)) {
        problem.bookmark = true;
      }
    }
  }

  if (filter == "bookmark") {
    allProblems = allProblems.filter((x) => x.bookmark);
  }
  return allProblems;
}

export async function getProblemByIdService(id: string) {
  return coreGetProblemById(id);
}

export async function loadProblemWithIdService(problemId: string) {
  return coreLoadProblemWithId(problemId);
}

export async function getProblemStateService(
  problemId: string,
  testcaseIndex: number,
  step: number
) {
  const problem = await coreLoadProblemWithId(problemId);
  if (!problem) {
    throw new Error(`Problem not found: ${problemId}`);
  }
  // Assuming stateCache.get can handle test case index
  return stateCache.get(problem, testcaseIndex, step);
}

export async function getProblemSizeService(
  problemId: string,
  testcaseIndex: number
) {
  const problem = await coreGetProblemById(problemId);
  if (!problem) {
    throw new Error(`Problem not found: ${problemId}`);
  }
  return stateCache.getSize(problem, testcaseIndex);
}

export function preserialize(state: ProblemState): any {
  const result = cloneDeep(state);
  for (const v of result.variables) {
    //convert Map variable to Record
    const hm = v as HashmapVariable;
    if (hm.value instanceof Map) {
      hm.value = Array.from(hm.value.entries());
    }
    //convert Set variable to Array
    const set = v as HashsetVariable;
    if (set.value instanceof Set) {
      set.value = Array.from(set?.value);
    }
    //serialize ListNode
    const list = v as ListVariable;
    if (list.value instanceof ListNode) {
      console.log("found node");
      list.value = LinkedListSerializer.serialize(list.value);
      console.log("serialized");
      console.log(list.value);
    }
  }

  return result;
}
