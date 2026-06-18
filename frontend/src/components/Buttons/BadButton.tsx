import type { JSX } from "react";

interface DangerButtonProps {
  click?: () => void;
  children: JSX.Element;
  type: "submit" | "reset" | "button";
}

const BadButton = ({ children, type, click }: DangerButtonProps) => {
  return (
    <button
      type={type}
      className="sematic-bad-button"
      onClick={click}
    >
      {children}
    </button>
  );
};

export default BadButton;
