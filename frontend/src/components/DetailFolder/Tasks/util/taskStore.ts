import { atom } from "jotai";
import type { Tasks } from "../../../../@types/types_tasks";

export type Filter = "ALL" | "READY" | "NOT_READY";

export const filterStatus = atom<Filter>("ALL");

export const filterTasksData = (data: Tasks[], myStatus: Filter) => {
  return myStatus === "ALL"
    ? data
    : myStatus === "READY"
      ? data.filter((task) => task.ready_status == true)
      : data.filter((task) => task.ready_status == false);
};

export const deleteStatus = atom<boolean>(false);

export const idsDelList = atom<string[]>([]);

export const updateProgress = (old: Tasks[]) => {
  const ready = old.filter((task) => task.ready_status == true);
  return ready.length;
};
