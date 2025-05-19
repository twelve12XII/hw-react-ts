import { useState } from "react";
import CardHeader from "./CardHeader/CardHeader";
import CardContent from "./CardContent/CardContent";
import style from "./CardContainer.module.css";
import { getStorageKey } from "../../services/contactStorage";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";

interface CardContainerProps {
  letter: string;
}
export default function CardContainer({ letter }: CardContainerProps) {
  const [cardIsOpen, setCardIsOpen] = useState(false);

  const contacts = useSelector((state: RootState) =>
    state.contacts.contacts.filter(
      (c) => getStorageKey(c.name) === letter.toUpperCase()
    )
  );

  const handleOnClick = () => {
    setCardIsOpen((prev) => !prev);
  };

  return (
    <div className={style["card-container"]}>
      <CardHeader
        count={contacts.length}
        letter={letter}
        onClick={handleOnClick}
      />
      <CardContent isOpen={cardIsOpen} contacts={contacts} />
    </div>
  );
}
