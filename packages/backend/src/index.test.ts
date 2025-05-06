import { describe, it, expect } from "bun:test";
import app from "./index"; // Import the default export which contains app.fetch
import { Problem } from "algo-lens-core"; // Import Problem type if needed for detailed checks

// Helper to make requests and parse JSON
const makeRequest = async (path: string) => {
  // Using a base URL, although it's not strictly necessary for app.fetch
  const req = new Request(`http://localhost${path}`);
  const res = await app.fetch(req);
  return {
    status: res.status,
    body: await res.json().catch(() => null), // Gracefully handle non-JSON responses
  };
};

describe("Backend API Tests", () => {

  const validProblemId = "two-sum";
  const invalidProblemId = "invalid-id";
  const defaultTestCaseIndex = 0; // two-sum's first test case is default
  const secondTestCaseIndex = 1;

  // --- GET /problem/:id Tests ---
  describe("GET /problem/:id", () => {
    it("should return 200 and problem details (excluding testcases) for a valid ID", async () => {
      const { status, body } = await makeRequest(`/problem/${validProblemId}`);
      expect(status).toBe(200);
      expect(body).toBeDefined();
      expect(body.id).toBe(validProblemId);
      expect(body.title).toBeDefined();
      // Verify the structure based on the `pick` function in index.ts
      expect(body.difficulty).toBeDefined();
      expect(body.code).toBeDefined();
      expect(body.url).toBeDefined(); // Added check for url
      expect(body.tags).toBeArray(); // Added check for tags
      expect(body.metadata).toBeDefined();
      // Assert that testcases are NOT included in the response due to `pick`
      expect(body.testcases).toBeUndefined();
    });

    it("should return 404 for an invalid ID", async () => {
      const { status, body } = await makeRequest(`/problem/${invalidProblemId}`);
      expect(status).toBe(404);
      expect(body.error).toBe("Problem not found");
    });
  });

  // --- GET /problem/:id/size Tests ---
  describe("GET /problem/:id/size", () => {
    it("should return 200 and size for the default test case when no index is specified", async () => {
      const { status, body } = await makeRequest(`/problem/${validProblemId}/size`);
      expect(status).toBe(200);
      expect(body.size).toBeNumber();
      // two-sum default test case ([2, 7, 11, 15], 9) has 7 steps.
      expect(body.size).toBe(7);
    });

    it("should return 200 and size for the specified test case index", async () => {
      const { status, body } = await makeRequest(`/problem/${validProblemId}/size?testCaseIndex=${secondTestCaseIndex}`);
      expect(status).toBe(200);
      expect(body.size).toBeNumber();
      // two-sum second test case ([3, 2, 4], 6) has 7 steps.
      expect(body.size).toBe(7);
    });

     it("should return 500 for an out-of-bounds test case index", async () => {
       const outOfBoundsIndex = 100;
       const { status, body } = await makeRequest(`/problem/${validProblemId}/size?testCaseIndex=${outOfBoundsIndex}`);
       // The backend's stateCache.getSize -> cacheProblemTestCase throws an error for invalid index, caught by the route handler
       expect(status).toBe(500); // Error during size calculation leads to 500
       expect(body.error).toContain("Internal server error while calculating size"); // Check generic error from catch block
     });

     it("should return 400 for an invalid (non-numeric) test case index query", async () => {
       const { status, body } = await makeRequest(`/problem/${validProblemId}/size?testCaseIndex=abc`);
       expect(status).toBe(400);
       expect(body.error).toContain("Invalid testCaseIndex query parameter");
     });


    it("should return 404 for an invalid problem ID", async () => {
      const { status, body } = await makeRequest(`/problem/${invalidProblemId}/size`);
      expect(status).toBe(404);
      expect(body.error).toBe(`Problem not found: ${invalidProblemId}`);
    });
  });

  // --- GET /problem/:id/testcase/:testCaseIndex/state/:step Tests ---
  describe("GET /problem/:id/testcase/:testCaseIndex/state/:step", () => {
    const validStep = 1;
    const outOfBoundsStep = 999; // Assume less than 999 steps

    it("should return 200 and state for valid id, testCaseIndex=0, and step=1", async () => {
      const { status, body } = await makeRequest(`/problem/${validProblemId}/testcase/${defaultTestCaseIndex}/state/${validStep}`);
      expect(status).toBe(200);
      expect(body).toBeDefined();
      expect(body.variables).toBeArray();
      expect(body.breakpoint).toBeNumber();
    });

    it("should return 200 and state for valid id, testCaseIndex=1, and step=1", async () => {
       const { status, body } = await makeRequest(`/problem/${validProblemId}/testcase/${secondTestCaseIndex}/state/${validStep}`);
       expect(status).toBe(200);
       expect(body).toBeDefined();
       expect(body.variables).toBeArray();
       expect(body.breakpoint).toBeNumber();
       // You could fetch state for index 0, step 1 and compare if needed
    });


    it("should return 404 for an out-of-bounds step", async () => {
      // Fetch the actual size first to determine a reliable out-of-bounds step
      const sizeRes = await makeRequest(`/problem/${validProblemId}/size?testCaseIndex=${defaultTestCaseIndex}`);
      const size = sizeRes.body.size;
      const invalidStep = size + 1;

      const { status, body } = await makeRequest(`/problem/${validProblemId}/testcase/${defaultTestCaseIndex}/state/${invalidStep}`);
      expect(status).toBe(404);
      expect(body.error).toContain(`Step ${invalidStep} out of bounds`);
    });

     it("should return 400 for an out-of-bounds test case index", async () => {
       const outOfBoundsIndex = 100;
      const { status, body } = await makeRequest(`/problem/${validProblemId}/testcase/${outOfBoundsIndex}/state/${validStep}`);
      expect(status).toBe(400);
       expect(body.error).toContain(`testCaseIndex ${outOfBoundsIndex} out of bounds`);
    });

     it("should return 400 for an invalid (non-numeric) test case index", async () => {
       const { status, body } = await makeRequest(`/problem/${validProblemId}/testcase/abc/state/${validStep}`);
       expect(status).toBe(400);
       expect(body.error).toBe("Invalid testCaseIndex");
     });

      it("should return 400 for an invalid (non-numeric) step", async () => {
       const { status, body } = await makeRequest(`/problem/${validProblemId}/testcase/${defaultTestCaseIndex}/state/xyz`);
       expect(status).toBe(400);
       expect(body.error).toBe("Invalid step number");
     });

       it("should return 400 for step 0", async () => {
       const { status, body } = await makeRequest(`/problem/${validProblemId}/testcase/${defaultTestCaseIndex}/state/0`);
       expect(status).toBe(400);
       expect(body.error).toBe("Invalid step number");
     });


    it("should return 404 for an invalid problem ID", async () => {
      const { status, body } = await makeRequest(`/problem/${invalidProblemId}/testcase/${defaultTestCaseIndex}/state/${validStep}`);
      expect(status).toBe(404);
      expect(body.error).toBe(`Problem not found: ${invalidProblemId}`);
    });
  });
});
