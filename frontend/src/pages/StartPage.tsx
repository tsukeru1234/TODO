import { useAtom } from "jotai";
import { Link } from "@tanstack/react-router";
import { accessToken } from "../util/store";

export const StartPage = () => {
  const [token] = useAtom(accessToken);
  return (
    <>
      <div className="min-h-50 min-w-100 rounded-4xl dark-glass flex flex-col justify-around items-center font-bold text-2xl text-my-dub-500 pr-15 pl-15">
        <span className="text-shadow-my-dub-400 text-shadow-lg text-4xl pt-5">
          Todo
        </span>
        {token ? (
          <Link
            to="/todo"
            className="w-full text-center border-3 rounded-3xl border-my-green-100 bg-my-green-600 text-2xl text-my-green-200 hover:text-my-green-100 hover:pb-1 transition-all duration-250 hover:scale-102 hover:shadow-2xl hover:shadow-my-green-100 active:bg-my-green-100 active:text-my-green-500 active:scale-95"
          >
            Начать
          </Link>
        ) : (
          <Link
            to="acc/sing_in"
            className="w-full text-center border-3 rounded-3xl border-my-green-100 bg-my-green-600 text-2xl text-my-green-200 hover:text-my-green-100 hover:pb-1 transition-all duration-250 hover:scale-102 hover:shadow-2xl hover:shadow-my-green-100 active:bg-my-green-100 active:text-my-green-500 active:scale-95"
          >
            Войти
          </Link>
        )}
      </div>
    </>
  );
};
