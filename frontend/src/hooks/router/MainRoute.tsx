import { Outlet } from "@tanstack/react-router";

function MainRoute() {
  //! Если вдруг что то съехало посмотри на fixed
  return (
    <>
      <Outlet />
    </>
  );
}

export default MainRoute;
