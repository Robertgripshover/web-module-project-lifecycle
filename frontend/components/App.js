import React from 'react'
import axios from 'axios'
import Form from './Form'


const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [], 
    error: '',
    todoNameInput: '',
    displayCompleteds: true,
  }

  onTodoNameInputChange = evt => {
    const {value} = evt.target
    this.setState({...this.state, todoNameInput: value}) //this is extrating the info from the evt targetd
  }
  resetForm = () => {
    this.setState({...this.state, todoNameInput: ''})
  }

  setAxiosResponseError = err => {
    this.setState({ ...this.state, error: err.response.data.message })
  }

  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
      .then(res => {
        this.setState({...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm()//this bad boy it putting the input box back to normal,
        //bassically you also just to 'this.' and then whatever helper function you have to call it
      })
      .catch(this.setAxiosResponseError)
  }

  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()//this is a submit handler
  } //this is keeping the page from refreshing each time that we click the submit button

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setAxiosResponseError)
      }
   //this is a helper to fetch the todos from axios

  //now we need to make a helper to send a new todo to axios

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({...this.state, todos: this.state.todos.map(td => {
            if (td.id !== id) return td
            return res.data.data
          })
        })
      })
      .catch(this.setAxiosResponseError)
  }

  toggleDisplayCompleteds = () => {
    this.setState({...this.state, displayCompleteds: !this.state.displayCompleteds})
  }

  componentDidMount() {
    this.fetchAllTodos()
  } //this is what comes up after the information comes back from axios
  //for methods that come from React out of the box, 
  //these ones dont need arrow functions because they come with React

  render() {
    return (
      <div>
        <div id="error>">Error: {this.state.error}</div>
        <div id="todos">
        <h2>Todos:</h2>
         {
          this.state.todos.reduce((acc, td) => {
            if (this.state.displayCompleteds || !td.completed) return acc.concat(
              <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name} {td.completed ? ' ✔️' : ''}</div>)
            return acc
          }, [])   
            
          
         } 
        </div>
        <Form
          onTodoFormSubmit={this.onTodoFormSubmit}
          onTodoNameInputChange={this.onTodoNameInputChange}
          toggleDisplayCompleteds={this.toggleDisplayCompleteds}
          displayCompleteds={this.state.displayCompleteds}
          todoNameInput={this.state.todoNameInput}
        />
      </div>
    )
  }
}

