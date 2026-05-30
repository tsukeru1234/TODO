import type { JSX } from "react";
import { useStatusTask, type status } from "../../../api/tasks";

const StatusTasks = ({ foldId, id, stats, children }: { foldId: string, id: string, stats: boolean, children?: JSX.Element }) => {
  const { mutate } = useStatusTask(foldId);  
  const status = (id: string, status: boolean) => {
    const stat: status = {id: id, stat: !status}
    mutate(stat)
  };
  return <button className="w-10 text-2xl text-center" onClick={() => status(id, stats)}>{children}</button>;
};

export default StatusTasks;
