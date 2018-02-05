import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filtering: ''
    }
  }
  
  componentDidMount() {
    console.log('will mount')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }

  handleNameChange = (event) => {
    /*console.log(event.target.value)*/
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    /*console.log(event.target.value)*/
    this.setState({ newNumber: event.target.value })
  }
  filterNames = (event) => {
    this.setState({ filtering: event.target.value })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    const found = this.state.persons.find(function(person) {
      return person.name === personObject.name
    })

    if (typeof found === "undefined") {
      const people = this.state.persons.concat(personObject)
  
      this.setState({
      persons: people,
      newName: '',
      newNumber: ''
    })
    } else {
      this.setState({
        newName: '',
        newNumber: ''
      })
      alert("Ei voi lisätä henkilöä uudelleen")
    }
  }

  showNames = () => {
    const personsToShow = this.state.persons
    .filter(person => person.name
      .toLowerCase()
      .startsWith(
        this.state.filtering
        .toLocaleLowerCase())
      )

    return (
    personsToShow.map(person => 
      <li key={person.name}>
        {person.name} {person.number}
      </li>)
    )
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        rajaa näytettäviä<input 
          value={this.state.filtering}
          onChange={this.filterNames}
        />
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            numero: <input 
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>

        <h2>Numerot</h2>
        <ul>
          {this.showNames()}
        </ul>
      </div>
    )
  }
}

export default App