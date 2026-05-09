import { Link } from "@tanstack/react-router";
import { useFoldersGet } from "../api/folders";
import { useState } from "react";
import { FolderIcon, FolderOpenIcon } from "@heroicons/react/24/outline";

const FoldersComponent = () => {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const data = useFoldersGet();
  const el = data?.map((e) => {
    const isOpen = activeFolder === e.id;
    return (
      <span
        className="inline-flex justify-between w-full bg-my-green-600/5 rounded-xl px-2 py-1 wrap-anywhere"
        key={e.id}
      >
        <Link
          to="/todo/$id"
          params={{ id: e.id }}
          className="inline-flex justify-between w-full"
          onClick={() => setActiveFolder(e.id)}
        >
          <span className="pr-5">{e.title}</span>
          {isOpen ? (
            <FolderOpenIcon className="h-8 min-w-8 text-my-violet-100" />
          ) : (
            <FolderIcon className="h-8 min-w-8 text-my-violet-100" />
          )}
        </Link>
      </span>
    );
  });
  return (
    <>
      {/* папка */}
      <div className="w-full flex flex-col gap-2">{el}</div>
      <Link
        from="/todo"
        to="create-folder"
        className="m-2 bg-my-green-600 shadow-lg shadow-black/40 border-3 border-my-green-100 outline-0 text-my-green-100 rounded-xl text-center transition-all duration-250 hover:scale-102 hover:shadow-xl hover:shadow-my-green-100 active:bg-my-green-100 active:text-my-green-500 active:scale-95"
      >
        Создать
      </Link>
    </>
  );
};

export default FoldersComponent;
