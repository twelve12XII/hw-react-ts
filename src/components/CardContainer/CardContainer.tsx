import React, { useEffect, useState } from "react";
import CardHeader from "./CardHeader/CardHeader";
import CardContent from "./CardContent/CardContent";
import style from "./CardContainer.module.css";
import { getContactsByLetter } from "../../services/contactStorage";

interface CardContainerProps {
  letter: string;
  updateTrigger: number;
}
export default function CardContainer({
  letter,
  updateTrigger,
}: CardContainerProps) {
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const [contacts, setContacts] = useState(getContactsByLetter(letter));

  useEffect(() => {
    setContacts(getContactsByLetter(letter));
  }, [updateTrigger, letter]);

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
