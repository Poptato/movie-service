const thinky = require("../thinky");
const type = thinky.type;

const Celebrity = thinky.createModel("Celebrity", {
    id: type.string().optional(),
    firstName: type.string().regex(/^[A-Z][a-z]+(-[A-Z][a-z]+)*$/).max(18),
    lastName: type.string().regex(/^[A-Z][a-z]+(-[A-Z][a-z]+)*$/).max(18),
    gender: type.string().enum(["male", "female"]),
    birthday: type.date()
});

module.exports = Celebrity;

const Movie = require("./movie");
const Oscar = require("./oscar");

Celebrity.hasAndBelongsToMany(Movie, "appearances", "id", "id");
Celebrity.hasMany(Movie, "directed", "id", "directorId");
Celebrity.hasMany(Oscar, "awards", "id", "celebId");