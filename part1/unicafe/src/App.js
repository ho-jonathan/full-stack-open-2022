import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Stat = ({stat}) => {
  return (
    <tr>
      <td>{stat.text}</td>
      <td>{stat.value}</td>
    </tr>
  )
}

const Statistics = ({ stats }) => {
  return (
    <table>
      <Stat stat={stats.good} />
      <Stat stat={stats.neutral} />
      <Stat stat={stats.bad} />
      <Stat stat={stats.all} />
      <Stat stat={stats.average} />
      <Stat stat={stats.positive} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const updateGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  const updateNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const updateBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }
  const stats = {
    good: {
      text: 'good',
      value: good,
    },
    neutral: {
      text: 'neutral',
      value: neutral,
    },
    bad: {
      text: 'bad',
      value: bad,
    },
    all: {
      text: 'all',
      value: all,
    },
    average: {
      text: 'average',
      value: all === 0 ? 0 : (good - bad) / all,
    },
    positive: {
      text: 'positive',
      value: all === 0 ? 0 : (good * 100) / all + ' %',
    },
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={updateGood} text="good" />
      <Button handleClick={updateNeutral} text="neutral" />
      <Button handleClick={updateBad} text="bad" />

      <Header text="statistics" />
      {all !== 0 && (<Statistics stats={stats} />)}
      {all === 0 && (<p>No feedback given</p>)}
    </div>
  )
}

export default App;
