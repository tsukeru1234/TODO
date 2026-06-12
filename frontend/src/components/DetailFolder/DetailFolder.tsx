import { useFolderDetail } from "../../api/folders";
import DetailTasksComponent from "./Tasks/DetailTasksComponent";
import type { DetailFolderTypes } from "../../@types/types_components";
import DeleteRename from "./DeleteRename";
import DetailFolderLoaderComponent from "../Loaders/DetailFolderLoaderComponent";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { deleteStatus, idsDelList } from "./Tasks/util/taskStore";
import DeleteTasks from "./DeleteTasks";

export const DetailFolder = ({ id, children, path }: DetailFolderTypes) => {
  const { data, isPending } = useFolderDetail(id);
  const [, setDelStat] = useAtom(deleteStatus);
  const [, setTasksIdsDelList] = useAtom(idsDelList);

  useEffect(() => {
    setTasksIdsDelList([]);
    setDelStat(false);
  }, [id, setTasksIdsDelList, setDelStat]);

  if (isPending) return <DetailFolderLoaderComponent />;
  if (!data)
    return (
      <div className="grid h-full place-content-center gap-6 text-my-dub-200 font-bold text-9xl ">
        <span className="text-center">404</span>
        <span className="text-3xl">Element not found</span>
      </div>
    );
  return (
    <>
      <div
        key={data.id}
        className="text-my-dub-400 p-4 grid grid-cols-6 grid-rows-[minmax(0,1fr)_minmax(0,15fr)_minmax(0,4fr)] h-full font-bold gap-2 animate-folder-slide"
      >
        <span className="col-span-6 wrap-anywhere text-3xl text-center h-full 3xl:text-8xl">
          {data.title}/{data.task_count}
        </span>
        <div className="w-full max-h-full flex flex-col gap-3 justify-between text-xl text-my-dub-300 pt-2 min-h-0">
          <DetailTasksComponent detailData={data} />
        </div>
        {path.includes("create-task") ? (
          <div className="col-span-5 min-h-0 ">{children}</div>
        ) : (
          <div className="col-span-5 min-h-0 relative">
            <ul className="text-2xl">
              <li>Кол-во задач:{data.task_count}</li>
              <li>Процент выполненных:{data.progress}</li>
            </ul>
            <div className="flex gap-5 flex-col h-full justify-end ">
              <div className="absolute top-2 left-0">
                <DeleteTasks />
              </div>
            </div>
          </div>
        )}
        <div className="col-span-6 wrap-anywhere flex flex-col gap-2 max-h-full text-2xl min-h-0 relative">
          <hr className="border-dashed border-2 border-my-dub-500 3xl:border-4" />
          <span>Описание:</span>
          <span className="overflow-auto h-full pr-38 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {data.description}
          </span>
          <div className="absolute right-0 bottom-0 -translate-y-1/13 rounded-2xl py-3 px-4 mr-1.5 bg-light-golder-50 border-2 border-my-dub-100">
            <DeleteRename id={data.id} title={data.title} />
          </div>
        </div>
      </div>
    </>
  );
};
