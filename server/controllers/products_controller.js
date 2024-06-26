const products = require('express').Router();
const db = require('../models');
const { Product } = db;

//GET ALL PRODUCTS

products.get('/', async (req, res) => {
    try {
        const allProducts = await Product.findAll();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

//GET PRODUCT BY ID

products.get('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

module.exports = products;



