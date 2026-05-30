import { Link } from "@tanstack/react-router";
import useRegistrationPage from "../hooks/useRegistrationPage";
import Button from "../components/Buttons/Button";

const Registration = () => {
  const { isPending, password, setPassword, errors, handleSubmit } =
    useRegistrationPage();

  return (
    <>
      <form
        className="min-h-150 min-w-120 rounded-4xl dark-glass flex flex-col justify-around items-center font-bold pb-6 3xl:min-h-450 3xl:min-w-360 3xl:pb-12"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-3 text-2xl text-my-green-600 items-center justify-end h-full 3xl:text-8xl 3xl:w-full">
          <div className="flex flex-col text-center text-my-dub-500 text-shadow-my-dub-400 text-shadow-lg text-[55px] pb-4 pt-6 3xl:text-[150px] 3xl:pb-8 3xl:pt-12">
            To-do
            <span className="text-3xl 3xl:text-7xl">Регистрация</span>
          </div>
          <div className="flex flex-col gap-2 3xl:m-auto 3xl:gap-6">
            <div className="flex flex-col 3xl:w-full">
              <div className="flex flex-col 3xl:w-full">
                <span className="ml-1 mb-1 text-xl 3xl:text-7xl 3xl:ml-3 3xl:mb-3">
                  Login:
                  {errors?.login && (
                    <span className="text-center text-red-600 text-xl underline ml-2">
                      {errors.login}
                    </span>
                  )}
                </span>
                <input
                  name="login"
                  className="border-3 border-my-green-100 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-dub-500 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-dub-400 focus:outline-none rounded-xl p-1 max-w-100 3xl:border-6 3xl:rounded-4xl 3xl:p-3 3xl:max-w-250"
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
                  className="border-3 border-my-green-100 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-dub-500 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-dub-400 focus:outline-none rounded-xl p-1 max-w-100 3xl:border-6 3xl:rounded-4xl 3xl:p-3 3xl:max-w-250"
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
                  className={`${password.length >= 8 ? "" : "text-red-600"}`}
                >
                  В пароле 8 символов
                </span>
                <span
                  className={`${/[A-Z]/.test(password) ? "" : "text-red-600"}`}
                >
                  В пароле есть заглавные символы
                </span>
                <span
                  className={`${/[\d]/.test(password) ? "" : "text-red-600"}`}
                >
                  В пароле есть цифры
                </span>
                <span
                  className={`${/[!@#$%^&*()_=+\-=[\]{};':"\\|,.<>/?~]/.test(password) ? "" : "text-red-600"}`}
                >
                  В пароле есть спец символ
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-100 text-my-dub-500 border-dashed border-2 3xl:w-300 3xl:border-6" />
        <div className="text-3xl flex flex-col gap-2">
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

          <Link to="/acc/sing_in">
            <Button type="button">
              <span>Назад</span>
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Registration;
