import { createFileRoute } from "@tanstack/react-router";
import CreateFolder from "../components/Folders/CreateFolder";

export const Route = createFileRoute("/todo/create-folder")({
  component: () => <CreateFolder />,
});
