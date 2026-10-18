// src/Todos/List.jsx:
// Import React library, for building JSX elements.
import React from 'react'
// Import the extracted individual Todo component.
import Todo from './Todo'
// Define the TodoList component, accepting todos array and action callbacks as props.
const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  // Explicitly guarantee safeTodos is a real array to prevent runtime crashes.
  const safeTodos = Array.isArray(todos) ? todos : []
  return (
    <>
      {/* Map over the safe array of todo objects (safeTodos) to generate individual Todo components. */}
      {safeTodos
        ?.map((todo) => {
          return (
            <Todo
              key={todo._id}
              todo={todo}
              deleteTodo={deleteTodo}
              completeTodo={completeTodo}
            />
          )
        })
        // Use .reduce() on the array to inject a horizontal rule (<hr />) separator between items (but not at the bottom).
        .reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}
// Export component for use in TodoView.
export default TodoList
