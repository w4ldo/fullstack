import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor() {
      super()
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }
    
    increase = (state, value) => () => {
        this.setState({ [state]: value })
    }
    keskiarvo = () => {
        return (Number(this.state.hyva-this.state.huono)/(this.state.huono+this.state.hyva+this.state.neutraali)).toFixed(2)
    }
    positiivisia = () => {
        return ((Number((this.state.hyva/(this.state.hyva+this.state.huono+this.state.neutraali))*100).toFixed(2)) + '%')
    }


    render(){
      return (
        <div>
          <Heading />
          <Button
          handleClick={this.increase('hyva', this.state.hyva + 1)}
          text="hyvä"
          />
          <Button
          handleClick={this.increase('neutraali', this.state.neutraali + 1)}
          text="neutraali"
          />
          <Button
          handleClick={this.increase('huono', this.state.huono + 1)}
          text="huono"
          />
          <Statistics app={this} />
        </div>
      )
    }
  }

  const Heading = () => (
      <h1>anna palautetta</h1>
  )

  const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
  )

  const Statistics = ({ app }) => {
    if (app.state.hyva+app.state.huono+app.state.neutraali === 0) {
        return (
          <div>
            <h1>statistiikka</h1>
            <em>Ei yhtään palautetta annettu</em>
          </div>
        )
    }
    return (
    <div>
        <h1>statistiikka</h1>
        <table>
            <tbody>
                <Statistic text='hyvä' value={app.state.hyva} />
                <Statistic text='neutraali' value={app.state.neutraali} />
                <Statistic text='huono' value={app.state.huono} />  
                <Statistic text='keskiarvo' value={app.keskiarvo()} />
                <Statistic text='positiivisia' value={app.positiivisia()} />              
            </tbody>
        </table>
    </div>
    )
  }

  const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
  )
  
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
