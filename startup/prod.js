const app = require('./server');
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

const serverPort = appEnv.port;

app.listen(serverPort, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + serverPort);
});