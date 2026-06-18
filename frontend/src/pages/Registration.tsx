import { Link } from "@tanstack/react-router";
import useRegistrationPage from "../hooks/useRegistrationPage";
import Button from "../components/Buttons/Button";

const Registration = () => {
  const { isPending, password, setPassword, errors, handleSubmit } =
    useRegistrationPage();

  return (
    <>
      <form
        className="min-h-150 min-w-120 rounded-4xl dark-hard-glass flex flex-col justify-around items-center font-bold pb-6"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-3 text-2xl items-center justify-end h-full">
          <div className="flex flex-col text-center text-accent text-shadow-accent-shadow text-shadow-lg text-[55px] pb-4 pt-6 3xl:text-[150px] 3xl:pb-8 3xl:pt-12">
            To-do
            <span className="text-3xl 3xl:text-7xl">Регистрация</span>
          </div>
          <div className="flex flex-col gap-2 text-sematic-good">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <span className="ml-1 mb-1 text-xl">
                  Login:
                  {errors?.login && (
                    <span className="text-center text-sematic-bad-text text-xl underline ml-2">
                      {errors.login}
                    </span>
                  )}
                </span>
                <input
                  name="login"
                  className="border-3 border-sematic-good-border bg-my-dark-glass transition-all duration-250 focus:text-sematic-good-text focus:border-sematic-good focus:shadow-sematic-good focus:bg-sematic-good focus:scale-102 focus:shadow-2xl focus:outline-none rounded-xl p-1 max-w-100 3xl:border-6 3xl:rounded-4xl 3xl:p-3 3xl:max-w-250"
                  type="text"
                  placeholder="Ваш login"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <span className="ml-1 text-xl mb-1 3xl:text-7xl 3xl:ml-3 3xl:mb-3">
                  Password:
                </span>
                <input
                  name="password"
                  className="border-3 border-sematic-good-border bg-my-dark-glass transition-all duration-250 focus:text-sematic-good-text focus:border-sematic-good focus:shadow-sematic-good focus:bg-sematic-good focus:scale-102 focus:shadow-2xl focus:outline-none rounded-xl p-1 max-w-100 3xl:border-6 3xl:rounded-4xl 3xl:p-3 3xl:max-w-250"
                  type="password"
                  placeholder="Ваш пароль"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex flex-col text-base 3xl:text-5xl">
                <span
                  className={`${password.length >= 8 ? "text-neutral" : "text-sematic-bad-text"}`}
                >
                  В пароле 8 символов
                </span>
                <span
                  className={`${/[A-Z]/.test(password) ? "text-neutral" : "text-sematic-bad-text"}`}
                >
                  В пароле есть заглавные символы
                </span>
                <span
                  className={`${/[\d]/.test(password) ? "text-neutral" : "text-sematic-bad-text"}`}
                >
                  В пароле есть цифры
                </span>
                <span
                  className={`${/[!@#$%^&*()_=+\-=[\]{};':"\\|,.<>/?~]/.test(password) ? "text-neutral" : "text-sematic-bad-text"}`}
                >
                  В пароле есть спец символ
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-100 text-secondary border-dashed border-2 3xl:w-300 3xl:border-6" />
        <div className="text-3xl flex flex-col gap-2 items-center w-full px-15">
          {/[!@#$%^&*()_=+\-=[\]{};':"\\|,.<>/?~]/.test(password) &&
            /[\d]/.test(password) &&
            /[A-Z]/.test(password) &&
            password.length >= 8 && (
              <Button type="submit">
                <span>
                  {isPending ? "Регистрация..." : "Зарегестрироваться"}
                </span>
              </Button>
            )}

          <Link to="/acc/sing_in" className="w-full">
            <Button type="button">
              <span>Войти</span>
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Registration;
