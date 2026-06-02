import { Link } from "@tanstack/react-router";
import Button from "../../Buttons/Button";
import FilteredReadyStatus from "./FilteredReadyStatus";
import type { folderData } from "../../../@types/types_folders";
import { useAtom } from "jotai";
import { deleteStatus, idsDelList } from "./util/taskStore";
import DangerButton from "../../Buttons/DangerButton";
import { useBulkDeleteTasks } from "../../../api/tasks";

interface DetailFolderTypes {
  detailData: folderData;
}

const DetailTasksComponent = ({ detailData }: DetailFolderTypes) => {
  const [delStat, setDelStat] = useAtom(deleteStatus);
  const [idsTasksDelList, setTasksIdsDelList] = useAtom(idsDelList);
  const { mutate, isPending } = useBulkDeleteTasks()
  if (!detailData) return;
  const handleBulkDel = () => {
    mutate(idsTasksDelList)
    setTasksIdsDelList([])
    setDelStat(false)
  }

  return (
    <>
      <div className="w-full flex flex-col overflow-auto h-full">
        <FilteredReadyStatus data={detailData} />
      </div>
      {delStat ? (<DangerButton type="button" click={handleBulkDel}><span>{isPending ? "Удаление" : "Удалить выбранные"}</span></DangerButton>) : (<Link to="/todo/$id/create-task" className="flex justify-center">
        <Button type="button">
          <span className="text-xl">Создать задачу</span>
        </Button>
      </Link>)}
    </>
  );
};

export default DetailTasksComponent;
