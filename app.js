var app = require('./config/server');
var port= 3000;

app.listen(port, function(){
    console.log('Server online on port: ' + port);
});