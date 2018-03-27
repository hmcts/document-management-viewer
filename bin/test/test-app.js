const express = require("express");
let http = require("http");
let app = express();
var cors = require('cors');

app.options('*', cors())

app.use(cors());

app.use('/demproxy/dm/documents/1234-1234-1234/binary', express.static(__dirname + '/1MB.pdf'));

const port = process.env.PORT || "7654";
const server = http.createServer(app);
app.set("port", port);
console.log(`UP on port ${port}`);
server.listen(port);

