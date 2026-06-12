import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { useNavigate } from "@tanstack/react-router";
import type { Tasks } from "../@types/types_tasks";
import { updateFolderDetailCache, updateFoldersListCache } from "./util/cacheUpdate";

interface data {
  [k: string]: FormDataEntryValue;
}
export const useCreateTasks = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<Tasks, Error, data>({
    mutationFn: async (taskData: data) => {
      const { data } = await api.post<Tasks>(
        `api/folders/${id}/add_task/`,
        taskData,
      );
      return data;
    },
    onSuccess: (newTask) => {
      updateFolderDetailCache(queryClient, id, 1, 0, {type: 'add', payload: newTask})
      updateFoldersListCache(queryClient, id, 1, 0);
      navigate({ from: "/", to: `/todo/${id}` });
    },
  });
};

export interface status {
  id: string;
  stat: boolean;
}
export interface responseStatus {
  id: string;
  ready_status: boolean;
}

export const useStatusTask = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (status: status) => {
      const { data } = await api.patch<responseStatus>(
        `api/tasks/${status.id}/status/`,
        { ready_status: status.stat },
      );
      return data;
    },
    onSuccess: (updateTaskStatus) => {
      const updated_ready_tasks_count = updateTaskStatus.ready_status ? +1 : -1;
      updateFolderDetailCache(queryClient, id, 0, updated_ready_tasks_count, {type: 'update_status', payload: updateTaskStatus})
      updateFoldersListCache(queryClient, id, 0, updated_ready_tasks_count);
    },
  });
};

export interface delTasksType {
  ids: string;
  deleteCount: number;
  ready_tasks_delete: number;
}

interface idTasksVar {
  ids: string[];
}

export const useBulkDeleteTasks = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<delTasksType, Error, idTasksVar>({
    mutationFn: async (idTasks: idTasksVar) => {
      const { data } = await api.delete("api/tasks/bulk_delete/", {
        data: { ...idTasks },
      });
      return data;
    },
    onSuccess: (delTasks) => {
      updateFolderDetailCache(queryClient, id, -delTasks.deleteCount, -delTasks.ready_tasks_delete, {type: 'delete', payload: delTasks})
      updateFoldersListCache(
        queryClient,
        id,
        -delTasks.deleteCount,
        -delTasks.ready_tasks_delete,
      );
    },
  });
};
