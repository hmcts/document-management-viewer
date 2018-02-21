const express = require('express');
let http = require('http');
let app = express();
app.use(express.static('dist'));

const port = process.env.PORT || '3621';
const server = http.createServer(app);

app.set('port', port);

server.listen(port);
