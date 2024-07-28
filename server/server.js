// DEPENDENCIES
const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const path = require('path');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// CONFIGURATION / MIDDLEWARE

require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));

// CONTROLLERS

const usersController = require('./controllers/users_controller');
app.use('/api/users', usersController);

const productsController = require('./controllers/products_controller');
app.use('/api/products', productsController);

const caracsController = require('./controllers/caracs_controller');
app.use('/api/caracs', caracsController);

const ordersController = require('./controllers/orders_controller');
app.use('/api/orders', ordersController);

const commentsController = require('./controllers/comments_controller');
app.use('/api/comments', commentsController);

const repliesController = require('./controllers/replies_controller');
app.use('/api/replies', repliesController);

const paymentsController = require('./controllers/payments_controller');
app.use('/api/payments', paymentsController);

// LISTEN 

app.listen(4005, () => {
    console.log('Server is running on port 4005');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});