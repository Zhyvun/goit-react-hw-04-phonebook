import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Box, Title, SubTitle, AlertEmptyList } from '../App/App.styled';

const initialState = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

//* HOOKS

export const App = () => {

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? initialState;
  });

 

  const [filter, setFilter] = useState('');

  // Зберігаємо змінений стан контактів  у локальне сховище. Запиши зміни коли 'contacts' змінились.

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Додаємо контакти + створюємо умову для перевірки вже наявних контактів
  const formSubmitHandler = contact => {
    const isExist = contacts.some(
      ({ name }) =>
        name.toLowerCase().trim() === contact.name.toLowerCase().trim()
    );
    if (isExist) {
      alert(`${contact.name} is alredy in contacts!`);
      return;
    }
    setContacts(prevState => [...prevState, { id: nanoid(), ...contact }]);
  };

  // Фільтруємо
  const changeFilter = event => {
    setFilter(event.target.value.trim());
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    };
  

  // Видаляємо контакти
  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = getFilteredContacts();
  

  return (
    <Box>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={formSubmitHandler} />
      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        <Filter value={filter} onChange={changeFilter} />
      ) : (
        <AlertEmptyList>
          Unfortunately, there is no contact here. Please enter your first
          contact
        </AlertEmptyList>
      )}

      {contacts.length > 0 && (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      )}
    </Box>
  );
};

/* Class
import React, { Component } from 'react';



export class App extends Component {
  state = {
    contacts: initialState,
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    // console.log(prevState)
    // console.log(this.state)
    if (this.state.contacts !== prevState.contacts) {
      // console.log('Хайдук')
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  formSubmitHandler = contact => {
    const { contacts } = this.state;
    const isExist = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isExist) {
      alert(`${contact.name} is alredy in contacts!`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...contact, id: nanoid() }],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state; 
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <Box>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <SubTitle>Contacts</SubTitle>
        {!!contacts.length ? (
          <>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              contacts={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          </>
        ) : (
          <AlertEmptyList>
            Unfortunately, there is no contact here. Please enter your first
            contact
          </AlertEmptyList>
        )}
      </Box>
    );
  }
}
*/
