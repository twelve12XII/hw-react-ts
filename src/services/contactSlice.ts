import { createSelector, createSlice, Reducer } from "@reduxjs/toolkit";

const generateId = () => Math.random().toString(36).substring(2, 9);

interface ContactsState {
  byLetter: Record<string, Contact[]>;
  allIds: string[];
}

const initialState: ContactsState = {
  byLetter: {},
  allIds: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      const contact: Contact = action.payload;
      const firstLetter = contact.name[0].toUpperCase();
      console.log(`Добавление контакта на букву ${firstLetter}`);

      if (!state.byLetter[firstLetter]) {
        state.byLetter[firstLetter] = [];
      }

      const contactsForLetter = state.byLetter[firstLetter];
      const exists = contactsForLetter.some(
        (c) => c.name === contact.name && c.phone === contact.phone
      );

      if (exists) {
        alert("Контакт уже существует");
        return;
      }

      const contactWithId: Contact = {
        ...contact,
        id: firstLetter + generateId(),
      };

      state.byLetter[firstLetter].push(contactWithId);
      state.allIds.push(contactWithId.id);
    },

    deleteContact: (state, action) => {
      const contact: Contact = action.payload;
      const firstLetter = contact.name[0].toUpperCase();
      state.byLetter[firstLetter] = state.byLetter[firstLetter].filter(
        (cont) => cont.id !== contact.id
      );
      if (state.byLetter[firstLetter].length === 0) {
        delete state.byLetter[firstLetter];
      }
      state.allIds = state.allIds.filter(
        (contactId) => contactId !== contact.id
      );
    },

    updateContact: (state, action) => {
      const contact: Contact = action.payload;
      const oldFirstLetter = contact.id[0].toUpperCase();
      const newFirstLetter = contact.name[0].toUpperCase();

      if (oldFirstLetter !== newFirstLetter) {
        state.byLetter[oldFirstLetter] = state.byLetter[oldFirstLetter].filter(
          (cont) => cont.id !== contact.id
        );

        if (!state.byLetter[newFirstLetter]) {
          state.byLetter[newFirstLetter] = [];
        }
        state.allIds.filter((id) => id !== contact.id);
        const newContact = { ...contact, id: newFirstLetter + generateId() };
        state.byLetter[newFirstLetter].push(newContact);
        state.allIds.push(newContact.id);
      } else {
        const contactState = state.byLetter[oldFirstLetter].find(
          (cont) => cont.id === contact.id
        );
        if (contactState) {
          contactState.name = contact.name;
          contactState.vacancy = contact.vacancy;
          contactState.phone = contact.phone;
        }
      }
    },

    clearContactsList: () => {
      localStorage.clear();
      return initialState;
    },
  },
});

const selectContacts = (state: { contacts: ContactsState }) => state.contacts;

export const selectAllContacts = createSelector(
  [selectContacts],
  (contacts) => {
    console.log("contacts");
    const result: Contact[] = [];
    for (const letter in contacts.byLetter) {
      result.push(...contacts.byLetter[letter]);
    }
    return result;
  }
);

export const selectContactsByLetter = (letter: string) =>
  createSelector(
    [selectContacts],
    (contacts) => contacts.byLetter[letter] || []
  );

export const { addContact, deleteContact, updateContact, clearContactsList } =
  contactsSlice.actions;
export const contactsReducer: Reducer<ContactsState> = contactsSlice.reducer;
export type { ContactsState };
