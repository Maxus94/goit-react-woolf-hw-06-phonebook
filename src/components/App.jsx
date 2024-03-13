// В Redux-стані зберігається мінімально необхідний набір даних
// Під час запуску коду завдання в консолі відсутні помилки та попередження.
// Для кожного компонента є окрема папка з файлом React-компонента та файлом стилів
// Використана бібліотека Redux Toolkit
// Формат оцінювання:
// Оцінка від 0 до 100
// Формат здачi:
// Два посилання: на вихідні файли і робочу сторінку на GitHub Pages
// Прикрiплений файл репозиторію у форматi zip
// ВАЖЛИВО
// Переглянь Iнструкцію щодо завантаження робочого файлу з репозиторію на Github

// Книга контактів
// Виконай рефакторинг коду застосунку «Книга контактів», додавши управління станом за допомогою бібліотеки Redux Toolkit. Нехай Redux-стан виглядає наступним чином.

// {
//   contacts: [],
//   filter: ""
// }

// Створи сховище з configureStore()
// Використовуй функцію createSlice()
// Створи дії збереження та видалення контакту, а також оновлення фільтра
// Зв'яжи React-компоненти з Redux-логікою за допомогою хуків бібліотеки react-redux.
// Використай бібліотеку Redux Persist для збереження масиву контактів у локальному сховищі

import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import css from './App.module.css';
import { addContact, deleteContact, setFilter } from 'store/slice';

export const App = () => {
  // const [contacts, setContacts] = useState(() => {
  //   const localContacts = localStorage.getItem('contacts');
  //   return localContacts ? JSON.parse(localContacts) : [];
  // });

  const dispatch = useDispatch();
  const { contacts } = useSelector(state => state.contacts);
  const { filter } = useSelector(state => state.filter);

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  const handleChange = evt => {
    dispatch(setFilter(evt.target.value));
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
    dispatch(
      addContact({
        id: nanoid(),
        name,
        number,
      })
    );
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
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
