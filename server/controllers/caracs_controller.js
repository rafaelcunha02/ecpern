const caracs = require('express').Router();
const db = require('../models');
const { Caracteristicas } = db;

//GET ALL CARACS

caracs.get('/', async (req, res) => {
    try {
        const allCaracs = await Caracteristicas.findAll();
        res.status(200).json(allCaracs);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

//GET ALL CARACS BY TYPE

caracs.get('/:type', async (req, res) => {
    try {
        const allCaracs = await Caracteristicas.getCaracteristicasByType(req.params.type);
        res.status(200).json(allCaracs);
    } catch (error) {
        res.status(500).json(error);
    }
}
);






module.exports = caracs;



