import ky from "ky";
import type { Problem } from "algo-lens-core";
import { BACKEND_URL } from "astro:env/client";
import type { ProblemState } from "algo-lens-core";

console.log("Backend URL:", BACKEND_URL);
const be = ky.create({ prefixUrl: BACKEND_URL });

export async function getProblemList() {
  const result = await be.get<Problem<any,any>[]>("problem");
  return result.json();
}

export async function getProblem(id: string) {
  const result = await be.get<Problem<any,any>>(`problem/${id}`);
  return result.json();
}

export async function getProblemState(id: string, step: number, testcaseIndex?: number) {
  let url = `problem/${id}/state/${step}`;
  if (testcaseIndex !== undefined) {
    url += `?testcaseIndex=${testcaseIndex}`;
  }
  const result = await be.get<ProblemState>(url);
  return result.json();
}

export async function getProblemSize(id: string, testcaseIndex?: number) {
  let url = `problem/${id}/size`;
  if (testcaseIndex !== undefined) {
    url += `?testcaseIndex=${testcaseIndex}`;
  }
  const result = await be.get<{size:number}>(url);
  const json = await result.json();
  return json.size;
}

export async function setTestcaseIndex(id: string, index: number) {
  const result = await be.get<{success: boolean, testcaseIndex: number}>(`problem/${id}/testcase/${index}`);
  return result.json();
}

export async function getCurrentTestcaseIndex(id: string) {
  const result = await be.get<{testcaseIndex: number}>(`problem/${id}/testcase`);
  const json = await result.json();
  return json.testcaseIndex;
}