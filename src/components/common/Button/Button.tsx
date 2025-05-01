import React from "react";

interface ButtonProps {
  children: string;
  type: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
}
export default function Button({ children, type, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
}
