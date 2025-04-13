import ky from "ky";
import type { Problem } from "./types";
import { BACKEND_URL } from "astro:env/client";

console.log("Backend URL:", BACKEND_URL);
const be = ky.create({ prefixUrl: BACKEND_URL });

export async function getProblemList() {
  const result = await be.get<Problem[]>("problem");
  return result.json();
}

export async function getProblem(id: string) {
  const result = await be.get<Problem>(`problem/${id}`);
  return result.json();
}
