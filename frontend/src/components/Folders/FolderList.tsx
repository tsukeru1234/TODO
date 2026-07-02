import { Link } from "@tanstack/react-router";
import { useFoldersGet } from "../../api/folders";
import Button from "../Buttons/Button";
import type { foldersData } from "../../@types/types_folders";
import List from "../List";

const FolderList = () => {
  const foldersData = useFoldersGet();
  return (
    <>
      <div className="folders-box">
        <List
          data={foldersData}
          render={(item: foldersData) => {
            return (
              <Link to="/todo/$id" params={{ id: item.id }} className="folder">
                <div
                  className="folder-progress-bar"
                  style={{ width: `${item.progress}%` }}
                ></div>
                <span className="folder-title">{item.title}</span>
                <span className="">{Number(item.progress).toFixed(2)}%</span>
              </Link>
            );
          }}
        />
      </div>
      <Link from="/todo" to="create-folder" className="create-folder-box">
        <Button type="button">
          <span>Create folder</span>
        </Button>
      </Link>
    </>
  );
};

export default FolderList;
