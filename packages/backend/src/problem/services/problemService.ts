import { getAllProblems as coreGetAllProblems } from "../core/list";
import { loadProblemWithId as coreLoadProblemWithId } from "../core/load";
import {
  ProblemState,
  HashmapVariable,
  HashsetVariable,
  ListNode,
  ListVariable,
} from "@algolens/core/src/types";
import { cloneDeep } from "lodash";
import { ProblemStateCache } from "../../cache/ProblemStateCache";
import { getDefaultServer } from "@algolens/database";
import { getProblemById } from "../core/utils";
import { LinkedListSerializer } from "@algolens/core/src/LinkedListSerializer";
import { problemAccessCheck } from "@algolens/backend-premium/src/access";

const stateCache = new ProblemStateCache();

export async function getAllProblemsService(p: {
  userId?: string;
  filter?: string;
  tag?: string;
  plan?: string;
}) {
  const { userId, filter, tag, plan } = p;
  console.log("info", { userId, filter, tag });
  let allProblems = await coreGetAllProblems();
  if (userId) {
    const dbServer = await getDefaultServer();
    const pbFilter = `user.id='${userId}'`;
    console.log("pb filter", pbFilter);
    const bookmarks = await dbServer.getRecords("bookmarks", {
      // Fetching up to 200 bookmarks, adjust as needed
      page: 1,
      perPage: 100,
      filter: pbFilter,
    });
    console.log("bookmarks", bookmarks);
    const bookmarkIds = bookmarks.items.map((x: any) => x.problem);

    let bookmarkSet = new Set<string>(bookmarkIds);
    console.log("bm set", bookmarkSet);
    for (const problem of allProblems) {
      if (bookmarkSet.has(problem.id)) {
        problem.bookmark = true;
      }
    }
  }

  console.log("all problems", allProblems.length);
  if (filter == "bookmark") {
    allProblems = allProblems.filter((x) => x.bookmark);
  }

  console.log("all problems", allProblems.length, tag);
  if (tag) {
    console.log("tags", typeof tag);

    allProblems = allProblems.filter((x) => x?.metadataV2?.tags?.includes(tag));
  }
  console.log("all problems", allProblems.length, plan);
  if (plan) {
    allProblems = allProblems.filter((x) => x?.plan == plan);
  }
  console.log("all problems", allProblems.length);

  return allProblems;
}

export async function getProblemByIdService(id: string) {
  return getProblemById(id);
}

export async function loadProblemWithIdService(problemId: string) {
  return coreLoadProblemWithId(problemId);
}

export async function getProblemStateService(
  problemId: string,
  testcaseIndex: number,
  step: number,
  subscription: {
    plan: "free" | "premium";
  }
) {
  const problem = await coreLoadProblemWithId(problemId);
  if (!problem) {
    throw new Error(`Problem not found: ${problemId}`);
  }

  problemAccessCheck({ problem, subscription });
  // Assuming stateCache.get can handle test case index
  return stateCache.get(problem, testcaseIndex, step);
}

export async function getAllProblemStatesService(
  problemId: string,
  testcaseIndex: number,
  subscription: {
    plan: "free" | "premium";
  },
  from?: number,
  to?: number
) {
  const problem = await coreLoadProblemWithId(problemId);
  if (!problem) {
    throw new Error(`Problem not found: ${problemId}`);
  }

  problemAccessCheck({ problem, subscription });
  return stateCache.getAll(problem, testcaseIndex, from, to);
}

export async function getProblemSizeService(
  problemId: string,
  testcaseIndex: number
) {
  const problem = await getProblemById(problemId);
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
