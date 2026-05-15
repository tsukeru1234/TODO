import { api } from "./api";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type {
  folderCreateData,
  folderData,
  folderRedact,
  foldersData,
} from "../@types/types_folders";

interface data {
  [k: string]: FormDataEntryValue;
}

export const useFoldersGet = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const { data } = await api.get<foldersData[]>("/api/folders/");
      return data;
    },
  });
  return data;
};

export const useFolderDetail = (id: string) => {
  const { data } = useSuspenseQuery({
    queryKey: ["folder_detail", id],
    queryFn: async () => {
      const { data } = await api.get<folderData>(`/api/folders/${id}/`);
      return data;
    },
  });
  return data;
};

export const useFoldersMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (folderData: data) => {
      const { data } = await api.post<folderCreateData>(
        "api/folders/",
        folderData,
      );
      return data;
    },
    onSuccess: (newFolder) => {
      queryClient.setQueryData<foldersData[]>(["folders"], (old) =>
        old ? [...old, newFolder] : [newFolder],
      );
      navigate({ to: "/todo" });
    },
  });
};

export const useFolderRedact = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (folderData: data) => {
      const { data } = await api.patch<folderRedact>(
        `api/folders/${id}/rename/`,
        folderData,
      );
      return data;
    },
    onSuccess: (updateFolderData) => {
      queryClient.setQueryData<foldersData[]>(
        ["folders"],
        (old) =>
          old?.map((folder) =>
            folder.id === id
              ? {
                  id: folder.id,
                  ...updateFolderData,
                  progress: folder.progress,
                  task_count: folder.task_count,
                }
              : { ...folder },
          ) ?? old,
      );
      queryClient.setQueryData<folderData>(["folder_detail", id], (old) => {
        if (!old) return old;
        return {
          id: old?.id,
          ...updateFolderData,
          progress: old?.progress,
          task_count: old?.task_count,
          tasks: old?.tasks,
        };
      }); //! тут исправь позже типы
    },
  });
};
