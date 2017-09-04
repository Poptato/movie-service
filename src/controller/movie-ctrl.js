const express = require("express");
const Movie = require("../model/movie");
const Celebrity = require("../model/celebrity");
const Oscar = require("../model/oscar");

const MovieController = express.Router();

MovieController.get("/", async (req, res) => {
    try {
        let movies = await Movie
            .getJoin({director: true, cast: true, awards: true})
            .run();

        res.send(movies);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

MovieController.post("/", async (req, res) => {
    try {
        let movie = new Movie(req.body);
        let created = await movie.saveAll();
        res.send(created);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

MovieController.get("/:movieId", async (req, res) => {
    try {
        let movie = await Movie
            .get(req.params.movieId)
            .getJoin({director: true, cast: true, awards: true})
            .run();

        res.send(movie);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

MovieController.delete("/:movieId", (req, res) => {
    try {
        let deleted = Movie.get(req.params.movieId).delete().run();
        res.send(deleted);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

MovieController.post("/:movieId/cast/:celebId", async (req, res) => {
    try {
        let movie = await Movie.get(req.params.movieId).getJoin({cast: true}).run();
        let celeb = await Celebrity.get(req.params.celebId).run();

        movie.cast.push(celeb);

        let updated = await movie.saveAll();
        res.send(updated);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

MovieController.delete("/:movieId/cast/:celebId", async (req, res) => {
    try {
        let movie = await Movie.get(req.params.movieId).getJoin({cast: true}).run();
        let celeb = await Celebrity.get(req.params.celebId).run();

        movie.cast.splice(movie.case.find(celeb), 1);

        let updated = await movie.saveAll();
        res.send(updated);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

MovieController.post("/:movieId/awards/:oscarId", async (req, res) => {
    try {
        let movie = await Movie.get(req.params.movieId).getJoin({awards: true}).run();
        let oscar = await Oscar.get(req.params.oscarId).run();

        movie.awards.push(oscar );

        let updated = await movie.saveAll();
        res.send(updated);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

MovieController.delete("/:movieId/awards/:oscarId", async (req, res) => {
    try {
        let movie = await Movie.get(req.params.movieId).getJoin({awards: true}).run();
        let oscar = await Oscar.get(req.params.oscaId).run();

        movie.awards.splice(movie.awards.find(oscar), 1);

        let updated = await movie.saveAll();
        res.send(updated);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

module.exports = MovieController;
