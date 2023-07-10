import axios from 'axios';

axios.defaults.baseURL = 'https://64ac688c9edb4181202f842b.mockapi.io';

export async function fetchContacts() {
  const { data } = await axios.get('/contacts');
  return data;
}
