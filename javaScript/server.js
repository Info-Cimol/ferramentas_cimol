const http = require("http");
const app = require("../app/app.js");
const port = 3000;
const server = http.createServer(app);

server.listen(port)