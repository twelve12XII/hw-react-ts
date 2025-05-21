import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer, type ContactsState } from "./contactSlice";

interface RootState {
  contacts: ContactsState;
}

const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    return serializedState
      ? (JSON.parse(serializedState) as RootState)
      : undefined;
  } catch (error) {
    console.error("Ошибка чтения:", error);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    const currentState = store.getState();
    const serializedState = JSON.stringify(currentState);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.error("Ошибка записи в localstorage", error);
  }
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };
