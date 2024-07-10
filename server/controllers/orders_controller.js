const orders = require('express').Router();
const db = require('../models');
const { Order } = db;


//GET ALL ORDERS

orders.get('/', async (req, res) => {
    try {
        const allOrders = await Order.findAll();
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(500).json(error);
    }
}
);


//CREATE ORDER

orders.post('/create', async (req, res) => {
    try {
        
        if(!req.body.productId || !req.body.buyerId || !req.body.sellerId){
            res.status(400).json({error: 'Please include a productId, buyerId, and sellerId'});
            return;
        }

        const newOrder = {
            productId: req.body.productId,
            buyerId: req.body.buyerId,
            sellerId: req.body.sellerId
        }

        await Order.create(newOrder)
        .then(order => {
            console.log(order.toJSON());
        })
        .catch(error => {
            console.error(error);
        });
        

        res.status(200).json(newOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});



//GET ALL UNPROCESSED ORDERS FROM A BUYER

orders.get('/cart/:userId', async (req, res) => {
    try {
        const unprocessedOrders = await Order.getUnprocessedOrdersByBuyerId(req.params.userId);
        res.status(200).json(unprocessedOrders);
    } catch (error) {
        res.status(500).json(error);
    }
}
);


//GET ALL PROCESSED ORDERS FROM A BUYER

orders.get('/buys/:userId', async (req, res) => {
    try {
        const processedOrders = await Order.getProcessedOrdersByBuyerId(req.params.userId);
        res.status(200).json(processedOrders);
    } catch (error) {
        res.status(500).json(error);
    }
}
);


//GET ALL PROCESSED ORDERS FROM A SELLER

orders.get('/sales/:userId', async (req, res) => {
    try {
        const processedOrders = await Order.getProcessedOrdersByBuyerId(req.params.userId);
        res.status(200).json(processedOrders);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

orders.delete('/delete/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if(!order){
            res.status(404).json({error: 'Order not found'});
            return;
        }
        await order.destroy();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

module.exports = orders;
