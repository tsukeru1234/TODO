import { Link } from "@tanstack/react-router";
import { useFoldersGet } from "../../api/folders";
import { useState } from "react";
import { FolderIcon, FolderOpenIcon } from "@heroicons/react/24/outline";
import List from "../List";
import type { foldersData } from "../../@types/types_folders";

const FoldersComponent = () => {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const foldersData = useFoldersGet();
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <List
          data={foldersData}
          mainClass="inline-flex justify-between w-full bg-my-dub-600/5 rounded-xl px-2 py-1 wrap-anywhere"
          render={(item: foldersData) => {
            const isOpen = activeFolder === item.id;
            return (
              <Link
                to="/todo/$id"
                params={{ id: item.id }}
                className="inline-flex justify-between w-full"
                onClick={() => setActiveFolder(item.id)}
              >
                <span className="pr-5">{item.title}</span>
                {isOpen ? (
                  <FolderOpenIcon className="h-8 min-w-8 text-my-dub-400" />
                ) : (
                  <FolderIcon className="h-8 min-w-8 text-my-dub-400" />
                )}
              </Link>
            );
          }}
        />
      </div>
      <Link
        from="/todo"
        to="create-folder"
        className="m-2 bg-my-green-600 shadow-lg shadow-black/40 border-3 border-my-green-100 outline-0 text-my-green-100 rounded-xl text-center transition-all duration-250 hover:scale-102 hover:shadow-xl hover:shadow-my-green-100 hover:pb-1 active:bg-my-green-100 active:text-my-green-500 active:scale-95"
      >
        Создать
      </Link>
    </>
  );
};

export default FoldersComponent;
