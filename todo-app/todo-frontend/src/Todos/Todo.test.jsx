// src/Todos/Todo.test.jsx:
// Import rendering utilities and screen query helpers (getByText()), from React Testing Library
import { render, screen } from '@testing-library/react'
// Import custom DOM matchers (i.e., toBeInTheDocument())for assertions.
import '@testing-library/jest-dom'
// Import the single Todo component being tested.
import Todo from './Todo'
// Import test runner utilities from Vitest.
import { test, expect } from 'vitest'
// Define a component test checking that todo text renders correctly in isolation.
test('the frontend renders todo text correctly', () => {
  // Create a mock data object simulating a single standalone todo item.
  const todo = {
    text: 'Test single todo component',
    done: false
  }
  // Render the standalone Todo component inside a virtual JSDOM environment.
  render(<Todo todo={todo} />)
  // Query the virtual DOM to find the element containing our mock todo text.
  const element = screen.getByText('Test single todo component')
  // toBeDefined(): Generic matcher, only checks that the JS variable is not undefined.
  // expect(element).toBeDefined()  // Redundant. If getByText() succeeds, toBeDefined() must also succeed.
  // toBeInTheDocument(): Explicitly assert that the element is actively attached to the virtual DOM tree
  expect(element).toBeInTheDocument()

  // Custom success message that will print to the terminal, if --progress=plain flag is set in build command.
  console.log('✅ CUSTOM CHECK: Todo component tests success during Docker build.')

})