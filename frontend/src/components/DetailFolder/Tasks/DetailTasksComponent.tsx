import { Link } from "@tanstack/react-router";
import Button from "../../Buttons/Button";
import FilteredReadyStatus from "./FilteredReadyStatus";
import type { folderData } from "../../../@types/types_folders";
import { useAtom } from "jotai";
import { deleteStatus } from "./util/taskStore";
import DeleteTasksButton from "../DeleteTasksButton";
import DeleteTasks from "../DeleteTasks";

interface DetailFolderTypes {
  detailData: folderData;
}

const DetailTasksComponent = ({ detailData }: DetailFolderTypes) => {
  const [delStat] = useAtom(deleteStatus);
  if (!detailData) return;

  return (
    <>
      <div className="tasks-main-box">
        <FilteredReadyStatus data={detailData} />
      </div>
      {/* {delStat ? (
        <DeleteTasksButton id={detailData.id} />
      ) : ( */}
      <div className="task-buttons-box">
        <Button type="button">
          <Link to="/todo/$id/create-task">
            <span className="">Create task</span>
          </Link>
        </Button>
        {/* <DeleteTasks /> */}
      </div>
      {/* )} */}
    </>
  );
};

export default DetailTasksComponent;
