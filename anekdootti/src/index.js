import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    }
  }

  mostVotes ()  {
    let help = 0
    let best = 0
    this.state.votes.forEach(function(element, index, array) {
        if (element > help) {
            help = element
            best = index
        }
    })
    return best
  }

  switchSelected = () => () => {
      this.setState({ selected: this.randomAnecdote() })
  }

  randomAnecdote = () => (
      Math.floor((Math.random() * 5))
  )

  vote = (selected) => () => {
      const copy = [...this.state.votes]
      copy[selected] += 1
      this.setState({ votes: copy })
  }

  render() {
    const selected = this.state.selected
    const votes = this.state.votes
    const anedotes = this.state.anecdotes
    const best = this.mostVotes()
    return (
      <div>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <Button
          handleClick={this.vote(selected)}
          text="vote"
        />
        <Button
          handleClick={this.switchSelected()}
          text="next anecdote"
        />
        <p>{anecdotes[best]}</p>
        <p>has {votes[best]} votes</p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
