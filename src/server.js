const express = require("express");
const bodyParser = require("body-parser");
const {join} = require("path");

const InfoController = require("./controller/info-ctrl");
const MovieController = require("./controller/movie-ctrl");
const CelebrityController = require("./controller/celeb-ctrl");
const OscarController  = require("./controller/oscar-ctrl");

let server = new express();
let port = process.env.PORT || 4000;

server.use(bodyParser.json());

server.use("/info", InfoController);
server.use("/movies", MovieController);
server.use("/celebs", CelebrityController);
server.use("/oscars", OscarController);
server.use("/docs", express.static(join(__dirname, "../docs")));

server.listen(port, () => {
   console.log(`Movie service is running on port ${port}`);
});

module.exports = server;