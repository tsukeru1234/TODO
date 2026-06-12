import type { JSX } from "react";
import { useStatusTask, type status } from "../../../api/tasks";

const StatusTasks = ({
  foldId,
  id,
  stats,
  children,
}: {
  foldId: string;
  id: string;
  stats: boolean;
  children?: JSX.Element;
}) => {
  const { mutate } = useStatusTask(foldId);
  const status = (id: string, status: boolean) => {
    const stat: status = { id: id, stat: !status };
    mutate(stat);
  };
  return (
    <button
      className={`w-20 transition-all duration-250 flex justify-end ${stats ? "" : "bg-my-green-600/10"}  rounded-xl z-0`}
      onClick={() => status(id, stats)}
    >
      <div className={`w-10 text-2xl text-center transition-all duration-200 ${stats ? "mr-0" : "mr-10"} z-10`}>{children}</div>
    </button>
  );
};

export default StatusTasks;
