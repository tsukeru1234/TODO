import { useMutation } from "@tanstack/react-query";
import { api } from "./api";

interface data {
  [k: string]: FormDataEntryValue;
}

export const useCreateTasks = (id: string) => {
  return useMutation({
    mutationFn: async (taskData: data) => {
      const { data } = await api.post(`api/folders/${id}/add_task/`, taskData);
      return data;
    },
  });
};
