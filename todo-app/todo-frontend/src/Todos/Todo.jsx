// src/Todos/Todo.jsx:
// Import React for building JSX elements
import React from 'react'
// Define the individual Todo presentation component, receiving the todo object and event callbacks.
const Todo = ({ todo, deleteTodo, completeTodo }) => {
  // Curried click handler for deleting a todo item.
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }
  // Curried click handler for marking a todo item as complete.
  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }
  // Define JSX fragment to mark a todo as done (status: true), and offer only delete button.
  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
      </span>
    </>
  )
  // Define JSX fragment to denote that todo is still pending (status: false). Not done.
  const notDoneInfo = (
    <>
      <span>
        This todo is not done
      </span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
        <button onClick={onClickComplete(todo)}> Set as done </button>
      </span>
    </>
  )

  return (
    // Flexbox layout container for alignment of todo text and action buttons.
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      <span>
        {todo.text} 
      </span>
      {/* Conditional ternary operator: if todo.done render doneInfo, else render notDoneInfo */}
      {todo.done ? doneInfo : notDoneInfo}
    </div>
  )
}
// Export the Todo component for use in List.jsx
export default Todo