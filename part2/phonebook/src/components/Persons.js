import React from 'react'
import personService from '../services/persons'

const Persons = ({ entry, setPersons }) => {
  const remove = (person) => {
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      personService
        .remove(person.id)
        .then(response => {
          setPersons(entry.filter(e => e !== person))
        })
    }
  }
  return (
    entry.map(person =>
      <p key={person.id}>
        {person.name} {person.number} {' '}
        <button onClick={() => remove(person)}>
          delete
        </button>
      </p>
    )
  )
}

export default Persons
