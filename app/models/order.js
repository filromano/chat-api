const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date:  Date,
    number: Number,
    location: String,
    quantity: Number,
});

const Order = mongoose.model('Order', orderSchema);

async function placeOrder(info){
    let order = new Order({
        date: info.date,
        number: info.number,
        location: info.location,
        quantity: info.quantity
    })
    order = await order.save();
    return order._id
}

module.exports = {
    Order,
    placeOrder
} 