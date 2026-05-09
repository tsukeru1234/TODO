import { createFileRoute } from "@tanstack/react-router";
import { DetailFolderRoute } from "../hooks/router/DetailFolderRoute";

export const Route = createFileRoute("/todo/$id")({
  component: DetailFolderRoute,
});
