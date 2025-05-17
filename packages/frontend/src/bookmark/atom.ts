import { atom } from "jotai";

export const bookmarksAtom = atom(new Set<string>())