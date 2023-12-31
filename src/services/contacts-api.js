import axios from 'axios';

axios.defaults.baseURL = 'https://64ac688c9edb4181202f842b.mockapi.io';

export async function fetchContacts() {
  const { data } = await axios.get('/contacts');
  return data;
}

export async function addContact(contact) {
  const { data } = await axios.post('/contacts', {
    name: contact.name,
    phone: contact.phone,
  });
  return data;
}

export async function deleteContact(contactId) {
  const { data } = await axios.delete(`/contacts/${contactId}`);
  return data;
}
