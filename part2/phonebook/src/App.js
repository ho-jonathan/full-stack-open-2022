import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredList, setFilteredList] = useState(persons)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const entryExists = (persons.filter(person => person.name === personObject.name))
    if (entryExists.length) {
      const result = window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const _id = entryExists[0].id
        personService
          .update(_id, personObject)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(person =>
              person.id === returnedPerson.id ?
                returnedPerson : person))
          })
          .catch(error => {
            setMessage(
              `${personObject.name} was already removed from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFilteredList(persons.filter(person =>
      person.name.includes(event.target.value)))
  }
  const personData = {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} personData={personData} />
      <h2>Numbers</h2>
      {filter === '' ?
        <Persons entry={persons} setPersons={setPersons} />
        :
        <Persons entry={filteredList} setPersons={setPersons} />
      }
    </div>
  )
}

export default App;
