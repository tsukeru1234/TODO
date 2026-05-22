import { useAtom } from "jotai";
import { Link } from "@tanstack/react-router";
import { accessToken } from "../util/store";
import Button from "../components/Buttons/Button";

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
            >
              <Button type="button"><span className="text-3xl">Войти</span></Button>
            </Link>
        ) : (
            <Link
              to="acc/sing_in"
            >
              <Button type="button"><span className="text-3xl">Начать</span></Button>
            </Link>
        )}
      </div>
    </>
  );
};
