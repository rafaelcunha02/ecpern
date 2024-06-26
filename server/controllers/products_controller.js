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

//GET NEXT AVAILABLE PRODUCT
products.get('/:id/next', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        const next = await Product.findNextAvailableProduct(product.id);
        res.status(200).json(next);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET PREVIOUS AVAILABLE PRODUCT
products.get('/:id/previous', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        const previous = await Product.findPreviousAvailableProduct(product.id);
        res.status(200).json(previous);
    } catch (error) {
        res.status(500).json(error);
    }
});


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



