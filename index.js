const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const axios = require('axios');
require('dotenv').config();

const homeRoute = require('./routes/index');
const authRoutes = require('./routes/auth');

const app = express();

// Set up handlebars as the view engine
//Handlebars
app.engine(
  '.hbs',
  engine({
    defaltLayout: 'layout',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoute);
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
