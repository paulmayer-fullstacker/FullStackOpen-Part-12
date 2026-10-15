// todo-app/todo-backend/routes/index.js:

const express = require('express');
const router = express.Router();

const configs = require('../util/config')

// Import get and set from our redis index file.
const { get } = require('../redis');

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

// GET statistics data from redis.
router.get('/statistics', async (req, res) => {
  // Fetch the current count from Redis
  const currentCount = await get('added_todos');
  // if currentCount, parse it as an int. else defaulting to 0 if no todos have been created yet (null).
  const addedTodos = currentCount ? parseInt(currentCount) : 0;
  // Return the required JSON format
  res.json({
    added_todos: addedTodos
  });
});

module.exports = router;
