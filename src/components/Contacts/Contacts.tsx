import style from "./Contacts.module.css";
import CardContainer from "../CardContainer/CardContainer";

export default function Contacts() {
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

  return (
    <div className={style.contacts}>
      <div className={style["contacts-left-col"]}>
        {leftAlphabet.map((letter) => {
          return <CardContainer key={letter} letter={letter} />;
        })}
      </div>
      <div className={style["contacts-right-col"]}>
        {rightAlphabet.map((letter) => {
          return <CardContainer key={letter} letter={letter} />;
        })}
      </div>
    </div>
  );
}
