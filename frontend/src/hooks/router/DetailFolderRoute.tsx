import { Outlet, useLocation, useParams } from "@tanstack/react-router";
import { DetailFolder } from "../../components/DetailFolder";
import { Suspense } from "react";
import DetailFolderLoaderComponent from "../../components/DetailFolderLoaderComponent";

export const DetailFolderRoute = () => {
  const { id } = useParams({ from: "/todo/$id" });
  const location = useLocation();
  return (
    <Suspense fallback={<DetailFolderLoaderComponent />}>
      <DetailFolder id={id} path={location.pathname}>
        <Outlet />
      </DetailFolder>
    </Suspense>
  );
};
