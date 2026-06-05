import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import RenameModal from "./RenameModal";
import ConfirmDeleteFolder from "./ConfirmDeleteFolder";

const DeleteRename = ({ id, title }: { id: string; title: string }) => {
  const [isOpenRen, setIsOpenRen] = useState<boolean>(false);
  const [isOpenDel, setIsOpenDel] = useState<boolean>(false);
  return (
    <>
      <div className="flex gap-5 3xl:gap-15">
        <button onClick={() => setIsOpenRen(true)}>
          <PencilIcon className="h-8 min-w-8 text-my-dub-300 pr-5 border-r-2 border-dotted border-r-my-dub-300 3xl:h-20 3xl:min-w-20 3xl:pr-15 3xl:border-r-6" />
        </button>

        <button onClick={() => setIsOpenDel(true)}>
          <TrashIcon className="h-8 min-w-8 text-my-dub-300 3xl:h-20 3xl:min-w-20" />
        </button>
      </div>
      <RenameModal
        isOpen={isOpenRen}
        onClose={() => setIsOpenRen(false)}
        id={id}
      />
      <ConfirmDeleteFolder
        isOpen={isOpenDel}
        onClose={() => setIsOpenDel(false)}
        id={id}
        title={title}
      />
    </>
  );
};

export default DeleteRename;
