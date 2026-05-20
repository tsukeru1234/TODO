import { useFolderDetail } from "../../api/folders";
import DetailTasksComponent from "./DetailTasksComponent";
import type { DetailFolderTypes } from "../../@types/types_components";
import DeleteRename from "./DeleteRename";

export const DetailFolder = ({ id, children, path }: DetailFolderTypes) => {
  const folderDetailData = useFolderDetail(id);
  if (!folderDetailData) return;
  return (
    <>
      <div className="text-my-dub-400 p-4 grid grid-cols-6 grid-rows-[1fr_15fr_4fr] h-full font-bold gap-2">
        <span className="col-span-6 wrap-anywhere text-3xl text-center">
          {folderDetailData.title}
        </span>
        <div className="w-full flex flex-col gap-2 justify-between text-xl text-emerald-900 pt-2">
          <DetailTasksComponent id={id} />
        </div>
        {path.includes("create-task") ? (
          <div className="col-span-5">{children}</div>
        ) : (
          <div className="col-span-5 relative">
            Типа график
            <div className="absolute bottom-0 right-0 rounded-2xl py-3 px-4">
              <DeleteRename data={folderDetailData} />
            </div>
          </div>
        )}
        <div className="col-span-6 wrap-anywhere flex flex-col gap-2 max-h-full">
          <hr className="border-dashed border-2 border-my-dub-500" />
          <span>Описание:</span>
          {/* //!адапт дизайн */}
          <span className="h-34 overflow-auto">
            {folderDetailData.description}
          </span>
        </div>
      </div>
    </>
  );
};
