import { createFileRoute } from "@tanstack/react-router";
import { StartPage } from "../pages/StartPage";

export const Route = createFileRoute("/")({
  component: () => {
    return <StartPage />;
  },
});
