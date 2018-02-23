const express = require("express");
let http = require("http");
let app = express();
app.use("/summary", express.static(__dirname + "/dist"));
app.get("/health", (req, res) => {
  res.send({
    status: "UP"
  });
});
app.use(express.static("dist"));


const port = process.env.PORT || "3621";
const server = http.createServer(app);

app.set("port", port);

server.listen(port);
