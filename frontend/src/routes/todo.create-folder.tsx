import { createFileRoute } from "@tanstack/react-router";
import CreateFolder from "../components/CreateFolder";

export const Route = createFileRoute("/todo/create-folder")({
  component: () => <CreateFolder />,
});
