const axios = require('axios');

async function placeOrder(info){
    const data = axios.post('http://localhost:1337/orders', {
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