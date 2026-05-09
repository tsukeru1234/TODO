import { useState, type JSX } from "react";
import { useFolderDetail } from "../api/folders";
import RenameModal from "./RenameModal";
import DetailComponent from "./DetailTasksComponent";

interface DetailFolderTypes {
  id: string;
  children: JSX.Element;
  path: string;
}

export const DetailFolder = ({ id, children, path }: DetailFolderTypes) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const folderDetailData = useFolderDetail(id);
  if (!folderDetailData) return;
  return (
    <>
      <div className="text-my-violet-200 p-4 grid grid-cols-6 grid-rows-[1fr_15fr_4fr] h-full font-bold gap-2">
        <span className="col-span-6 wrap-anywhere text-3xl text-center">
          {folderDetailData.title}
        </span>
        <div className="w-full flex flex-col gap-2 justify-between text-xl text-emerald-900">
          <DetailComponent id={id} />
        </div>
        {path.includes("create-task") ? (
          <div className="col-span-5">{children}</div>
        ) : (
          <div className="col-span-5">прикол</div>
        )}
        <div className="col-span-6 wrap-anywhere flex flex-col gap-2">
          <hr className="border-dashed border-2 border-my-blue-100" />
          <span>Описание:</span>
          <span className="">{folderDetailData.description}</span>
        </div>
        <div className="fixed bottom-12 right-10 bg-amber-800">
          <button onClick={() => setIsOpen(true)}>поменять</button>
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
