import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotedIdx, setMostVotedIdx] = useState(0)

  const getRandomQuote = () => {
    const randomIdx = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIdx)
  }

  const voteQuote = () => {
    const tmp = [...votes]
    tmp[selected] += 1
    setVotes(tmp)

    const updatedVotes = [...tmp]
    setMostVotedIdx(updatedVotes.indexOf(Math.max(...updatedVotes)))

  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={voteQuote} text="vote" />
      <Button handleClick={getRandomQuote} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotedIdx]}</p>
      <p>has {votes[mostVotedIdx]} votes</p>

    </div>
  )
}

export default App