import { createFileRoute } from "@tanstack/react-router";
import SingIn from "../pages/SingIn";

export const Route = createFileRoute("/acc/sing_in")({
  component: () => {
    return <SingIn />;
  },
});
