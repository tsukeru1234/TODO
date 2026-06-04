import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { useNavigate } from "@tanstack/react-router";
import type { folderData, foldersData } from "../@types/types_folders";
import type { Tasks } from "../@types/types_tasks";

interface data {
  [k: string]: FormDataEntryValue;
}
export const useCreateTasks = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (taskData: data) => {
      const { data } = await api.post<folderData>(
        `api/folders/${id}/add_task/`,
        taskData,
      );
      return data;
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData(["folder_detail", id], (old: folderData) => {
        if (!old) return undefined;
        const newTaskCount = old.task_count + 1;
        const newProgress: number =
          newTaskCount > 0
            ? Number(
                ((old.ready_tasks / (old.task_count + 1)) * 100).toFixed(2),
              )
            : 0.0;
        return {
          ...old,
          progress: newProgress,
          task_count: newTaskCount,
          tasks: old.tasks ? [...old.tasks, newTask] : [newTask],
        };
      });
      queryClient.setQueryData(["folders"], (old: foldersData[]) => {
        if (!old) return [];
        return old.map((folder) => {
          if (folder.id != id) return folder;
          const newTaskCount = folder.task_count + 1;
          const newProgress: number =
            newTaskCount > 0
              ? Number(((folder.ready_tasks / newTaskCount) * 100).toFixed(2))
              : 0.0;
          return {
            ...folder,
            task_count: newTaskCount,
            progress: newProgress,
          };
        });
      });
      navigate({ from: "/", to: `/todo/${id}` });
    },
  });
};

export interface status {
  id: string;
  stat: boolean;
}

export const useStatusTask = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (status: status) => {
      const { data } = await api.patch<Tasks>(
        `api/tasks/${status.id}/status/`,
        { ready_status: status.stat },
      );
      return data;
    },
    onSuccess: (updateTaskStatus) => {
      queryClient.setQueryData<folderData>(["folder_detail", id], (old) => {
        if (!old) return undefined;
        const newReadyTasks = updateTaskStatus.ready_status
          ? old.ready_tasks + 1
          : old.ready_tasks - 1;
        const newProgress =
          old.task_count > 0
            ? Number(((newReadyTasks / old.task_count) * 100).toFixed(2))
            : 0;
        return {
          ...old,
          ready_tasks: newReadyTasks,
          progress: newProgress,
          tasks:
            old?.tasks.map((task) =>
              task.id === updateTaskStatus.id ? { ...updateTaskStatus } : task,
            ) ?? [],
        };
      });
      queryClient.setQueryData(["folders"], (old: foldersData[]) => {
        if (!old) return [];
        return old.map((folder) => {
          if (folder.id != id) return folder;
          const newReadyTasks = updateTaskStatus.ready_status
            ? folder.ready_tasks + 1
            : folder.ready_tasks - 1;
          const newProgress =
            folder.task_count > 0
              ? Number(((newReadyTasks / folder.task_count) * 100).toFixed(2))
              : 0.0;
          return {
            ...folder,
            ready_tasks: newReadyTasks,
            progress: newProgress,
          };
        });
      });
    },
  });
};

interface delTasksType {
  ids: string
  deleteCount: number
}

interface idTasksVar {
  ids: string[]
}

export const useBulkDeleteTasks = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<delTasksType, Error, idTasksVar>({
    mutationFn: async (idTasks: idTasksVar) => {
      const { data } = await api.delete("api/tasks/bulk_delete/", {
        data: { ids: idTasks },
      });
      return data
    },
    onSuccess: (delTasks) => {
      queryClient.setQueryData(['folder_detail', id], (old: folderData) => {
        if (!old) return undefined
      })
    }
  });
};
