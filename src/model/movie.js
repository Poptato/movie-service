const thinky = require("../thinky");
const type = thinky.type;

const Movie = thinky.createModel("Movie", {
    id: type.string().optional(),
    title: type.string().min(1).max(120),
    duration: type.number().integer().min(0),
    release: type.date(),
    directorId: type.string()
});

module.exports = Movie;

const Celebrity = require("./celebrity");
const Oscar = require("./oscar");

Movie.hasAndBelongsToMany(Celebrity, "cast", "id", "id");
Movie.belongsTo(Celebrity, "director", "directorId", "id");
Movie.hasMany(Oscar, "awards", "id", "movieId");