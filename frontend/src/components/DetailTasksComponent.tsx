import { useFolderDetail } from "../api/folders";
import { Link } from "@tanstack/react-router";

interface DetailFolderTypes {
  id: string;
}

const DetailComponent = ({ id }: DetailFolderTypes) => {
  const folderDetailData = useFolderDetail(id);
  const priorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "bg-my-red-100";
      case 2:
        return "bg-my-violet-300";
      case 3:
        return "bg-my-blue-100";
      case 4:
        return "bg-my-green-700";
      default:
        return "bg-my-green-600";
    }
  };
  if (!folderDetailData) return;
  const tasks = folderDetailData?.tasks.map((task) => {
    const bg = priorityColor(task.priority);
    return (
      <span
        className="inline-flex justify-between w-full bg-my-green-600/5 rounded-xl pr-2 wrap-anywhere"
        key={task.id}
      >
        <span className={`${bg} pl-3 pr-2 text-center rounded-l-xl `}>
          {task.priority}
        </span>
        <label className="inline-flex justify-between w-full ml-2 text-my-green-100">
          {task.title}
          <input type="checkbox" />
        </label>
      </span>
    );
  });
  return (
    <>
      <div className="w-full flex flex-col gap-2">{tasks}</div>
      <Link
        to="/todo/$id/create-task"
        className="m-2 bg-my-green-600 shadow-lg shadow-black/40 border-3 border-my-green-100 outline-0 text-my-green-100 rounded-xl text-center transition-all duration-250 hover:scale-102 hover:shadow-xl hover:shadow-my-green-100 active:bg-my-green-100 active:text-my-green-500 active:scale-95"
      >
        Создать задачу
      </Link>
    </>
  );
};

export default DetailComponent;
