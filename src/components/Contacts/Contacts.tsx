import style from "./Contacts.module.css";
import CardContainer from "../CardContainer/CardContainer";
import { useEffect, useState } from "react";
import { storageEvent } from "../../services/contactStorage";

export default function Contacts() {
  const [updateTriggers, setUpdateTriggers] = useState<Record<string, number>>(
    {}
  );
  const leftAlphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
  ];
  const rightAlphabet = [
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  useEffect(() => {
    const handler = (updatedLetter: string) => {
      setUpdateTriggers((prev) => ({ ...prev, [updatedLetter]: Date.now() }));
    };

    const letters = [...leftAlphabet, ...rightAlphabet];

    // Подписываемся на события для всех букв
    letters.forEach((letter) => {
      storageEvent.on(`contacts-updated:${letter}`, handler);
    });

    return () => {
      letters.forEach((letter) => {
        storageEvent.off(`contacts-updated:${letter}`, handler);
      });
    };
  }, []);

  return (
    <div className={style.contacts}>
      <div className={style["contacts-left-col"]}>
        {leftAlphabet.map((letter) => {
          return (
            <CardContainer
              updateTrigger={updateTriggers[letter]}
              key={letter}
              letter={letter}
            />
          );
        })}
      </div>
      <div className={style["contacts-right-col"]}>
        {rightAlphabet.map((letter) => {
          return (
            <CardContainer
              updateTrigger={updateTriggers[letter]}
              key={letter}
              letter={letter}
            />
          );
        })}
      </div>
    </div>
  );
}
