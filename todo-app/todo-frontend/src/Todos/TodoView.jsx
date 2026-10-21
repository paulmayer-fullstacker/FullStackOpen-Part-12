// src/Todos/TodoView.jsx:
// Import React hooks for lifecycle management and local state.
import { useEffect, useState } from 'react'
// Import pre-configured Axios client instance for backend API communication.
import axios from '../util/apiClient'
// Import container/presentation components.
import List from './List'
import Form from './Form'
// Define component responsible for data fetching, state management, and backend communication.
const TodoView = () => {
  // Initialise local state to store the list of todos.
  const [todos, setTodos] = useState([])
  // useEffect hook to fetch initial todos when the component mounts.
  useEffect(() => {
    // Define an async refreshTodos() function directly inside useEffect.
    // Thus, avoiding cascading synchronous renders linting warnings.
    const fetchTodos = async () => {
      const { data } = await axios.get('/todos')
      setTodos(data)
    }
    // Execute the data fetching function
    fetchTodos()
  }, []) // Empty dependency array ensures this runs once only, on mount.
  // Handler function to create a new todo via POST request.
  const createTodo = async (todo) => {
    const { data } = await axios.post('/todos', todo)
    // Append the newly created todo object to the existing local state array.
    setTodos([...todos, data])
  }
  // Handler function to delete a todo via DELETE request.
  const deleteTodo = async (todo) => {
    await axios.delete(`/todos/${todo._id}`)
    // Directly fetch and update state here,  instead of relying on a separate component-level refreshTodos() helper function.
    const { data } = await axios.get('/todos')
    setTodos(data)
  }
  // Handler function to mark a todo as complete via PUT request.
  const completeTodo = async (todo) => {
    await axios.put(`/todos/${todo._id}`, {
      text: todo.text,
      done: true
    })
    // Directly fetch and update state directly after updating. Thus, keeping state management clean and avoid linter warnings.
    const { data } = await axios.get('/todos')
    setTodos(data)
  }

  return (
    <>
      <h1>Todos Test</h1>
      {/* Form component handles input creation and passes data up via createTodo prop. */}
      <Form createTodo={createTodo} />
      {/* List component renders the array of todos along with action callbacks. */}
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    </>
  )
}
// Export the main container view
export default TodoView
