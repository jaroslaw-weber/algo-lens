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

// Updated function signature and API endpoint URL
export async function getProblemState(id: string, testCaseIndex: number, step: number) {
  const result = await be.get<ProblemState>(`problem/${id}/testcase/${testCaseIndex}/state/${step}`);
  return result.json();
}

export async function getProblemSize(id:string){
  const result = await be.get<{size:number}>(`problem/${id}/size`);
  const json = await result.json();
  return json.size;
}