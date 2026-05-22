import { Link } from "@tanstack/react-router";
import { useFoldersGet } from "../../api/folders";
import { useState } from "react";
import { FolderIcon, FolderOpenIcon } from "@heroicons/react/24/outline";
import List from "../List";
import type { foldersData } from "../../@types/types_folders";
import Button from "../Buttons/Button";

const FoldersComponent = () => {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const foldersData = useFoldersGet();
  return (
    <>
      <div className="w-full flex flex-col gap-2 3xl:gap-5">
        <List
          data={foldersData}
          mainClass="inline-flex justify-between w-full bg-my-dub-600/5 rounded-xl px-2 py-1 wrap-anywhere 3xl:rounded-3xl 3xl:px-6 3xl:py-3"
          render={(item: foldersData) => {
            const isOpen = activeFolder === item.id;
            return (
              <Link
                to="/todo/$id"
                params={{ id: item.id }}
                className="inline-flex justify-between w-full"
                onClick={() => setActiveFolder(item.id)}
              >
                <span className="pr-5 3xl:pr-10">{item.title}</span>
                {isOpen ? (
                  <FolderOpenIcon className="h-8 min-w-8 text-my-dub-400 3xl:h-16 3xl:min-w-16" />
                ) : (
                  <FolderIcon className="h-8 min-w-8 text-my-dub-400 3xl:h-16 3xl:min-w-16" />
                )}
              </Link>
            );
          }}
        />
      </div>
      <Link
        from="/todo"
        to="create-folder"
      >
        <Button type="button"><span>Создать папку</span></Button>
      </Link>
    </>
  );
};

export default FoldersComponent;
