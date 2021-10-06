import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.totalFeedback === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={props.totalFeedback} />
        <StatisticLine text='average' value={props.averageFeedback} />
        <StatisticLine text='positive' value={props.pctPositiveFeedback} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  if (isNaN(props.value)) {
    props.value = 0
  }
  return (
    <tr>
      <td>{props.text} {props.value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const totalFeedback = good + neutral + bad
  const averageFeedback = (good - bad) / totalFeedback
  const pctPositiveFeedback = (good / totalFeedback) * 100

  return (
    <div>
      <h2>
        give feedback
      </h2>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />

      <h2>
        statistics
      </h2>
      <Statistics good={good} neutral={neutral} bad={bad} totalFeedback={totalFeedback} averageFeedback={averageFeedback} pctPositiveFeedback={pctPositiveFeedback} />
    </div>
  )
}

export default App;