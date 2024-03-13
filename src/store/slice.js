import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [] },
  reducers: {
    addContact: (state, { payload }) => {
      state.contacts.push(payload);
    },
    deleteContact: (state, { payload }) => {
      state.contacts = state.contacts.filter(contact => contact.id !== payload);
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: { filter: '' },
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const filterReducer = filterSlice.reducer;

export const { addContact, deleteContact } = contactsSlice.actions;
export const { setFilter } = filterSlice.actions;
