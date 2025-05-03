import style from "./ContactCard.module.css";
import { deleteContact } from "../../../services/contactStorage";
import { useState } from "react";
import EditContact from "./EditContact/EditContact";

interface ContactCardProps {
  contact: Contact;
}
export default function ContactCard({ contact }: ContactCardProps) {
  const handleDeleteContact = () => {
    deleteContact(contact)
  }
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <div className={style["contact-card"]}>
      <div className={style["contact-data"]}>
        <span>Name: {contact.name}</span>
        <span>Vacancy: {contact.vacancy}</span>
        <span>Phone: {contact.phone}</span>
      </div>
      <a type="button" onClick={()=>setIsEditOpen(true)} href="#">Edit</a>
      <a type="button" onClick={handleDeleteContact} href="#">{"\u{1F5D9}"}</a>
      <EditContact contact={contact} isEditOpen={isEditOpen} onClose={()=>setIsEditOpen(false)} />
    </div>
  );
}
