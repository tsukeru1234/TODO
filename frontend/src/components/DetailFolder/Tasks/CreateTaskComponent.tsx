import { Link, useParams } from "@tanstack/react-router";
import { useCreateTasks } from "../../../api/tasks";

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
            <button
              type="submit"
              className="px-3 bg-my-green-600 shadow-lg shadow-black/40 border-3 border-my-green-100 outline-0 text-my-green-100 rounded-xl text-center transition-all duration-250 hover:scale-102 hover:shadow-xl hover:shadow-my-green-100 hover:pb-1 active:bg-my-green-100 active:text-my-green-500 active:scale-95"
            >
              {isPending ? "Создание..." : "Создать"}
            </button>
            <Link
              from="/"
              to={`todo/${id}`}
              className="px-3 bg-my-dub-600 shadow-lg shadow-black/40 border-3 border-my-dub-100 outline-0 text-my-dub-200 rounded-xl text-center transition-all duration-250 hover:scale-102 hover:shadow-xl hover:shadow-my-dub-100 hover:pb-1 active:bg-my-dub-100 active:text-my-dub-600 active:scale-95"
            >
              Отмена
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTaskComponent;
