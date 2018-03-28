const express = require("express");
const config = require("./config/default");
let proxy = require("http-proxy-middleware");
let http = require("http");
let app = express();
console.log(config);

app.use((req, res, next) => {
  req.headers["user-id"] = "12";
  req.headers["ServiceAuthorization"] = config.serviceToken;
  req.headers["user-roles"] = "caseworker-cmc";
  next();
});

app.use("/demproxy", proxy({
    target: config.dmStore,
    logLevel: "debug",
    router: {
      "/demproxy/dm": config.dmStore,
      "/demproxy/an": config.emAnno
    },
    pathRewrite: {
      "^/demproxy/dm": "/",
      "^/demproxy/an": "/",
    }
  }
));

app.use(express.static("dist"));
app.use("/summary", express.static(__dirname + "/dist"));
app.get("/health", (req, res) => {
  res.send({
    status: "UP"
  });
});
app.get("/config", (req, res) => {
  res.send(config);
});

const port = process.env.PORT || "3621";
const server = http.createServer(app);
app.set("port", port);
server.listen(port);
