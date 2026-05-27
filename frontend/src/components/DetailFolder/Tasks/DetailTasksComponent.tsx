import { Link } from "@tanstack/react-router";
import Button from "../../Buttons/Button";
import FilteredReadyStatus from "./FilteredReadyStatus";
import type { folderData } from "../../../@types/types_folders";

interface DetailFolderTypes {
  detailData: folderData;
}

const DetailTasksComponent = ({ detailData }: DetailFolderTypes) => {
  if (!detailData) return;

  return (
    <>
      <div className="w-full flex flex-col 3xl:gap-4">
        <FilteredReadyStatus data={detailData} />
      </div>
      <Link to="/todo/$id/create-task" className="flex justify-center">
        <Button type="button">
          <span className="text-xl">Создать задачу</span>
        </Button>
      </Link>
    </>
  );
};

export default DetailTasksComponent;
