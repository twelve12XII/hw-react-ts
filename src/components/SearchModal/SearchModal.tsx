import { useEffect, useState } from "react";
import style from "./SearchModal.module.css";
import Search from "./SearchBar/SearchBar";
import { getAllContacts, getContactById, searchContacts, storageEvent } from "../../services/contactStorage";
import Button from "../common/Button/Button";
import ModalContacts from "./ModalContacts/ModalContacts";

interface SearchModalProps {
    isModalOpen: boolean;
    onClose: () => void;
}
export default function SearchModal({ isModalOpen, onClose }: SearchModalProps) {
    if (!isModalOpen) return null
    const [contacts, setContacts] = useState<Contact[]>([])
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const handleSearch = (value: string) => {
        if (value === "") {
            setContacts([]);
            setSearchQuery(null)
        }
        else {
            setContacts(searchContacts(value));
            setSearchQuery(value);
        }
    };
    const handleGetAllContacts = () => {
        setSearchQuery('');
        setContacts(getAllContacts)
    }

    useEffect(() => {
        const handler = (eventData: { type: 'updated' | 'deleted'; contactId: string }) => {
            if (eventData.type === 'updated') {
                const updatedContact = getContactById(eventData.contactId);
                if (!updatedContact) return;

                setContacts(
                    searchQuery ? searchContacts(searchQuery) : getAllContacts
                );
            }
            else if (eventData.type === 'deleted') {
                setContacts(prevContacts =>
                    prevContacts.filter(contact => contact.id !== eventData.contactId)
                );
            }
        };


        contacts.forEach((contact) => {
            storageEvent.on(`contact-changed:${contact.id}`, handler);
        });

        return () => {
            contacts.forEach((contact) => {
                storageEvent.off(`contact-changed:${contact.id}`, handler);
            });
        };
    }, [contacts, searchQuery]);
    return (
        <div className={style.modal}>
            <div className={style["modal-content"]}>
                <a href="#" className={style.close} onClick={(e) => {
                    e.preventDefault();
                    onClose();
                }}>&times;</a>
                <Search onSearch={handleSearch} />
                <ModalContacts contacts={contacts} />
                <Button type={"button"} onClick={handleGetAllContacts}>Show all</Button>
            </div>
        </div>
    );
}
