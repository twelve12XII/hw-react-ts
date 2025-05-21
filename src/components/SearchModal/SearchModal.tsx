import { useEffect, useState } from "react";
import style from "./SearchModal.module.css";
import Button from "../common/Button/Button";
import ModalContacts from "./ModalContacts/ModalContacts";
import { useSelector } from "react-redux";
import { selectAllContacts } from "../../services/contactSlice";
import SearchBar from "./SearchBar/SearchBar";

interface SearchModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}
export default function SearchModal({
  isModalOpen,
  onClose,
}: SearchModalProps) {
  const allContacts = useSelector(selectAllContacts);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAllFlag, setShowAllFlag] = useState<boolean>(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredContacts([]);
      return;
    }

    const results = allContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
    );

    setFilteredContacts(results);
  }, [allContacts, searchQuery]);

  const handleSearch = (value: string) => {
    setShowAllFlag(false);
    setSearchQuery(value);
  };

  const handleShowAll = () => {
    setSearchQuery("");
    setFilteredContacts(allContacts);
    setShowAllFlag(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    setFilteredContacts([]);
    setShowAllFlag(false);
    setSearchQuery("");
    e.preventDefault();
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <div className={style.header}>
          <SearchBar onSearch={handleSearch} />
          <button
            className={style.closeButton}
            onClick={handleClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className={style.contactsContainer}>
          <ModalContacts
            contacts={searchQuery || showAllFlag ? filteredContacts : []}
          />
        </div>

        <div className={style.footer}>
          <Button type="button" onClick={handleShowAll}>
            Show all
          </Button>
        </div>
      </div>
    </div>
  );
}
