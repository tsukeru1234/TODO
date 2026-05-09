import { api } from "./api";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getDefaultStore } from "jotai";
import { accessToken } from "../util/store";

const store = getDefaultStore();

interface data {
  [k: string]: FormDataEntryValue;
}

interface UserResponse {
  login: string;
  password: string;
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
