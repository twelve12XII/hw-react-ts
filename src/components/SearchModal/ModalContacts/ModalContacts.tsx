import style from "./ModalContacts.module.css";
import ContactCard from "../../CardContainer/ContactCard/ContactCard";

interface ModalContactsProps {
    contacts:Contact[]
}
export default function ModalContacts({ contacts }: ModalContactsProps) {

    return (
        <div className={style["modal-contacts"]}>
            {contacts.map((contact) => (
                <ContactCard contact={contact} key={contact.id} />
            ))}
        </div>
    );
}