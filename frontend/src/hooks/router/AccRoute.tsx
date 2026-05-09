import { Outlet, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

function AccRoute() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <>
          <motion.div
            key={location.pathname}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ x: "-100%", opacity: 0 }}
          >
            <Outlet />
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
}

export default AccRoute;
