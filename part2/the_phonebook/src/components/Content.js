import React from "react";
import Person from "./Person";

const Content = ({ persons, filteredPersons, removePerson }) => {
  if (filteredPersons.length === 0) {
    return (
      <ul>
        {persons.map((person, index) => (
          <Person
            key={index}
            name={person.name}
            number={person.number}
            removePerson={() => removePerson(person.id)}
          />
        ))}
      </ul>
    );
  } else {
    return (
      <ul>
        {filteredPersons.map((person, index) => (
          <Person
            key={index}
            name={person.name}
            number={person.number}
            removePerson={() => removePerson(person.id)}
          />
        ))}
      </ul>
    );
  }
};

export default Content;
