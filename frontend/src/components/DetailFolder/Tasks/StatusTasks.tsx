import { useStatusTask, type status } from "../../../api/tasks";

const StatusTasks = ({
  foldId,
  id,
  stats,
}: {
  foldId: string;
  id: string;
  stats: boolean;
}) => {
  const { mutate } = useStatusTask(foldId);
  const status = (id: string, status: boolean) => {
    const stat: status = { id: id, stat: !status };
    mutate(stat);
  };
  return (
    <button
      onClick={() => status(id, stats)}
      className={`task-slider ${stats ? "task-ready" : "task-not-ready"}`}
    >
      {stats ? "✓" : "✗"}
    </button>
  );
};

export default StatusTasks;
