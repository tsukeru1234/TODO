import { useFoldersMutation } from "../../api/folders";
import { Link } from "@tanstack/react-router";
import DangerButton from "../Buttons/DangerButton";
import Button from "../Buttons/Button";

const CreateFolder = () => {
  const { mutate, isPending } = useFoldersMutation();
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    mutate(data);
  };
  return (
    <>
      <form
        className="text-3xl text-my-green-500 font-bold grid place-items-center h-full"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-3">
            Title
            <input
              type="text"
              name="title"
              placeholder="Название папки"
              className="pl-2 border-2 border-my-green-100 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-dub-500 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-green-100 focus:outline-none rounded-xl p-1"
              required
            />
          </label>
          <label className="flex flex-col gap-3">
            Description
            <textarea
              rows={4}
              name="description"
              placeholder="Опишите ваши планы(необязательно)"
              className="pl-2 border-2 border-my-green-100 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-dub-500 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-green-100 focus:outline-none rounded-xl p-1 w-140"
            />
          </label>
          <div className="flex justify-end gap-4">
            <Button
              type="submit"
            >
              <span>{isPending ? "В процессе..." : "Создать"}</span>
            </Button>
            <Link
              from="/"
              to="/todo"
            >
              <DangerButton type="button"><span>Назад</span></DangerButton>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateFolder;
