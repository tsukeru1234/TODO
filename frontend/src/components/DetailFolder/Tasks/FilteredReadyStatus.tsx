import { useAtom } from "jotai";
import { filterStatus, filterTasksData, priorityColor } from "./util/priorityTasks";
import type { Filter } from "./util/priorityTasks";
import type { Tasks } from "../../../@types/types_tasks";
import List from "../../List";
import type { folderData } from "../../../@types/types_folders";
import StatusTasks from "./StatusTasks";

const FilteredReadyStatus = ({ data }: { data: folderData }) => {
  const [status, setStatus] = useAtom<Filter>(filterStatus);
  
  const handleFilter = (status: Filter) => {
    setStatus(status)
  }
  const filteredTasks = filterTasksData(data.tasks, status)
  return (
    <div className="flex flex-col gap-3">
      <div className="flex px-3 justify-between relative animate-filter-com">
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
      <div key={status} className="w-full h-full flex flex-col gap-2 animate-task-slide">
        <List
          data={filteredTasks.sort((a, b) => a.priority - b.priority)}
          render={(item: Tasks) => {
            const { bg, txt } = priorityColor(item.priority);
            return (
              <span
                className={`${item.ready_status ? "inline-flex justify-between w-full bg-my-green-600/5 text-my-green-200 rounded-xl pr-2 wrap-anywhere 3xl:pr-6 3xl:rounded-3xl text-[22px] relative" : "inline-flex justify-between w-full bg-my-green-600/30 text-my-dub-500 rounded-xl pr-2 wrap-anywhere text-[22px]"}`}
              >
                {item.ready_status && (
                  <div className="w-full absolute top-1/2 pl-3 pr-13">
                    <div className="border-b-3 border-b-my-blue-100 w-full shadow-my-blue-100/90 shadow-md rounded-xl"></div>
                  </div>
                )}
                <span
                  className={`${item.ready_status ? `bg-my-green-600/3 ${txt} pl-3 pr-2 text-center rounded-l-xl 3xl:rounded-l-3xl 3xl:pl-6 3xl:pr-5` : `${bg} ${txt} pl-3 pr-2 text-center rounded-l-xl 3xl:rounded-l-3xl 3xl:pl-6 3xl:pr-5`}`}
                >
                  {item.priority}
                </span>
                <div className="inline-flex justify-between items-center w-full ml-2 ">
                  <span>{item.title}</span>
                  {item.ready_status ? (
                    <StatusTasks
                      foldId={data.id}
                      id={item.id}
                      stats={item.ready_status}
                    >
                      <span>✓</span>
                    </StatusTasks>
                  ) : (
                    <StatusTasks
                      foldId={data.id}
                      id={item.id}
                      stats={item.ready_status}
                    >
                      <span>✗</span>
                    </StatusTasks>
                  )}
                </div>
              </span>
            );
          }}
        />
      </div>
    </div>
  );
};

export default FilteredReadyStatus;
