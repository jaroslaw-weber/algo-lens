import { it } from "bun:test";
import { minimumWindowSubstring } from "./problem";
import { runTests } from "../../core/test";

it(minimumWindowSubstring.id, async () => {
  await runTests(minimumWindowSubstring);
});
