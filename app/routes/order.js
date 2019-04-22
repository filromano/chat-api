const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');

router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.json(order);
});

module.exports = router;