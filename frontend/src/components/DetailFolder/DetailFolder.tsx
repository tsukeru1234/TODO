import { useFolderDetail } from "../../api/folders";
import DetailTasksComponent from "./Tasks/DetailTasksComponent";
import type { DetailFolderTypes } from "../../@types/types_components";
import DeleteRename from "./DeleteRename";
import DetailFolderLoaderComponent from "../Loaders/DetailFolderLoaderComponent";

export const DetailFolder = ({ id, children, path }: DetailFolderTypes) => {
  const { data, isPending } = useFolderDetail(id);
  if (isPending) return <DetailFolderLoaderComponent />;
  if (!data)
    return (
      <div className="grid h-full place-content-center gap-6 text-my-dub-200 font-bold text-9xl">
        <span className="text-center">404</span>
        <span className="text-3xl">Element not found</span>
      </div>
    );
  return (
    <>
      <div className="text-my-dub-400 p-4 grid grid-cols-6 grid-rows-[minmax(0,1fr)_minmax(0,15fr)_minmax(0,4fr)] h-full font-bold gap-2 3xl:gap-4">
        <span className="col-span-6 wrap-anywhere text-3xl text-center h-full 3xl:text-8xl">
          {data.title}
        </span>
        <div className="w-full h-full flex flex-col gap-2 justify-between text-xl text-my-dub-300 pt-2 min-h-0 3xl:pt-6 3xl:text-6xl">
          <DetailTasksComponent detailData={data} />
        </div>
        {path.includes("create-task") ? (
          <div className="col-span-5 min-h-0 ">{children}</div>
        ) : (
          <div className="col-span-5 relative min-h-0">
            Типа график
            <div className="absolute bottom-0 right-0 rounded-2xl py-3 px-4 3xl:py-9 3xl:px-12">
              <DeleteRename id={data.id} title={data.title} />
            </div>
          </div>
        )}
        <div className="col-span-6 wrap-anywhere flex flex-col gap-2 max-h-full text-2xl min-h-0 3xl:text-6xl">
          <hr className="border-dashed border-2 border-my-dub-500 3xl:border-4" />
          <span>Описание:</span>
          <span className="overflow-auto h-full">{data.description}</span>
        </div>
      </div>
    </>
  );
};
