import ky from "ky";
import type { Problem } from "algo-lens-core";
import { BACKEND_URL } from "astro:env/client";
import type { ProblemState } from "algo-lens-core";

// Define a type for the random problem response
export type ProblemInfo = {
  id: string;
  title: string;
  difficulty: string;
  emoji?: string; // Emoji might be optional
};


console.log("Backend URL:", BACKEND_URL);
const be = ky.create({ prefixUrl: BACKEND_URL });

// Updated to accept an optional tag and return ProblemInfo array
export async function getProblemList(tag?: string): Promise<ProblemInfo[]> {
  const searchParams: Record<string, string> = {};
  if (tag) {
    searchParams.tag = tag;
  }
  // Use ProblemInfo[] as the expected return type from the endpoint now
  const result = await be.get<ProblemInfo[]>("problem", { searchParams });
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

export async function getProblemSize(id:string){
  const result = await be.get<{size:number}>(`problem/${id}/size`);
  const json = await result.json();
  return json.size;
}

export async function getRandomProblem(): Promise<ProblemInfo> {
  // Use the 'be' instance which has the base URL configured
  const result = await be.get<ProblemInfo>("problem/random");
  // ky automatically throws for non-2xx responses, so we just parse
  return result.json();
}