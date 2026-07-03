import { useAtom } from "jotai";
import { deleteStatus, idsDelList } from "./Tasks/util/taskStore";
import BadButton from "../Buttons/BadButton";

const DeleteTasks = () => {
  const [, setDelStat] = useAtom(deleteStatus);
  const [, setIdsDelList] = useAtom(idsDelList);
  const handleDelMod = () => {
    setIdsDelList([]);
    setDelStat((prev) => !prev);
  };
  return (
    <BadButton type="button" click={handleDelMod}>
      <span>del</span>
    </BadButton>
  );
};

export default DeleteTasks;
