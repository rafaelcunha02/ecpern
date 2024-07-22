const replies = require('express').Router();
const db = require('../models');
const { Reply } = db;


//get all replies in db

replies.get('/', async (req, res) => {
    try {
        const allReplies = await Reply.findAll();
        res.status(200).json(allReplies);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

replies.get('/:commentId', async (req, res) => {
    try {
        const allReplies = await Reply.getRepliesFromComment(req.params.commentId);
        res.status(200).json(allReplies);
    } catch (error) {
        res.status(500).json(error);
    }
}
);



module.exports = replies;