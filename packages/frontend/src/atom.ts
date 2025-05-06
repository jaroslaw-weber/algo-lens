import { atom } from "jotai";
import type { Problem, ProblemState } from "algo-lens-core";

export const problemsAtom = atom<Problem<any,any>[]>([]);

export const problemAtom = atom<Problem<any,any> | null>(null);

export const stepAtom = atom<number>(1);

export const maxStepAtom = atom<number>(100);

export const testcaseIndexAtom = atom<number>(0);

export const problemStateAtom = atom<ProblemState | null>(null);