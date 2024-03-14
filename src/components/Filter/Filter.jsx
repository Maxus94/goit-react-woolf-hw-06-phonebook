import { useDispatch } from 'react-redux';
import css from './Filter.module.css';
import { setFilter } from 'store/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = evt => {
    dispatch(setFilter(evt.target.value));
  };

  return (
    <label htmlFor="">
      Find contact by name
      <input
        className={css.formInput}
        type="text"
        name="filter"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={handleChange}
      />
    </label>
  );
};

// export class Filter extends Component {
//   render() {
//     return (
//       <label htmlFor="">
//         Find contact by name
//         <input
//           className={css.formInput}
//           type="text"
//           name="filter"
//           title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//           onChange={this.props.handleChange}
//         />
//       </label>
//     );
//   }
// }
