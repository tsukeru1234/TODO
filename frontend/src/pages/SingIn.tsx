import { Link } from "@tanstack/react-router";
import { useSingIngMutation } from "../api/sing_in";
import Button from "../components/Buttons/Button";

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
        className="min-h-120 min-w-120 rounded-4xl dark-glass flex flex-col justify-around items-center font-bold pb-6 3xl:min-h-360 3xl:min-w-360"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-3 text-2xl items-center justify-end h-full w-full 3xl:text-8xl 3xl:gap-6">
          <div className="flex text-my-dub-500 text-shadow-my-dub-400 text-shadow-lg text-[55px] pb-4 pt-6 3xl:text-[160px]">
            To-do
          </div>
          <div className="flex flex-col gap-2 3xl:w-full text-my-green-600 3xl:gap-12">
            <div className="flex flex-col 3xl:m-auto 3xl:gap-6">
              <span className="ml-1 mb-1 text-xl 3xl:text-7xl 3xl:ml-3 3xl:mb-3">
                Login:
              </span>
              <input
                name="login"
                className="border-3 border-my-green-100 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-dub-500 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-dub-400 focus:outline-none rounded-xl p-1 max-w-100 3xl:border-6 3xl:rounded-4xl 3xl:p-3 3xl:max-w-250"
                type="text"
                placeholder="Логин"
                required
              />
            </div>
            <div className="flex flex-col 3xl:gap-6 3xl:m-auto">
              <span className="ml-1 mb-1 text-xl 3xl:text-7xl 3xl:ml-3 3xl:mb-3">
                Password:
              </span>
              <input
                name="password"
                className="border-3 border-my-green-100 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-dub-500 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-dub-400 focus:outline-none rounded-xl p-1 max-w-100 3xl:border-6 3xl:rounded-4xl 3xl:p-3 3xl:max-w-250"
                type="text"
                placeholder="Пароль"
                required
              />
            </div>
          </div>
        </div>
        <hr className="w-100 text-my-dub-500 border-dashed border-2 3xl:w-300 3xl:border-6" />
        <div className="text-3xl flex flex-col gap-2 3xl:w-full 3xl:gap-6 3xl:px-50">
          <Button type="submit">
            <span>{isPending ? "Вход..." : "Войти"}</span>
          </Button>
          <div className="flex flex-col">
            <Link
              to="/acc/registration"
            >
              <Button type="button">
                <span>Зарегестрироваться</span>
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default SingIn;
