import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import type { folderData } from "../../@types/types_folders";
import RenameModal from "./RenameModal";
import ConfirmDeleteFolder from "./ConfirmDeleteFolder";

const DeleteRename = ({ data }: { data: folderData }) => {
  const [isOpenRen, setIsOpenRen] = useState<boolean>(false);
  const [isOpenDel, setIsOpenDel] = useState<boolean>(false);
  return (
    <>
      <div className="flex gap-5">
        <button onClick={() => setIsOpenRen(true)}>
          <PencilIcon className="h-10 min-w-10 text-my-dub-300 pr-5 border-r-2 border-dotted border-r-my-dub-300"/>
        </button>
        
        <button onClick={() => setIsOpenDel(true)}>
          <TrashIcon className="h-10 min-w-10 text-my-dub-300"/>
        </button>
      </div>
      <RenameModal
        isOpen={isOpenRen}
        onClose={() => setIsOpenRen(false)}
        data={data}
      />
      <ConfirmDeleteFolder
        isOpen={isOpenDel}
        onClose={() => setIsOpenDel(false)}
        data={data}
      />
    </>
  );
};

export default DeleteRename;
