import React from 'react'

const PersonForm = ({ addPerson, personData }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={personData.newName}
          onChange={personData.handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={personData.newNumber}
          onChange={personData.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
