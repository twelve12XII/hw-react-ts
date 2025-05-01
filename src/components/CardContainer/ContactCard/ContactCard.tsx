import React from "react";
import style from "./ContactCard.module.css";

interface ContactCardProps {
  contact: Contact;
}
export default function ContactCard({ contact }: ContactCardProps) {
  return (
    <div className={style["contact-card"]}>
      <div className={style["contact-data"]}>
        <span>Name: {contact.name}</span>
        <span>Vacancy: {contact.vacancy}</span>
        <span>Phone: {contact.phone}</span>
      </div>

      <span>{"\u{1F5D9}"}</span>
    </div>
  );
}
