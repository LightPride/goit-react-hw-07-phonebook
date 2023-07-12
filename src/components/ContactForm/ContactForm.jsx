import React, { useState } from 'react';
import { Form, FormLabel, FormInput, FormButton } from './ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts-operations';
import shortid from 'shortid';
import { selectContacts } from 'redux/selectors';

function ContactForm() {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();
    const newContact = {
      id: shortid.generate(),
      ...{ name, number },
    };
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    resetForm();
    if (existingContact) {
      alert(`${existingContact.name} is already in contacts`);
      return;
    }
    dispatch(addContact(newContact));
  };

  const handleChange = event => {
    switch (event.currentTarget.name) {
      case 'name':
        setName(event.currentTarget.value);
        break;
      case 'number':
        setNumber(event.currentTarget.value);
        break;

      default:
        break;
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form action="" onSubmit={handleSubmit}>
      <FormLabel htmlFor="">
        Name
        <FormInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </FormLabel>

      <FormLabel htmlFor="">
        Phone
        <FormInput
          type="text"
          value={number}
          name="number"
          onChange={handleChange}
        />
      </FormLabel>
      <FormButton type="submit">Add contact</FormButton>
    </Form>
  );
}

export default ContactForm;
