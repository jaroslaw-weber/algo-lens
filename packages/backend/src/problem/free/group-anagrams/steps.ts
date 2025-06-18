import { ProblemState, Pointer } from "algo-lens-core/types/core";
import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2";
import { GroupAnagramsInput } from "./types";

export function generateSteps(input: GroupAnagramsInput): ProblemState[] {
  const l = new StepLoggerV2();
  const { strs } = input; // HIDE

  l.arrayV3({ strs: strs }, [{ value: -1, label: "input", color: "info" }]);
  l.comment = "Start: Group anagrams from the input array of strings.";
  l.breakpoint(1);

  const anagramMap = new Map<string, string[]>();
  l.simple({ anagramMap });
  l.hashmap("anagramMap", anagramMap);
  l.comment = "Initialize an empty hash map to store anagrams.";
  l.breakpoint(2);

  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];
    l.simple({ str, i });
    l.arrayV3({ strs: strs }, [
      { value: i, color: "primary", label: "current" },
    ]);
    l.comment = `Processing string: "${str}" at index ${i}.`;
    l.breakpoint(3);

    const sortedStr = str.split("").sort().join("");
    l.simple({ str, i, sortedStr });
    l.comment = `Sorted string "${str}" is "${sortedStr}". This will be the key for the anagram map.`;
    l.breakpoint(4);

    if (!anagramMap.has(sortedStr)) {
      anagramMap.set(sortedStr, []);
      l.simple({ str, i, sortedStr });
      l.hashmap("anagramMap", anagramMap, { key: sortedStr, color: "primary" });
      l.comment = `Key "${sortedStr}" not found. Initialize a new list for it in the map.`;
      l.breakpoint(5);
    }

    anagramMap.get(sortedStr)!.push(str);
    l.simple({ str, i, sortedStr });
    l.hashmap("anagramMap", anagramMap, { key: sortedStr, color: "primary" });
    l.comment = `Add "${str}" to the list of anagrams for key "${sortedStr}".`;
    l.breakpoint(6);
  }

  // Sort each group of anagrams alphabetically
  for (const key of anagramMap.keys()) {
    anagramMap.get(key)!.sort();
  }

  // Get keys, sort them, and then collect values in that order
  const sortedKeys = Array.from(anagramMap.keys()).sort();
  const result = sortedKeys.map((key) => anagramMap.get(key)!);

  l.simple({ anagramMap });
  l.hashmap("anagramMap", anagramMap);
  l.simple({ result }); // Log the final result directly
  l.comment = "Collect all grouped anagrams from the map's values.";
  l.breakpoint(7);

  l.simple({ result }); // Final result state
  l.comment = "Result: The grouped anagrams.";
  l.breakpoint(8);

  return l.getSteps();
}
