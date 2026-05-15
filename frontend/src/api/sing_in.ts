import { api } from "./api";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getDefaultStore } from "jotai";
import { accessToken } from "../util/store";
import type { UserResponse } from "../@types/types_auth";

const store = getDefaultStore();

interface data {
  [k: string]: FormDataEntryValue;
}

export const useSingIngMutation = () => {
  const navigate = useNavigate();

  return useMutation<UserResponse, Error, data>({
    mutationFn: async (userData: data) => {
      const { data } = await api.post("acc/token/", userData);
      store.set(accessToken, data.access);
      return data;
    },
    onSuccess: () => {
      navigate({ to: "/todo" });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Ошибка входа:", error.response?.data.login);
      }
    },
  });
};
