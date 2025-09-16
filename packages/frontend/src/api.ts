import ky, { type KyInstance } from "ky";
import type { Problem } from "algo-lens-core/src/types";

import { BACKEND_URL } from "astro:env/client";
import type { ProblemState } from "algo-lens-core/src/types";

import { pb } from "./auth/pocketbase";
import _ from "lodash";

// Define a type for the random problem response
export type ProblemInfo = {
  id: string;
  title: string;
  difficulty: string;
  emoji?: string; // Emoji might be optional
  bookmark?: boolean; // Added isBookmarked flag
  tags?: string[]; // Added tags
};

//
export const be: KyInstance = ky.create({
  prefixUrl: BACKEND_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = pb.authStore.token;
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    beforeError: [
      async (error) => {
        const { response } = error;
        if (response && response.body) {
          const parsed: any = await response.json();
          console.log("parsed", parsed);
          Object.assign(error, parsed);
          error.message = parsed.error;
        }

        return error;
      },
    ],
  },
});

// Updated to accept an optional tag and return ProblemInfo array
export async function getProblemList(
  tag?: string,
  filter?: string,
  plan?: string
): Promise<ProblemInfo[]> {
  const searchParams = _.pickBy(
    {
      tag,
      filter,
      plan,
    },
    (x) => x
  ) as Record<string, string>;
  // Use ProblemInfo[] as the expected return type from the endpoint now
  const result = await be.get<ProblemInfo[]>("problem", { searchParams });
  return result.json();
}

export async function getProblem(id: string) {
  const result = await be.get<Problem<any, any>>(`problem/${id}`);
  return result.json();
}

export async function getProblemState(
  id: string,
  testcaseNumber: number,
  step: number
) {
  // This function will be replaced by getProblemStatesChunk
  // For now, it remains for compatibility if other parts of the app still use it
  // It will be removed once all usages are migrated
  const result = await be.get<ProblemState>(
    `problem/${id}/testcase/${testcaseNumber}/state/${step}`
  );
  return result.json();
}

export async function getProblemStatesChunk(
  id: string,
  testcaseNumber: number,
  from: number,
  to: number
): Promise<ProblemState[]> {
  const searchParams = { from: from.toString(), to: to.toString() };
  const result = await be.get<ProblemState[]>(
    `problem/${id}/testcase/${testcaseNumber}/states`,
    { searchParams }
  );
  return result.json();
}

export async function getProblemSize(id: string, testcaseNumber: number) {
  const result = await be.get<{ size: number }>(
    `problem/${id}/testcase/${testcaseNumber}/size`
  );
  const json = await result.json();
  return json.size;
}

export async function getRandomProblem() {
  // Use the 'be' instance which has the base URL configured
  console.log("Fetching random problem from API...");
  const result = await be.get<Problem<any, any>>("problem/random");
  // ky automatically throws for non-2xx responses, so we just parse
  const problem = await result.json();
  console.log("Random problem received:", {
    id: problem.id,
    title: problem.title,
    testcasesCount: problem.testcases?.length,
    testcases: problem.testcases?.map((tc) => ({
      name: tc.name,
      description: tc.description,
      isDefault: tc.isDefault,
      hasInput: !!tc.input,
      hasExpected: !!tc.expected,
    })),
  });
  return problem;
}
