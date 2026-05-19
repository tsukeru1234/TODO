import { createFileRoute } from "@tanstack/react-router";
import CreateTaskComponent from "../components/DetailFolder/CreateTaskComponent";

export const Route = createFileRoute("/todo/$id/create-task")({
  component: CreateTaskComponent,
});
