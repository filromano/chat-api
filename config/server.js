var express = require('express');
var bodyParser = require('body-parser');
var consign = require('consign');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(function(req, res, next){
    
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-type");

  next();
});

consign()
  .include('app/routes')
  .include('app/controllers')
  .into(app);


module.exports = app;