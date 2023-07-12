import React, { useEffect } from 'react';

import {
  ContactsList,
  ContactsItem,
  ContactsName,
  ContactsPhone,
  ContactsButton,
} from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts-operations';
import {
  selectError,
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/selectors';
import * as contactOperations from 'redux/contacts-operations';

const ContactList = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(contactOperations.fetchContacts());
  }, [dispatch]);
  const contacts = useSelector(selectVisibleContacts);
  return (
    <>
      {isLoading && !error && <b>Request in progress...</b>}
      {!isLoading && contacts.length > 0 && (
        <ContactsList>
          {contacts.map(contact => {
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
