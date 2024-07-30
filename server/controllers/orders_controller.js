const orders = require('express').Router();
const db = require('../models');
const { Order } = db;
const { v4: uuidv4 } = require('uuid');



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
        const processedOrders = await Order.getProcessedOrdersBySellerId(req.params.userId);
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





orders.post('/processCart', async (req, res) => {
    try {
        console.log('Received request to process cart:', req.body);

        if (!req.body.userId || !req.body.shippingMethod) {
            console.error('No userId or shipping provided in request body');
            res.status(400).json({ error: 'Please include a userId' });
            return;
        }

        const unprocessedOrders = await Order.getUnprocessedOrdersByBuyerId(req.body.userId);
        console.log('Fetched unprocessed orders:', unprocessedOrders);

        if (unprocessedOrders.length === 0) {
            console.error('No unprocessed orders found for userId:', req.body.userId);
            res.status(400).json({ error: 'No unprocessed orders found' });
            return;
        }

        const group = await Order.max('orderGroup') + 1;

        for (let i = 0; i < unprocessedOrders.length; i++) {
            unprocessedOrders[i].isProcessed = 1;
            unprocessedOrders[i].orderGroup = group;
            unprocessedOrders[i].shipping = req.body.shippingMethod;
            console.log('Processing order:', unprocessedOrders[i]);
            await unprocessedOrders[i].save();
            console.log('Order saved:', unprocessedOrders[i]);


            if (unprocessedOrders[i].Product){
                unprocessedOrders[i].Product.isAvailable = 0;
                await unprocessedOrders[i].Product.save();
            }
        }

        res.status(200).json(unprocessedOrders);
    } catch (error) {
        console.error('Error processing cart:', error);
        res.status(500).json({ error: 'An error occurred while processing the cart', details: error.message });
    }
});


module.exports = orders;
