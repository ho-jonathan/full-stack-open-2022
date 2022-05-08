import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often', 'Adding manpower to a late software project makes it later!', 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 'Premature optimization is the root of all evil.', 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',];
   
  const points = new Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [currVotes, setCurrVotes] = useState(points)
  const [topVoteIdx, setTopVoteIdx] = useState(0)

  const handleVote = () => {
    const copy = { ...currVotes }
    copy[selected] += 1
    setCurrVotes(copy)
    
    if (copy[selected] > copy[topVoteIdx]) {
      setTopVoteIdx(selected)
    }
  }
  
  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <p>{anecdotes[selected]}</p>
      <p>has {currVotes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      
      <Header text='Anecdote with most votes' />
      <p>{anecdotes[topVoteIdx]}</p>
      <p>has {currVotes[topVoteIdx]} votes</p>
    </div>
  )
}

export default App
