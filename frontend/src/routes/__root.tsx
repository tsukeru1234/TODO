import { createRootRoute } from "@tanstack/react-router";
import MainRoute from "../hooks/router/MainRoute";
//import TodoList from "../components/TodoList";

export const Route = createRootRoute({
  component: MainRoute,
});
