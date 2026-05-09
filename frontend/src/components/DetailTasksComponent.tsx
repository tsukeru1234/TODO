import { useFolderDetail } from "../api/folders";
import { Link } from "@tanstack/react-router";

interface DetailFolderTypes {
  id: string;
}

const DetailTasksComponent = ({ id }: DetailFolderTypes) => {
  const folderDetailData = useFolderDetail(id);
  const priorityColor = (priority: number) => {
    return {
      bg: `bg-priority-${priority}`,
      txt: `text-txt-priority-${priority} text-shadow-md text-shadow-txt-shadow-priority-${priority}`,
    };
  };
  if (!folderDetailData) return;
  const tasks = folderDetailData?.tasks.map((task) => {
    const { bg, txt } = priorityColor(task.priority);
    return (
      <span
        className="inline-flex justify-between w-full bg-my-green-600/5 rounded-xl pr-2 wrap-anywhere"
        key={task.id}
      >
        <span className={`${bg} ${txt} pl-3 pr-2 text-center rounded-l-xl `}>
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

export default DetailTasksComponent;
