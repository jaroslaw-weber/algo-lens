import { atom } from "jotai";
import type { Problem, ProblemState } from "./types";

export const problemsAtom = atom<Problem[]>([]);

export const problemAtom = atom<Problem | null>(null);

export const stepAtom = atom<number>(0);

export const problemStateAtom = atom<ProblemState | null>(null);``