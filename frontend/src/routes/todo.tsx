import { createFileRoute, Outlet } from "@tanstack/react-router";
import TodoList from "../pages/TodoList";

export const Route = createFileRoute("/todo")({
  component: () => {
    return (
      <>
        <TodoList>
          <Outlet />
        </TodoList>
      </>
    );
  },
});
