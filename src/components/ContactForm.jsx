import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
// import { useState } from 'react';
import { nanoid } from 'nanoid';

function ContactForm({ contacts, setContacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  //localstorage//
  // useEffect(() => {
  //   const savedContacts = localStorage.getItem('contacts');
  //   if (savedContacts) {
  //     setContacts(JSON.parse(savedContacts));
  //   }
  // }, [setContacts]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const nameExists = newName => {
    return contacts.some(
      contact => contact.name.toLowerCase() === newName.toLowerCase()
    );
  };

  const showAlert = message => {
    alert(message);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!name || !number) {
      showAlert('Name and number are required fields!');
      return;
    }

    if (nameExists(name)) {
      showAlert(`The contact ${name} already exists in the phonebook!`);
      return;
    }

    const newContact = { id: nanoid(), name, number };

    setContacts([...contacts, newContact]);

    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleNameChange}
          pattern="^[a-zA-Z]+(([ '-][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        Number:
        <input
          type="tel"
          name="number"
          id="number"
          value={number}
          onChange={handleNumberChange}
          pattern="\+?\d{1,4}[-.\s]?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit">Add Contact</button>
    </form>
  );
}

ContactForm.propTypes = {
  contacts: PropTypes.array.isRequired,
  setContacts: PropTypes.func.isRequired,
};

export default ContactForm;
