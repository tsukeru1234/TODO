import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { useNavigate } from "@tanstack/react-router";
import type { folderData } from "../@types/types_folders";
import type { Tasks } from "../@types/types_tasks";

interface data {
  [k: string]: FormDataEntryValue;
}
export const useCreateTasks = (id: string) => {
  const queryclient = useQueryClient();
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
      queryclient.setQueryData(["folder_detail", id], (old: folderData) => {
        return {
          id: old.id,
          title: old.title,
          description: old.description,
          progress: old.progress,
          task_count: old.task_count,
          tasks: [...old.tasks, newTask],
        };
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
        if (!old) return old;
        return {
          ...old,
          tasks: old?.tasks.map((task) => task.id === updateTaskStatus.id ? {...updateTaskStatus} : task) ?? [],
        }}
      );
    },
  });
};
