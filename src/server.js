const Express = require("express");
const bodyParser = require("body-parser");

const InfoController = require("./controller/info-ctrl");
const MovieController = require("./controller/movie-ctrl");
const CelebrityController = require("./controller/celeb-ctrl");
const OscarController  = require("./controller/oscar-ctrl");

let app = new Express();
let port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use("/info", InfoController);
app.use("/movies", MovieController);
app.use("/celebs", CelebrityController);
app.use("/oscars", OscarController);

app.listen(port, () => {
   console.log(`Movie service is running on port ${port}`);
});

module.exports = app;