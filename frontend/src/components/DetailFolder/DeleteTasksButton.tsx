import { useAtom } from "jotai";
import DangerButton from "../Buttons/DangerButton";
import { useBulkDeleteTasks } from "../../api/tasks";
import { deleteStatus, idsDelList } from "./Tasks/util/taskStore";

const DeleteTasksButton = ({ id }: { id: string }) => {
  const [, setDelStat] = useAtom(deleteStatus);
  const [idsTasksDelList, setTasksIdsDelList] = useAtom(idsDelList);
  const { mutate, isPending } = useBulkDeleteTasks(id);
  const handleBulkDel = () => {
    mutate({ ids: idsTasksDelList });
    setTasksIdsDelList([]);
    setDelStat(false);
  };
  return (
    <DangerButton type="button" click={handleBulkDel}>
      <span>{isPending ? "Удаление" : "Удалить выбранные"}</span>
    </DangerButton>
  );
};

export default DeleteTasksButton;
