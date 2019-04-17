const axios = require('axios');
const config = require('config');

async function placeOrder(info){
    const data = axios.post(config.get('db') + '/orders', {
        date: info.date,
        number: info.number,
        location: info.location,
        quantity: info.quantity
    })
    .then(response => {
        return response.data.id;
    })
    .catch(error => { 
        console.error(error);
        return
    });
    return data;
}

module.exports = {
    placeOrder
} 