import type { JSX } from "react";

interface ButtonProps {
  click?: () => void;
  children: JSX.Element;
  type: "submit" | "reset" | "button";
}

const GoodButton = ({ children, type, click }: ButtonProps) => {
  return (
    <button
      type={type}
      className="sematic-good-button"
      onClick={click}
    >
      {children}
    </button>
  );
};

export default GoodButton;