import { useRegisterMutation } from "../api/register";
import { useSingIngMutation } from "../api/sing_in";

export const useSignInAccPage = () => {
  const { mutate, isPending } = useSingIngMutation();

  const handleSubmitSignIn = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    mutate(data);
  };
  return { handleSubmitSignIn, isPending };
};

export const useSignUpAccPage = () => {
  const { mutate, isPending } = useRegisterMutation();

  const handleSubmitSignUp = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    mutate(data, {});
  };
  return { handleSubmitSignUp, isPending };
};

