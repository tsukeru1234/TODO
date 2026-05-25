import type { JSX } from "react";

interface ButtonProps {
  click?: () => void;
  children: JSX.Element;
  type: "submit" | "reset" | "button";
}

const Button = ({ children, type, click }: ButtonProps) => {
  return (
    <button
      type={type}
      className="px-3 bg-my-green-600 shadow-lg shadow-black/40 border-3 border-my-green-100 outline-0 text-my-green-100 rounded-2xl text-center transition-all duration-250 hover:scale-102 hover:shadow-xl hover:shadow-my-green-100 active:bg-my-green-100 active:text-my-green-500 active:scale-95"
      onClick={click}
    >
      {children}
    </button>
  );
};

export default Button;
