import type { Tasks } from "../../../@types/types_tasks";
import List from "../../List";
import StatusTasks from "./StatusTasks";
import { priorityColor } from "./util/taskStore";

const TaskList = ({
  tasks,
  folderId,
}: {
  tasks: Tasks[];
  folderId: string;
}) => {
  return (
    <List
      data={tasks.sort((a, b) => a.priority - b.priority)}
      render={(item: Tasks) => {
        const { bg, txt } = priorityColor(item.priority);
        return (
          <span
            className={`${item.ready_status ? "inline-flex justify-between w-full bg-my-green-600/5 text-my-green-200 rounded-xl wrap-anywhere text-[22px] relative" : "inline-flex justify-between w-full bg-my-green-600/15 text-my-dub-500 rounded-xl wrap-anywhere text-[22px]"}`}
          >
            <span
              className={
                item.ready_status
                  ? `bg-my-green-600/3 ${txt} pl-3 pr-2 text-center rounded-l-xl`
                  : `${bg} ${txt} pl-3 pr-2 text-center rounded-l-xl`
              }
            >
              {item.priority}
            </span>
            <label className="inline-flex justify-between items-center w-full ml-2 ">
              <span>{item.title}</span>
              {item.ready_status ? (
                <StatusTasks
                  foldId={folderId}
                  id={item.id}
                  stats={item.ready_status}
                >
                  <div className="bg-my-green-700/20 w-full h-full rounded-xl text-txt-priority-4 text-shadow-md text-shadow-txt-shadow-priority-4">
                    ✓
                  </div>
                </StatusTasks>
              ) : (
                <StatusTasks
                  foldId={folderId}
                  id={item.id}
                  stats={item.ready_status}
                >
                  <div className="bg-my-red-100/35 w-full h-full rounded-xl text-txt-priority-1 text-shadow-md text-shadow-txt-shadow-priority-1">
                    ✗
                  </div>
                </StatusTasks>
              )}
            </label>
          </span>
        );
      }}
    />
  );
};

export default TaskList;
