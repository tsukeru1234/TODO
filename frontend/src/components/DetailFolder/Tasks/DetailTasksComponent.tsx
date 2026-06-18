import { Link } from "@tanstack/react-router";
import Button from "../../Buttons/Button";
import FilteredReadyStatus from "./FilteredReadyStatus";
import type { folderData } from "../../../@types/types_folders";
import { useAtom } from "jotai";
import { deleteStatus } from "./util/taskStore";
import DeleteTasksButton from "../DeleteTasksButton";
import DeleteTasks from "../DeleteTasks";

interface DetailFolderTypes {
  detailData: folderData;
}

const DetailTasksComponent = ({ detailData }: DetailFolderTypes) => {
  const [delStat] = useAtom(deleteStatus);
  if (!detailData) return;

  return (
    <>
      <div className="w-full flex flex-col overflow-auto h-full">
        <FilteredReadyStatus data={detailData} />
      </div>
      {delStat ? (
        <DeleteTasksButton id={detailData.id} />
      ) : (
        <div className="w-full flex gap-2">
          <Link to="/todo/$id/create-task" className="flex justify-center w-full">
            <Button type="button">
              <span className="text-xl">+</span>
            </Button>
          </Link>
          <div className="text-sematic-bad-text bg-sematic-bad border-sematic-bad-border border-3 grid place-content-center rounded-2xl px-5"><DeleteTasks /></div>
        </div>
      )}
    </>
  );
};

export default DetailTasksComponent;
