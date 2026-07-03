import { useFolderDetail } from "../../api/folders";
import DetailTasksComponent from "./Tasks/DetailTasksComponent";
import type { DetailFolderTypes } from "../../@types/types_components";
import DeleteRename from "./DeleteRename";
import DetailFolderLoaderComponent from "../Loaders/DetailFolderLoaderComponent";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { deleteStatus, idsDelList } from "./Tasks/util/taskStore";

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
      <div key={data.id} className="detail-folder-main-box">
        <div className="detail-folder-title-box">
          <span>{data.title}</span>
        </div>
        <div className="detail-folder-tasks-box"><DetailTasksComponent detailData={data} /></div>
        <div className="detail-folder-graph-box">{path.includes("create-task") ? (<>{children}</>) : (<div></div>)}</div>
        <div className="detail-folder-description-box">
          <span>Description:</span>
          <span className="detail-folder-description-text">
            {data.description}
          </span>
        </div>
        {/*
        <div className="w-full max-h-full flex flex-col gap-3 justify-between text-xl text-my-dub-300 pt-2 min-h-0">
          <DetailTasksComponent detailData={data} />
        </div>
          <div className="absolute right-0 bottom-0 -translate-y-1/13 rounded-2xl py-3 px-4 mr-1.5 bg-light-golder-50 border-2 border-my-dub-100">
            <DeleteRename id={data.id} title={data.title} />
          </div>
          */}
      </div>
    </>
  );
};
