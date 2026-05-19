import { useState } from "react";
import { useDeleteFolder, useFolderDetail } from "../../api/folders";
import RenameModal from "./RenameModal";
import DetailTasksComponent from "./DetailTasksComponent";
import type { DetailFolderTypes } from "../../@types/types_components";

export const DetailFolder = ({ id, children, path }: DetailFolderTypes) => {
  const { mutate } = useDeleteFolder();
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
          <div className="col-span-5">Типа график</div>
        )}
        <div className="col-span-6 wrap-anywhere flex flex-col gap-2 max-h-45">
          <hr className="border-dashed border-2 border-my-dub-500" />
          <span>
            Описание:
          </span>
          <span className="h-full overflow-auto">
            {folderDetailData.description}
          </span>
        </div>
        <div className="fixed bottom-12 right-10 bg-amber-800 flex gap-4">
          <button onClick={() => setIsOpen(true)}>поменять</button>
          <button onClick={() => mutate(id)}>удалить</button>
        </div>
      </div>
      <RenameModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={folderDetailData}
      />
    </>
  );
};
