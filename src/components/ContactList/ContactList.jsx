import React, { useEffect } from 'react';

import {
  ContactsList,
  ContactsItem,
  ContactsName,
  ContactsPhone,
  ContactsButton,
} from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import {
  selectContacts,
  selectFilterValue,
  selectError,
  selectIsLoading,
} from 'redux/selectors';
import * as contactOperations from 'redux/contacts-operations';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilterValue);
  const normalizedFilter = filter.toLowerCase();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  useEffect(() => {
    dispatch(contactOperations.fetchContacts());
  }, [dispatch]);
  return (
    <>
      {isLoading && !error && <b>Request in progress...</b>}
      {!isLoading && contacts.length > 0 && (
        <ContactsList>
          {filteredContacts.map(contact => {
            return (
              <ContactsItem key={contact.id}>
                <ContactsName>
                  {contact.name}: <ContactsPhone>{contact.phone}</ContactsPhone>
                </ContactsName>
                <ContactsButton
                  type="button"
                  onClick={() => dispatch(deleteContact(contact.id))}
                >
                  <span>Delete</span>
                </ContactsButton>
              </ContactsItem>
            );
          })}
        </ContactsList>
      )}
    </>
  );
};

export default ContactList;
