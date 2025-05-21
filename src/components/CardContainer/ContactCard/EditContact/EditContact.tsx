import style from "./EditContact.module.css";
import ContactForm from "../../../ContactForm/ContactForm";
import { useDispatch } from "react-redux";
import { updateContact } from "../../../../services/contactSlice";

interface EditContactProps {
  isEditOpen: boolean;
  onClose: () => void;
  contact: Contact;
}
export default function EditContact({
  isEditOpen,
  onClose,
  contact,
}: EditContactProps) {
  const dispatch = useDispatch();
  const handleEdit = (contact: Contact) => {
    dispatch(updateContact(contact));
    onClose();
  };
  if (!isEditOpen) return null;
  return (
    <div className={style.edit}>
      <div className={style["edit-content"]}>
        <a
          href="#"
          className={style.close}
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          &times;
        </a>
        <ContactForm
          handleDone={handleEdit}
          initialContact={contact}
          submitName="Edit"
          style={style}
        />
      </div>
    </div>
  );
}
