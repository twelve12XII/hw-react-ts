import React, { useState } from "react";
import style from "./ContactActions.module.css";
import Button from "../common/Button/Button";
import ContactForm from "../ContactForm/ContactForm";
import { useDispatch } from "react-redux";
import { addContact, clearContactsList } from "../../services/contactSlice";
import SearchModal from "../SearchModal/SearchModal";

export default function ContactActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (contact: Contact) => {
    dispatch(addContact(contact));
  };
  return (
    <div className={style["contact-actions_container"]}>
      <div className={style["block"]}>
        <ContactForm handleDone={handleSubmit} submitName="Add" style={style} />
        <Button type="button" onClick={() => dispatch(clearContactsList())}>
          Clear List
        </Button>
        <Button type="button" onClick={() => setIsModalOpen(true)}>
          Search
        </Button>
      </div>
      <SearchModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
