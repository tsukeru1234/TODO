import type { JSX } from "react";

interface DangerButtonProps {
  click?: () => void;
  children: JSX.Element;
  type: "submit" | "reset" | "button";
}

const DangerButton = ({ children, type, click }: DangerButtonProps) => {
  return (
    <button
      type={type}
      className="px-3 bg-my-dub-600 shadow-lg shadow-black/40 border-3 border-my-dub-100 outline-0 text-my-dub-200 rounded-2xl text-center transition-all duration-250 hover:scale-102 hover:shadow-xl hover:shadow-my-dub-100 active:bg-my-dub-100 active:text-my-dub-600 active:scale-95"
      onClick={click}
    >
      {children}
    </button>
  );
};

export default DangerButton;
