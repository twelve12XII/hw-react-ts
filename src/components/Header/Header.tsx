import React from "react";
import style from "./Header.module.css";

export default function Header() {
  return (
    <header className={style.header}>
      <h1>Contact List on JS</h1>
      <a href="#">GitHub Repository link</a>
    </header>
  );
}
