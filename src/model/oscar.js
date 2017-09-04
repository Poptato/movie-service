const thinky = require("../thinky");
const type = thinky.type;

const Oscar = thinky.createModel("Oscar", {
    id: type.string().optional(),
    category: type.string().max(120),
    ceremony: type.date(),
    movieId: type.string(),
    celebId: type.string()
});

module.exports = Oscar;

const Movie = require("./movie");
const Celebrity = require("./celebrity");

Oscar.hasOne(Movie, "forMovie", "movieId", "id");
Oscar.hasOne(Celebrity, "awarded", "celebId", "id");
