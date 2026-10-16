// src/Todos/List.jsx: 
// Import React library, for building JSX elements.
import React from 'react'
// Import the extracted individual Todo component.
import Todo from './Todo'
// Define the TodoList component, accepting todos array and action callbacks as props.
const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {/* Map over the array of todo objects to generate individual Todo components */}
      {todos.map(todo => {
        return <Todo key={todo._id} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
      // Use .reduce() on the array to inject a horizontal rule (<hr />) separator between items (but not at the bottom).
      }).reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}
// Export component for use in TodoView.
export default TodoList