import { createFileRoute } from "@tanstack/react-router";
import CreateTaskComponent from "../components/DetailFolder/Tasks/CreateTaskComponent";

export const Route = createFileRoute("/todo/$id/create-task")({
  component: CreateTaskComponent,
});
