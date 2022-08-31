import React from 'react'
import axios from 'axios'


const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [], 
    error: '',
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(err => {
        debugger
      })
  } //this is a method that I am using to help


  componentDidMount() {
    this.fetchAllTodos()
  } //this is what comes up after the information comes back from axios

  render() {
    return (
      <div>
        <div id="error>">Error: no error here</div>
        <div id="todos">
        <h2>Todos:</h2>
         {
          this.state.todos.map(td => {
            return <div key={td.id}>{td.name}</div>
          })
         } 
        </div>
        <form id='todoForm'>
          <input type='text' placeholder='Type todo'></input>
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}

