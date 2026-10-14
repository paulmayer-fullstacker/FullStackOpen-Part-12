const express = require('express');
const router = express.Router();

const configs = require('../util/config')

// Import the Redis client to test the configuration.
// If the configuration is correct, the server will start successfully without throwing an ECONNREFUSED error.
const redis = require('../redis');

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

module.exports = router;
