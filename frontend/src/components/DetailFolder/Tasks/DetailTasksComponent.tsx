import type { Tasks } from "../../../@types/types_tasks";
import { useFolderDetail } from "../../../api/folders";
import { Link } from "@tanstack/react-router";
import List from "../../List";
import { priorityColor } from "./util/priorityTasks";
import Button from "../../Buttons/Button";

interface DetailFolderTypes {
  id: string;
}

const DetailTasksComponent = ({ id }: DetailFolderTypes) => {
  const folderDetailData = useFolderDetail(id);
  if (!folderDetailData) return;

  return (
    <>
      <div className="w-full flex flex-col gap-2 3xl:gap-4">
        <List
          data={folderDetailData?.tasks.sort((a, b) => a.priority - b.priority)}
          mainClass="inline-flex justify-between w-full bg-my-green-600/5 rounded-xl pr-2 wrap-anywhere 3xl:pr-6 3xl:rounded-3xl"
          render={(item: Tasks) => {
            const { bg, txt } = priorityColor(item.priority);
            return (
              <>
                <span className={`${bg} ${txt} pl-3 pr-2 text-center rounded-l-xl 3xl:rounded-l-3xl 3xl:pl-6 3xl:pr-5`}>
                  {item.priority}
                </span>
                <label className="inline-flex justify-between w-full ml-2 text-my-green-100 3xl:ml-6">
                  {item.title}
                  <input type="checkbox" />
                </label>
              </>
            );
          }}
        /></div>
      <Link
        to="/todo/$id/create-task"
      >
        <Button type="button"><span className="text-xl">Создать задачу</span></Button>
      </Link>
    </>
  );
};

export default DetailTasksComponent;
