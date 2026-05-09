import { Outlet } from "@tanstack/react-router";

function MainRoute() {
  //! Если вдруг что то съехало посмотри на fixed
  return (
    <>
      <div className="fixed w-screen h-screen bg-[url('./assets/b-104.jpg')] bg-no-repeat bg-fixed bg-cover flex items-center justify-center">
        <Outlet />
      </div>
    </>
  );
}

export default MainRoute;
