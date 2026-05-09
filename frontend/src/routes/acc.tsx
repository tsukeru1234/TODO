import { createFileRoute } from "@tanstack/react-router";
import AccRoute from "../hooks/router/AccRoute";

export const Route = createFileRoute("/acc")({
  component: AccRoute,
});
