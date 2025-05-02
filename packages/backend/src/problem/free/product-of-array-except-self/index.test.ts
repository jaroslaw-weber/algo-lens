import { it } from "bun:test";
import { problem } from "./problem";
import { runTests } from "../../core/test";

it("product-of-array-except-self", () => {
  runTests(problem);
});
