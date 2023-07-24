import React, { useState } from 'react';
import { Form, FormLabel, FormInput, FormButton } from './ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts-operations';
// import shortid from 'shortid';
import { selectContacts } from 'redux/selectors';
import { selectError, selectIsLoading } from 'redux/selectors';

function ContactForm() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const normalizedName = name.toLowerCase();
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );
    if (existingContact) {
      alert(`${existingContact.name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name: name, phone: phone }));
    resetForm();
  };

  const handleChange = event => {
    switch (event.currentTarget.name) {
      case 'name':
        setName(event.currentTarget.value);
        break;
      case 'phone':
        setPhone(event.currentTarget.value);
        break;

      default:
        break;
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
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
          value={phone}
          name="phone"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          onChange={handleChange}
        />
      </FormLabel>
      <FormButton type="submit">
        {isLoading ? 'Loading...' : 'Add Contact'}
      </FormButton>
    </Form>
  );
}

export default ContactForm;
