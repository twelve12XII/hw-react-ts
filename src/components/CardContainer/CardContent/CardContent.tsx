import ContactCard from "../ContactCard/ContactCard";
import style from "./CardContent.module.css";

interface CardContentProps {
  contacts: Contact[];
  isOpen: boolean;
}
export default function CardContent({ isOpen, contacts }: CardContentProps) {
  return (
    <div
      className={`${style["card-content"]} ${
        isOpen ? style["open"] : style["closed"]
      }`}
    >
      {isOpen &&
        contacts.map((contact, index) => (
          <ContactCard key={index} contact={contact} />
        ))}
    </div>
  );
}
