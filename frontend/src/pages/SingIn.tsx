import { Link } from "@tanstack/react-router";
import { useSingIngMutation } from "../api/sing_in";

const SingIn = () => {
  const { mutate, isPending } = useSingIngMutation();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    mutate(data);
  };

  return (
    <>
      <form
        className="min-h-120 min-w-120 rounded-4xl dark-glass flex flex-col justify-around items-center font-bold pb-6"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-3 text-2xl text-my-violet-100 items-center justify-end h-full">
          <div className="flex text-my-violet-100 text-shadow-my-violet-100 text-shadow-lg text-[55px] pb-4 pt-6">
            To-do
          </div>
          <div className="flex flex-col gap-2 text-my-green-600">
            <div className="flex flex-col">
              <span className="ml-1 mb-1 text-xl">Login:</span>
              <input
                name="login"
                className="border-3 border-my-violet-200 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-green-100 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-green-100 focus:outline-none rounded-xl p-1 max-w-100"
                type="text"
                placeholder="Логин"
                required
              />
            </div>
            <div className="flex flex-col">
              <span className="ml-1 mb-1 text-xl">Password:</span>
              <input
                name="password"
                className="border-3 border-my-violet-200 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-green-100 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-green-100 focus:outline-none rounded-xl p-1 max-w-100"
                type="text"
                placeholder="Пароль"
                required
              />
            </div>
          </div>
        </div>
        <hr className="w-100 text-my-violet-100 border-dashed border-2" />
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="border-3 rounded-3xl border-my-green-100 bg-my-green-600 text-2xl text-my-green-200 p-1 hover:text-my-green-100 transition-all duration-250 hover:scale-102 hover:shadow-2xl hover:shadow-my-green-100 active:bg-my-green-100 active:text-my-green-500  active:scale-95"
          >
            {isPending ? "Вход..." : "Войти"}
          </button>
          <div className="flex flex-col">
            <Link
              to="/acc/registration"
              type="button"
              className="border-3 rounded-3xl border-my-green-100 bg-my-green-600 text-2xl text-my-green-200 hover:text-my-green-100 transition-all duration-250 hover:scale-102 p-1 pl-2 pr-2 hover:shadow-2xl hover:shadow-my-green-100 active:bg-my-green-100 active:text-my-green-500  active:scale-95"
            >
              Зарегестрироваться
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default SingIn;
