import { Component } from "react";
import { v4 as uuid } from "uuid";
import styles from "./ContactForm.module.css";

export default class ContactForm extends Component {
  contName = uuid();
  contNumber = uuid();

  state = {
    name: "",
    number: "",

    active: false,
    contact: null,
  };

  handleChangeAllInputs = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const contact = {
      name,
      number,
      id: uuid(),
    };
    this.setState({ contact });
    this.props.addNewContact(contact);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { handleSubmit, handleChangeAllInputs, contNumber, contName } = this;
    const { name, number, active } = this.state;
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.form__label} htmlFor={contName}>
          Contacts name:
        </label>
        <input
          className={styles.form__input}
          type="text"
          id={contName}
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={handleChangeAllInputs}
          placeholder="Will Smith"
        />
        <label className={styles.form__label} htmlFor={contNumber}>
          Contacts number:
        </label>
        <input
          className={styles.form__input}
          type="tel"
          id={contNumber}
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          onChange={handleChangeAllInputs}
          placeholder="(097) 222-33-222"
        />
        <button className={styles.form__btn} type="submit" disabled={active}>
          Add contact
        </button>
      </form>
    );
  }
}
