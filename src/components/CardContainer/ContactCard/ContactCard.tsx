import style from "./ContactCard.module.css";
import { useState } from "react";
import EditContact from "./EditContact/EditContact";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../../services/contactSlice";

interface ContactCardProps {
  contact: Contact;
}
export default function ContactCard({ contact }: ContactCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteContact = () => {
    dispatch(deleteContact(contact));
  };

  return (
    <div className={style["contact-card"]}>
      <div className={style["contact-data"]}>
        <span>Name: {contact.name}</span>
        <span>Vacancy: {contact.vacancy}</span>
        <span>Phone: {contact.phone}</span>
      </div>
      <a type="button" onClick={() => setIsEditOpen(true)} href="#">
        Edit
      </a>
      <a type="button" onClick={handleDeleteContact} href="#">
        {"\u{1F5D9}"}
      </a>
      <EditContact
        contact={contact}
        isEditOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}
