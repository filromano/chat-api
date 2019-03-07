const express = require('express');
const bodyParser = require('body-parser');
const conversation = require('../app/routes/conversation');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(function(req, res, next){
    
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type");

  next();
});
app.use('/conversation/', conversation);


module.exports = app;