const Express = require("express");
const bodyParser = require("body-parser");

const InfoController = require("./controller/info-ctrl");
const MovieController = require("./controller/movie-ctrl");
const CelebrityController = require("./controller/celeb-ctrl");
const OscarController  = require("./controller/oscar-ctrl");

let server = new Express();
let port = process.env.PORT || 4000;

server.use(bodyParser.json());

server.use("/info", InfoController);
server.use("/movies", MovieController);
server.use("/celebs", CelebrityController);
server.use("/oscars", OscarController);

server.listen(port, () => {
   console.log(`Movie service is running on port ${port}`);
});

module.exports = server;