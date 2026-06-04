import { Link } from "@tanstack/react-router";
import Button from "../../Buttons/Button";
import FilteredReadyStatus from "./FilteredReadyStatus";
import type { folderData } from "../../../@types/types_folders";
import { useAtom } from "jotai";
import { deleteStatus } from "./util/taskStore";
import DeleteTasksButton from "./DeleteTasksButton";

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
      {delStat ? (<DeleteTasksButton id={detailData.id} />) : (<Link to="/todo/$id/create-task" className="flex justify-center">
        <Button type="button">
          <span className="text-xl">Создать задачу</span>
        </Button>
      </Link>)}
    </>
  );
};

export default DetailTasksComponent;
