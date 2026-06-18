import { useAtom } from "jotai";
import { deleteStatus, idsDelList } from "./Tasks/util/taskStore";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const DeleteTasks = () => {
  const [, setDelStat] = useAtom(deleteStatus);
  const [, setIdsDelList] = useAtom(idsDelList);
  const handleDelMod = () => {
    setIdsDelList([]);
    setDelStat((prev) => !prev);
  };
  return (
    <button onClick={handleDelMod}>
      <TrashIcon className="min-h-6 w-6" />
    </button>
  );
};

export default DeleteTasks;
