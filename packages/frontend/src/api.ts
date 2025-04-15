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

export async function getProblemState(id: string, step: number) {
  const result = await be.get<ProblemState>(`problem/${id}/state/${step}`);
  return result.json();
}