import { createAsyncThunk } from '@reduxjs/toolkit';
import * as contactsAPI from 'services/contacts-api';
import Notiflix from 'notiflix';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await contactsAPI.fetchContacts();
      return contacts;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const response = await contactsAPI.addContact(contact);
      Notiflix.Notify.success('Contact was added successfully');
      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'tasks/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const response = await contactsAPI.deleteContact(contactId);
      Notiflix.Notify.info('Contact was deleted successfully');
      return response;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
