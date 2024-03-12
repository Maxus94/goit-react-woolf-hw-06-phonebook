import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localContacts = localStorage.getItem('contacts');
    return localContacts ? JSON.parse(localContacts) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = evt => {
    setFilter(evt.target.value);
  };

  const createContact = (name, number) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert('Contact already exists');
      return;
    }
    const id = nanoid();
    setContacts(prev => [...prev, { name, number, id }]);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDelete = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm createContact={createContact} />
      <h2>Contacts</h2>
      <Filter handleChange={handleChange} />
      <ContactList contacts={filterContacts()} handleDelete={handleDelete} />
    </div>
  );
};
