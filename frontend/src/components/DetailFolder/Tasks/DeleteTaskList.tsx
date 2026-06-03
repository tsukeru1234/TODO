import { useAtom } from "jotai";
import type { Tasks } from "../../../@types/types_tasks";
import List from "../../List";
import { idsDelList, priorityColor } from "./util/taskStore";

const DeleteTaskList = ({ tasks }: { tasks: Tasks[] }) => {
  const [idsTasksDelList, setTasksIdsDelList] = useAtom(idsDelList);
  return (
    <List
      data={tasks.sort((a, b) => a.priority - b.priority)}
      render={(item: Tasks) => {
        const { bg, txt } = priorityColor(item.priority);
        const handleAdd = () => {
          setTasksIdsDelList((prev) => prev ? [...prev, item.id] : [item.id]);
          console.log(`add -- ${item.id}`)
          console.log(idsTasksDelList)
        };
        const handleRemove = () => {
            setTasksIdsDelList((prev) => prev.filter((id) => id !== item.id))
            console.log(`remove -- ${item.id}`)
            console.log(idsTasksDelList)
        }
        return (
          <button
            onClick={idsTasksDelList.includes(item.id) ? handleRemove : handleAdd}
            className={`${item.ready_status ? "inline-flex justify-between w-full bg-my-green-600/5 text-my-green-200 rounded-xl wrap-anywhere text-[22px] relative" : "inline-flex justify-between w-full bg-my-green-600/30 text-my-dub-500 rounded-xl wrap-anywhere text-[22px]"}`}
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
            <div className="inline-flex justify-between items-center w-full ml-2 ">
              <span>{item.title}</span>
              <div className={item.ready_status ? "bg-my-green-700/20 h-full rounded-xl w-10 text-2xl text-center" : "w-10 text-2xl text-center"}>
                {item.ready_status ? "✓" : "✗"}
              </div>
            </div>
          </button>
        );
      }}
    />
  );
};

export default DeleteTaskList;
