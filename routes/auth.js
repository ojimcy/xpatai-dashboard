const express = require('express');
const router = express.Router();

router.get('/login', async (req, res) => {
    res.render('login');
  });
  router.get('/register', async (req, res) => {
    res.render('register');
  });

module.exports = router;
