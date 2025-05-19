import React, { useState } from "react";
import style from "./ContactActions.module.css";
import Button from "../common/Button/Button";
import { clearContactsList, saveContact } from "../../services/contactStorage";
import Modal from "../SearchModal/SearchModal";
import ContactForm from "../ContactForm/ContactForm";

export default function ContactActions() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleSubmit = (contact:Contact) => {
    saveContact(contact);
  }
  return (
    <div className={style["contact-actions_container"]}>
      <div className={style["block"]}>
      <ContactForm handleDone={handleSubmit} submitName="Add" style={style}/>
        <Button type="button" onClick={clearContactsList}>
          Clear List
        </Button>
        <Button type="button" onClick={()=>setIsModalOpen(true)}>Search</Button>
      </div>  
      <Modal isModalOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>
    </div>
  );
}
