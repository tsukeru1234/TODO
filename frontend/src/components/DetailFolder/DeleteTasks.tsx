import { useAtom } from "jotai";
import { deleteStatus, idsDelList } from "./Tasks/util/taskStore";

const DeleteTasks = () => {
  const [, setDelStat] = useAtom(deleteStatus);
  const [, setIdsDelList] = useAtom(idsDelList)
  const handleDelMod = () => {
    setIdsDelList([])
    setDelStat((prev) => !prev)
  }
  return (
    <>
      <button onClick={handleDelMod}>del</button>
    </>
  );
};

export default DeleteTasks;
