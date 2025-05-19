import { clearAllContacts, contactsUpdated } from "./contactSlice";
import { store } from "./store";

// Генерация ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Ключ для localStorage (по первой букве имени)
export const getStorageKey = (name: string) => name.charAt(0).toUpperCase();

// Сохранение контакта
export const saveContact = (contact: Contact) => {
  const key = getStorageKey(contact.name);

  try {
    const existing = localStorage.getItem(key);
    const contacts = existing ? JSON.parse(existing) : [];

    // Проверяем, есть ли уже такой контакт
    const exists = contacts.some(
      (c: Contact) => c.name === contact.name && c.phone === contact.phone
    );

    if (!exists) {
      const newContact: Contact = {
        ...contact,
        id: generateId(),
      };
      contacts.push(newContact);
      localStorage.setItem(key, JSON.stringify(contacts));
      store.dispatch(contactsUpdated({ key, contacts }));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Save failed:", error);
    return false;
  }
};

// Получение всех контактов по букве
export const getContactsByLetter = (letter: string): Contact[] => {
  try {
    const data = localStorage.getItem(letter.toUpperCase());
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading contacts:", error);
    return [];
  }
};

// Получение всех контактов (из всех групп)
export const getAllContacts = (): Contact[] => {
  const contacts: Contact[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.length === 1 && /[A-Z]/.test(key)) {
      contacts.push(...getContactsByLetter(key));
    }
  }

  return contacts.sort((a, b) => a.name.localeCompare(b.name));
};

// Обновление контакта
export const updateContact = (updatedContact: Contact): boolean => {
  const key = getStorageKey(updatedContact.name);
  const contacts = getContactsByLetter(key);

  const index = contacts.findIndex((c) => c.id === updatedContact.id);
  if (index === -1) return false;

  contacts[index] = updatedContact;
  localStorage.setItem(key, JSON.stringify(contacts));
  store.dispatch(contactsUpdated({ key, contacts }));
  return true;
};

// Удаление контакта
export const deleteContact = (contact: Contact): boolean => {
  const key = getStorageKey(contact.name);
  const contacts = getContactsByLetter(key);

  const filtered = contacts.filter((c) => c.id !== contact.id);
  if (filtered.length === contacts.length) return false;

  localStorage.setItem(key, JSON.stringify(filtered));
  store.dispatch(contactsUpdated({ key, contacts }));
  return true;
};

// Поиск контактов
export const searchContacts = (query: string): Contact[] => {
  return getAllContacts().filter(
    (contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase()) ||
      contact.phone.includes(query) ||
      contact.vacancy.toLowerCase().includes(query.toLowerCase())
  );
};

export const clearContactsList = (): void => {
  localStorage.clear();
  store.dispatch(clearAllContacts());
};
