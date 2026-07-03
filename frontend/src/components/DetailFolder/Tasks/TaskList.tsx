import type { Tasks } from "../../../@types/types_tasks";
import List from "../../List";
import StatusTasks from "./StatusTasks";

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
        return (
          <label
            className={`task ${item.ready_status ? "task-color-ready-priority-" + item.priority : "task-color-not-ready-priority-" + item.priority}`}
          >
            <div className="task-priority-title-box">
              <span>{item.priority}</span>
              <span className="task-title">{item.title}</span>
            </div>
            <div
              className={`task-bg ${item.ready_status ? "ready" : "not-ready"}`}
            >
              <StatusTasks
                foldId={folderId}
                id={item.id}
                stats={item.ready_status}
              />
            </div>
          </label>
        );
      }}
    />
  );
};

export default TaskList;
