import { Outlet, useLocation, useParams } from "@tanstack/react-router";
import { DetailFolder } from "../../components/DetailFolder";
import { Suspense } from "react";

export const DetailFolderRoute = () => {
  const { id } = useParams({ from: "/todo/$id" });
  const location = useLocation();
  return (
    <Suspense fallback={<h1>попка</h1>}>
      <DetailFolder id={id} path={location.pathname}>
        <Outlet />
      </DetailFolder>
    </Suspense>
  );
};
