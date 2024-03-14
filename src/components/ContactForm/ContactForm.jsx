import { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'store/slice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const { contacts } = useSelector(state => state.contacts);

  const createContact = (name, number) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert('Contact already exists');
      return;
    }
    dispatch(
      addContact({
        id: nanoid(),
        name,
        number,
      })
    );
  };

  const handleChange = evt => {
    switch (evt.target.name) {
      case 'name':
        return setName(evt.target.value);
      case 'number':
        return setNumber(evt.target.value);
      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    createContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form className={css.formStyle} action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        Name
        <input
          className={css.formInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        Number
        <input
          className={css.formInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};
