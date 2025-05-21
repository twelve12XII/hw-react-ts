import { useState } from "react";
import CardHeader from "./CardHeader/CardHeader";
import CardContent from "./CardContent/CardContent";
import style from "./CardContainer.module.css";
import { useSelector } from "react-redux";
import { selectContactsByLetter } from "../../services/contactSlice";

interface CardContainerProps {
  letter: string;
}

export default function CardContainer({ letter }: CardContainerProps) {
  const [cardIsOpen, setCardIsOpen] = useState(false);

  const contacts: Contact[] = useSelector(selectContactsByLetter(letter));

  const handleOnClick = () => {
    console.log(contacts);
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
