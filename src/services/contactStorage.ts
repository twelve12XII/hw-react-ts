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
        id: key + generateId(),
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



export const saveContactsByLetter = (letter: string, contacts: Contact[]) => {
  localStorage.setItem(letter, JSON.stringify(contacts));
};

export const getContactById = (id: string): Contact | null => {
  const firstLetter = id.charAt(0).toUpperCase(); // Предполагаем, что id начинается с буквы имени
  const contacts = getContactsByLetter(firstLetter);
  return contacts.find(c => c.id === id) || null;
};

//обновление контакта
export const updateContact = (updatedContact: Contact): boolean => {
  const oldContact = getContactById(updatedContact.id);
  if (!oldContact) return false;

  const oldKey = getStorageKey(oldContact.name);
  const newKey = getStorageKey(updatedContact.name);

  if (newKey !== oldKey) {
    updatedContact = {
      ...updatedContact,
      id: newKey + updatedContact.id.slice(1)
    };
  }

  const oldContacts = getContactsByLetter(oldKey).filter(c => c.id !== oldContact.id);
  localStorage.setItem(oldKey, JSON.stringify(oldContacts));

  const newContacts = getContactsByLetter(newKey).filter(c => c.id !== updatedContact.id); // На случай если уже есть дубликат
  localStorage.setItem(newKey, JSON.stringify([...newContacts, updatedContact]));

  storageEvent.emit(`contacts-updated:${oldKey}`, oldKey);
  storageEvent.emit(`contacts-updated:${newKey}`, newKey);
  storageEvent.emit(`contact-changed:${oldContact.id}`, { 
    type: 'deleted', 
    contactId: oldContact.id 
  });
  storageEvent.emit(`contact-changed:${updatedContact.id}`, { 
    type: 'updated', 
    contactId: updatedContact.id
  });

<<<<<<< HEAD
  contacts[index] = updatedContact;
  localStorage.setItem(key, JSON.stringify(contacts));
  store.dispatch(contactsUpdated({ key, contacts }));
=======
>>>>>>> 5bcbd7e49bda1b737ac9e3b6279a661fecc8f993
  return true;
};

// Удаление контакта
export const deleteContact = (contact: Contact): boolean => {
  const key = getStorageKey(contact.name);
  const contacts = getContactsByLetter(key);

  const filtered = contacts.filter((c) => c.id !== contact.id);
  if (filtered.length === contacts.length) return false;

  localStorage.setItem(key, JSON.stringify(filtered));
<<<<<<< HEAD
  store.dispatch(contactsUpdated({ key, contacts }));
=======
  storageEvent.emit(`contacts-updated:${key}`, key);
  storageEvent.emit(`contact-changed:${contact.id}`, {type: 'deleted', contactId: contact.id});
>>>>>>> 5bcbd7e49bda1b737ac9e3b6279a661fecc8f993
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
