import React from "react";
import style from "./CardHeader.module.css";

interface CardHeaderProps {
  letter: string;
  onClick: () => void;
  count: number;
}
export default function CardHeader({
  letter,
  onClick,
  count,
}: CardHeaderProps) {
  return (
    <div onClick={onClick} className={style["card-header"]}>
      <span>{letter}</span>
      <span>{count === 0 ? "" : count}</span>
    </div>
  );
}
