import { Link } from "@tanstack/react-router";
import useRegistrationPage from "../hooks/useRegistrationPage";

const Registration = () => {
  const { isPending, password, setPassword, errors, handleSubmit } =
    useRegistrationPage();

  return (
    <>
      <form
        className="min-h-150 min-w-120 rounded-4xl dark-glass flex flex-col justify-around items-center font-bold pb-6"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-3 text-2xl text-my-violet-100 items-center justify-end h-full">
          <div className="flex flex-col text-center text-my-violet-100 text-shadow-my-violet-100 text-shadow-lg text-[55px] pb-4 pt-6">
            To-do
            <span className="text-3xl text-shadow-md text-shadow-my-violet-100">
              Регистрация
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <span className="ml-1 mb-1 text-xl">
                  Login:
                  {errors?.login && (
                    <span className="text-center text-red-600 text-xl underline ml-2">
                      {errors.login}
                    </span>
                  )}
                </span>
                <input
                  name="login"
                  className="border-3 border-my-violet-200 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-green-100 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-green-100 focus:outline-none rounded-xl p-1 max-w-100"
                  type="text"
                  placeholder="Ваш login"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <span className="ml-1 text-xl mb-1">Password:</span>
                <input
                  name="password"
                  className="border-3 border-my-violet-200 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-green-100 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-green-100 focus:outline-none rounded-xl p-1 max-w-100"
                  type="password"
                  placeholder="Ваш пароль"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex flex-col text-base ">
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
        <hr className="w-100 text-my-violet-100 border-dashed border-2" />
        <div className="flex flex-col gap-2">
          {/[!@#$%^&*()_=+\-=[\]{};':"\\|,.<>/?~]/.test(password) &&
            /[\d]/.test(password) &&
            /[A-Z]/.test(password) &&
            password.length >= 8 && (
              <button
                type="submit"
                className="border-3 rounded-3xl border-my-green-100 bg-my-green-600 text-2xl text-my-green-200 p-1 hover:text-my-green-100 transition-all duration-250 hover:scale-102 hover:shadow-2xl hover:shadow-my-green-100 active:bg-my-green-100 active:text-my-green-500  active:scale-95"
              >
                {isPending ? "Регистрация..." : "Зарегестрироваться"}
              </button>
            )}
          <div className="flex flex-col">
            <Link
              to="/acc/sing_in"
              type="button"
              className="border-3 rounded-3xl border-my-green-100 bg-my-green-600 text-2xl text-my-green-200 hover:text-my-green-100 transition-all duration-250 hover:scale-102 p-1 pl-2 pr-2 hover:shadow-2xl hover:shadow-my-green-100 active:bg-my-green-100 active:text-my-green-500  active:scale-95 text-center"
            >
              Назад
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Registration;
