import React from "react";
import styles from "./ContactList.module.css";

function ContactList({ contacts, deleteContact }) {
  const {
    contacts__list,
    contacts__item,
    contact__name,
    contact__number,
    contacts__btn,
  } = styles;
  return (
    <ul className={contacts__list}>
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={contacts__item}>
          <p className={contact__name}>{name}</p>
          <p className={contact__number}>tel: {number}</p>
          <button onClick={() => deleteContact(id)} className={contacts__btn}>
            Delete contact
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
