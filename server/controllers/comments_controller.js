const comments = require('express').Router();
const db = require('../models');
const { Comment } = db;

comments.get('/', async (req, res) => {
    try {
        const allComments = await Comment.findAll();
        console.log('allComments:', allComments);
        res.status(200).json(allComments);
    } catch (error) {
        console.error('Error fetching all comments:', error);
        res.status(500).json({ error: error.toString() });
    }
});

comments.get('/:productId', async (req, res) => {
    try {
        const allComments = await Comment.getCommentsFromProduct(req.params.productId);
        res.status(200).json(allComments);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

module.exports = comments;


