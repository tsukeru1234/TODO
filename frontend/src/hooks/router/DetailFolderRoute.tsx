import { Outlet, useLocation, useParams } from "@tanstack/react-router";
import { DetailFolder } from "../../components/DetailFolder/DetailFolder";
import { Suspense } from "react";
import { ErrorBoundary } from 'react-error-boundary'
import DetailFolderLoaderComponent from "../../components/Loaders/DetailFolderLoaderComponent";

function FolderErrorFallback() {
  //!! 404 page
  return <div className="grid h-full place-content-center gap-6 text-my-dub-200 font-bold text-9xl"><span className="text-center">404</span><span className="text-3xl">Element not found</span></div> 
}

export const DetailFolderRoute = () => {
  const { id } = useParams({ from: "/todo/$id" });
  const location = useLocation();
  return (
    <ErrorBoundary fallback={<FolderErrorFallback />}>
      <Suspense fallback={<DetailFolderLoaderComponent />}>
        <DetailFolder id={id} path={location.pathname}>
          <Outlet />
        </DetailFolder>
      </Suspense>
    </ErrorBoundary>
  );
};
