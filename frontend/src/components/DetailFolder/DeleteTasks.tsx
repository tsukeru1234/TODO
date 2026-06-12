import { useAtom } from "jotai";
import { deleteStatus, idsDelList } from "./Tasks/util/taskStore";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const DeleteTasks = () => {
  const [, setDelStat] = useAtom(deleteStatus);
  const [, setIdsDelList] = useAtom(idsDelList)
  const handleDelMod = () => {
    setIdsDelList([])
    setDelStat((prev) => !prev)
  }
  return (
    <div className="flex flex-col gap-2.5 text-txt-priority-5 bg-priority-5/95 border-txt-shadow-priority-5 border rounded-2xl px-2.5 py-2.5">
      <button onClick={() => console.log("ещё нет")}>
          <PencilIcon className="min-h-6 w-6 pb-2.5 border-b border-r-my-dub-100" />
        </button>

        <button onClick={handleDelMod}>
          <TrashIcon className="min-h-6 w-6" />
        </button>
    </div>
  );
};

export default DeleteTasks;
