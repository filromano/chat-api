const axios = require('axios');

async function placeOrder(info){
    axios.post('http://localhost:1337/orders', {
        date: info.date,
        number: info.number,
        location: info.location,
        quantity: info.quantity
    })
    .then(response => {
        console.log(response.data);
        return
    })
    .catch(error => { 
        console.error(error);
        return
    });
}

module.exports = {
    placeOrder
} 