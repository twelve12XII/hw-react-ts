import style from "./EditContact.module.css";
import ContactForm from "../../../ContactForm/ContactForm";
import { updateContact } from "../../../../services/contactStorage";

interface EditContactProps {
    isEditOpen: boolean;
    onClose: () => void;
    contact: Contact;
}
export default function EditContact({ isEditOpen, onClose, contact }: EditContactProps) {
    if (!isEditOpen) return null
    const handleEdit = (contact:Contact) =>{
        updateContact(contact)
        onClose()
    }
    return (
        <div className={style.edit}>
            <div className={style["edit-content"]}>
                <a href="#" className={style.close} onClick={(e) => {
                    e.preventDefault();
                    onClose();
                }}>&times;</a>
                <ContactForm handleDone={handleEdit} initialContact={contact} submitName="Edit" style={style}/>
            </div>
        </div>
    );
}