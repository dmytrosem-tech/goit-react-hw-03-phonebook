import { Component } from "react";
import ContactForm from "./Components/ContactForm";
import Filter from "./Components/Filter";
import ContactList from "./Components/ContactList";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  addNewContact = (obj) => {
    const { contacts } = this.state;
    const { name } = obj;
    if (contacts.some(({ name }) => name === obj.name)) {
      alert(`Sorry, ${name} is already in contacts list`);
      return;
    }
    this.setState(({ contacts }) => {
      return {
        contacts: [obj, ...contacts],
      };
    });
  };

  deleteContact = (contactId) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { addNewContact, deleteContact, changeFilter } = this;
    const visibleContacts = this.getFilteredContacts();
    const { filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addNewContact={addNewContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={changeFilter} />
        <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
      </div>
    );
  }
}
