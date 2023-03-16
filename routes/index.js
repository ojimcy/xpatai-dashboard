const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  res.render('dashboard');
});
router.get('/profile', async (req, res) => {
    res.render('profile');
  });
  router.get('/referrals', async (req, res) => {
    res.render('referrals');
  });

module.exports = router;
