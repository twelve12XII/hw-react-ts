import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getStorageKey } from "./contactStorage";

interface ContactsState {
  contacts: Contact[];
  lastUpdatedKey: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  lastUpdatedKey: null,
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    contactsUpdated(
      state,
      action: PayloadAction<{ key: string; contacts: Contact[] }>
    ) {
      state.lastUpdatedKey = action.payload.key;
      state.contacts = [
        ...state.contacts.filter(
          (c) => getStorageKey(c.name) !== action.payload.key
        ),
        ...action.payload.contacts,
      ];
    },
    clearAllContacts(state) {
      state.contacts = [];
      state.lastUpdatedKey = null;
    },
  },
});

export const { contactsUpdated, clearAllContacts } = contactSlice.actions;
export default contactSlice.reducer;
