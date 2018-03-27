const express = require("express");
let http = require("http");
let app = express();

app.use('/demproxy/dm/documents', express.static(__dirname + '/pathToPDF'));

