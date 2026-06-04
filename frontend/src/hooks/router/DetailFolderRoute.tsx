import { Outlet, useLocation, useParams } from "@tanstack/react-router";
import { DetailFolder } from "../../components/DetailFolder/DetailFolder";



export const DetailFolderRoute = () => {
  const { id } = useParams({ from: "/todo/$id" });
  const location = useLocation();
  return (

        <DetailFolder id={id} path={location.pathname}>
          <Outlet />
        </DetailFolder>

  );
};
