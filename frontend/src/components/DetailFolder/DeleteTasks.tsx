import { useAtom } from "jotai";
import { deleteStatus } from "./Tasks/util/taskStore";

const DeleteTasks = () => {
  const [, setDelStat] = useAtom(deleteStatus);
  return (
    <>
      <button onClick={() => setDelStat((prev) => !prev)}>del</button>
    </>
  );
};

export default DeleteTasks;
