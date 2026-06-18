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
        className="min-h-120 min-w-120 rounded-4xl dark-hard-glass flex flex-col justify-around items-center font-bold pb-6"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-3 text-2xl items-center justify-end h-full w-full">
          <div className="flex text-accent text-shadow-accent-shadow text-shadow-lg text-[55px] pb-4 pt-6">
            To-do
          </div>
          <div className="flex flex-col gap-2 3xl:w-full text-sematic-good 3xl:gap-12">
            <div className="flex flex-col text-neutral">
              <span className="ml-1 mb-1 text-xl">
                Login:
              </span>
              <input
                name="login"
                className="border-3 border-sematic-good-border transition-all duration-250 focus:text-sematic-good-text focus:border-sematic-good focus:scale-102 focus:shadow-2xl focus:shadow-sematic-good focus:bg-sematic-good focus:outline-none rounded-xl p-1 max-w-100"
                type="text"
                placeholder="Логин"
                required
              />
            </div>
            <div className="flex flex-col text-neutral">
              <span className="ml-1 mb-1 text-xl 3xl:text-7xl 3xl:ml-3 3xl:mb-3">
                Password:
              </span>
              <input
                name="password"
                className="border-3 border-sematic-good-border transition-all duration-250 focus:text-sematic-good-text focus:border-sematic-good focus:shadow-sematic-good focus:bg-sematic-good focus:scale-102 focus:outline-none rounded-xl p-1 max-w-100 3xl:border-6 3xl:rounded-4xl 3xl:p-3 3xl:max-w-250"
                type="text"
                placeholder="Пароль"
                required
              />
            </div>
          </div>
        </div>
        <hr className="w-100 text-secondary border-dashed border-2 3xl:w-300 3xl:border-6" />
        <div className="text-3xl flex flex-col gap-2">
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
