import { useAtom } from "jotai";
import { deleteStatus, filterStatus, filterTasksData } from "./util/taskStore";
import type { Filter } from "./util/taskStore";
import type { folderData } from "../../../@types/types_folders";
import TaskList from "./TaskList";
import DeleteTasks from "../DeleteTasks";
import DeleteTaskList from "./DeleteTaskList";

const FilteredReadyStatus = ({ data }: { data: folderData }) => {
  const [status, setStatus] = useAtom<Filter>(filterStatus);
  const [delStat] = useAtom(deleteStatus);

  const handleFilter = (status: Filter) => {
    setStatus(status);
  };
  const filteredTasks = filterTasksData(data.tasks, status);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex px-3 justify-between relative animate-filter-com">
        <DeleteTasks />
        <button
          className={
            status == "ALL"
              ? "animate-open-filter bg-my-green-600/25 w-15 py-1 rounded-2xl"
              : "animate-close-filter bg-my-green-600/5 w-15 py-1 rounded-2xl"
          }
          onClick={() => handleFilter("ALL")}
        >
          All
        </button>
        <button
          className={
            status == "READY"
              ? "animate-open-filter bg-my-green-600/25 w-15 py-1 rounded-2xl"
              : "animate-close-filter bg-my-green-600/5 w-15 py-1 rounded-2xl"
          }
          onClick={() => handleFilter("READY")}
        >
          ✓
        </button>
        <button
          className={
            status == "NOT_READY"
              ? "animate-open-filter bg-my-green-600/25 w-15 py-1 rounded-2xl"
              : "animate-close-filter bg-my-green-600/5 w-15 py-1 rounded-2xl"
          }
          onClick={() => handleFilter("NOT_READY")}
        >
          ✗
        </button>
      </div>
      <div
        key={status}
        className="w-full h-full flex flex-col gap-2 animate-task-slide"
      >
        {delStat ? (
          <DeleteTaskList tasks={filteredTasks} />
        ) : (
          <TaskList tasks={filteredTasks} folderId={data.id} />
        )}
      </div>
    </div>
  );
};

export default FilteredReadyStatus;
