import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const open = atom<boolean>(false);
export const renOpen = atom<boolean>(false);

export const accessToken = atomWithStorage<string | null>("token", null);
