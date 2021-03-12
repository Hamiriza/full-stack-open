import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Content from "./components/Content";
import phonebookService from "./services/phonebook";
import Notifications from "./components/Notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (
      persons.some(
        (person) => person.name.toUpperCase() === newName.toUpperCase()
      )
    ) {
      const personToUpdate = persons.find((p) => p.name === newName);
      const confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with new one`
      );
      if (!confirmed) return;

      const changedPerson = { ...personToUpdate, number: newNumber };
      phonebookService
        .update(personToUpdate.id, changedPerson)
        .then((returnedPerson) => {
          setSuccessMessage(`Changed ${returnedPerson.name}'s number`);
          setTimeout(() => setSuccessMessage(""), 5000);
          setPersons(
            persons.map((person) =>
              person.name !== newName ? person : returnedPerson
            )
          );
          setNewNumber("");
          setNewName("");
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${personToUpdate.name} has already been removed from server`
          );
          setTimeout(() => setErrorMessage(""), 5000);
        });
    } else {
      phonebookService.create(newPerson).then((returnedPerson) => {
        setSuccessMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => setSuccessMessage(""), 5000);
        setPersons(persons.concat(returnedPerson));
        setNewNumber("");
        setNewName("");
      });
    }
  };

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  useEffect(() => {
    const regex = new RegExp(newFilter, "i");
    const results = persons.filter((person) => person.name.match(regex));
    setFilteredPersons(results);
  }, [newFilter, persons]);

  const removePerson = (id) => {
    const personToRemove = persons.find((p) => p.id === id);
    const confirmed = window.confirm(`Delete ${personToRemove.name}`);
    if (!confirmed) return;

    setPersons(persons.filter((p) => p.id !== id));

    phonebookService
      .remove(id)
      .then(() => console.log(`Removed ${personToRemove.name} succesfully`));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <Filter value={newFilter} onChange={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleName={(event) => setNewName(event.target.value)}
        newNumber={newNumber}
        handleNumber={(event) => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Content
        persons={persons}
        filteredPersons={filteredPersons}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
