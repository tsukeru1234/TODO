import { useRegisterMutation } from "../api/register";
import { useState } from "react";
import axios from "axios";

interface Errors {
  login?: string;
  password?: string;
}

const useRegistrationPage = () => {
  const { mutate, isPending } = useRegisterMutation();
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!data.password || !data.login) {
      alert("Заполните поля");
      return;
    }

    mutate(data, {
      onSuccess: () => {
        setErrors({});
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          setErrors({ login: error.response?.data.login });
        }
      },
    });
  };
  return { isPending, password, setPassword, errors, handleSubmit };
};

export default useRegistrationPage;
