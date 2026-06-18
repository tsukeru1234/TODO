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
      <div className="w-full flex flex-col gap-2">
        <List
          data={foldersData}
          render={(item: foldersData) => {
            const isOpen = activeFolder === item.id;
            return (
              <div className="w-full flex items-center gap-1">
                <span className="inline-flex justify-between w-full bg-neutral/20 rounded-xl px-2 py-1 wrap-anywhere overflow-hidden relative">
                  <div
                    className="absolute left-0 top-0 h-full transition-all rounded-r-xl duration-1000 ease-in-out bg-neutral/80 z-10"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                  <Link
                    to="/todo/$id"
                    params={{ id: item.id }}
                    className="inline-flex justify-between w-full z-20"
                    onClick={() => setActiveFolder(item.id)}
                  >
                    <span className="pr-5 text-shadow-shadow-text text-shadow-md">
                      {item.title}
                    </span>
                    {isOpen ? (
                      <FolderOpenIcon className="h-8 min-w-8 text-accent" />
                    ) : (
                      <FolderIcon className="h-8 min-w-8 text-accent" />
                    )}
                  </Link>
                </span>
                <span className="text-base w-22 text-center text-accent">
                  {Number(item.progress).toFixed(2)}%
                </span>
              </div>
            );
          }}
        />
      </div>
      <Link from="/todo" to="create-folder" className="flex justify-center">
        <Button type="button">
          <span>Создать папку</span>
        </Button>
      </Link>
    </>
  );
};

export default FoldersComponent;
