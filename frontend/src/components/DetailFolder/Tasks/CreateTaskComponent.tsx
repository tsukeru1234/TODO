import { Link, useParams } from "@tanstack/react-router";
import { useCreateTasks } from "../../../api/tasks";
import DangerButton from "../../Buttons/DangerButton";
import Button from "../../Buttons/Button";

const CreateTaskComponent = () => {
  const { id } = useParams({ from: "/todo/$id" });
  const { mutate, isPending } = useCreateTasks(id);
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    mutate(data);
  };
  return (
    <>
      <form
        className="text-3xl text-my-green-500 font-bold grid place-items-center h-full animate-open-creation-window"
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
              className="pl-2 border-2 border-my-green-100 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-dub-500 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-green-100 focus:outline-none rounded-xl p-1"
              placeholder="Название"
            />
          </label>
          <label className="flex flex-col gap-3">
            Priority
            <input
              type="number"
              max="5"
              min="1"
              defaultValue="1"
              name="priority"
              className="pl-2 border-2 border-my-green-100 bg-my-dark-glass transition-all duration-250 focus:text-my-green-600 focus:border-my-dub-500 focus:bg-my-green-600/40 focus:scale-102 focus:shadow-2xl focus:shadow-my-green-100 focus:outline-none rounded-xl p-1"
            />
          </label>
          <div className="flex justify-end gap-4">
            <Button type="submit">
              <span>{isPending ? "Создание..." : "Создать"}</span>
            </Button>
            <Link from="/" to={`todo/${id}`}>
              <DangerButton type="button">
                <span>Отмена</span>
              </DangerButton>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTaskComponent;
