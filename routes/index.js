const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  // Make a request to the backend to get the data
  const data = await axios.get('http://localhost:3000/auth/user');
  res.render('dashboard', { data: data.data });
});

module.exports = router;
