import type { QueryClient } from "@tanstack/react-query";
import type { folderData, foldersData } from "../../@types/types_folders";
import type { Tasks } from "../../@types/types_tasks";
import type { delTasksType, responseStatus } from "../tasks";

export const updateFoldersListCache = (
  queryClient: QueryClient,
  folder_id: string,
  task_count_update: number,
  ready_tasks_update: number,
) => {
  queryClient.setQueryData(["folders"], (old: foldersData[]) => {
    if (!old) return [];
    return old.map((folder) => {
      if (folder.id != folder_id) return folder;
      const newTaskCount = folder.task_count + task_count_update;
      const newReadyTasks = folder.ready_tasks + ready_tasks_update;
      const newProgress =
        newTaskCount > 0
          ? Number(((newReadyTasks / newTaskCount) * 100).toFixed(2))
          : 0.0;
      return {
        ...folder,
        task_count: newTaskCount,
        ready_tasks: newReadyTasks,
        progress: newProgress,
      };
    });
  });
};

export const updateFolderDetailCache = (
  queryClient: QueryClient,
  folder_id: string,
  task_count_update: number,
  ready_tasks_update: number,
  tasks_update?: CacheUpdateAction,
) => {
  queryClient.setQueryData(["folder_detail", folder_id], (old: folderData) => {
    if (!old) return undefined;
    const newTaskCount = old.task_count + task_count_update;
    const newReadyTasks = old.ready_tasks + ready_tasks_update;
    const newProgress: number =
      newTaskCount > 0
        ? Number(((newReadyTasks / newTaskCount) * 100).toFixed(2))
        : 0.0;

    const newTasksCache = updateTaskCache(old.tasks, tasks_update);

    return {
      ...old,
      ready_tasks: newReadyTasks,
      progress: newProgress,
      task_count: newTaskCount,
      tasks: newTasksCache,
    };
  });
};

type AddAction = {
  type: "add";
  payload: Tasks;
};

type UpdateAction = {
  type: "update_status";
  payload: responseStatus;
};

type DeleteAction = {
  type: "delete";
  payload: delTasksType;
};
type CacheUpdateAction = AddAction | UpdateAction | DeleteAction;

const updateTaskCache = (
  oldTask: Tasks[],
  tasks_update?: CacheUpdateAction,
) => {
  if (!oldTask) return [];
  switch (tasks_update?.type) {
    case "add":
      return oldTask
        ? [...oldTask, tasks_update.payload]
        : [tasks_update.payload];
      break;

    case "update_status":
      return (
        oldTask.map((task) =>
          task.id === tasks_update.payload.id
            ? { ...task, ...tasks_update.payload }
            : task,
        ) ?? []
      );
      break;
    case "delete":
      return oldTask.filter(
        (task) => !tasks_update.payload.ids.includes(task.id),
      );
      break;
  }
  return [...oldTask];
};
