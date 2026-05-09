import { Link, useParams } from "@tanstack/react-router";
import { useCreateTasks } from "../api/tasks";

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
      <div className="text-amber-50">Пенис</div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>
          title
          <input type="text" name="title" className="" />
        </label>
        <label>
          priority
          <input
            type="number"
            max="5"
            min="1"
            defaultValue="1"
            name="priority"
          />
        </label>
        <button type="submit">{isPending ? "Создание..." : "Создать"}</button>
        <Link from="/" to={`todo/${id}`}>
          Отмена
        </Link>
      </form>
    </>
  );
};

export default CreateTaskComponent;
