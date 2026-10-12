//routes/todos.js:

const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos list */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to list */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params                  // Extract the Id from the URL.
  req.todo = await Todo.findById(id)         // Query MongoDB for this specific todo (by Id).
  if (!req.todo) return res.sendStatus(404)  // If id not found, terminate and sends 404.
  next()                                     // else moves on to the next step.
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  // Updated to use .deleteOne() per Mongoose v7+.
  await req.todo.deleteOne();
  res.sendStatus(200);
});

/* GET todo by Id */
singleRouter.get('/', async (req, res) => {
  // res.sendStatus(405); // Implement this
  // Return the todo document attached to the request object by findByIdMiddleware
  res.json(req.todo);  // Accesses the todo already fetched by the middleware.
});

/* PUT new instructions to todo. */
singleRouter.put('/', async (req, res) => {
  // res.sendStatus(405); // Implement this
  // Extract text and done status from the request body.
  const { text, done } = req.body;

/// Construct an update object dynamically based on what was provided in the request body.
  const updateData = {};
  if (text !== undefined) updateData.text = text;
  if (done !== undefined) updateData.done = done;

  // Use findByIdAndUpdate to perform an atomic update with validation.
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.todo._id,
    updateData,
    { new: true, runValidators: true } // { new: true } returns the updated document rather than the old one
  );
  // Send back the updated todo document.
  res.json(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
