import { useAtom } from "jotai";
import { useBulkDeleteTasks } from "../../api/tasks";
import { deleteStatus, idsDelList } from "./Tasks/util/taskStore";
import BadButton from "../Buttons/BadButton";

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
    <BadButton type="button" click={handleBulkDel}>
      <span>{isPending ? "Удаление" : "Удалить выбранные"}</span>
    </BadButton>
  );
};

export default DeleteTasksButton;
