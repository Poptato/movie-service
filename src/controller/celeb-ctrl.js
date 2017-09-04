const express = require("express");
const Movie = require("../model/movie");
const Celebrity = require("../model/celebrity");
const Oscar = require("../model/oscar");

const CelebrityController = express.Router();

CelebrityController.get("/", async (req, res) => {
    try {
        let celebs = await Celebrity
            .getJoin({directed: true, awards: true})
            .run();

        res.send(celebs);
    } catch (e) {
        res.status(500).send(e);
    }
});

CelebrityController.post("/", async (req, res) => {
    try {
        let celeb = new Celebrity(req.body);
        let created = await celeb.saveAll();
        res.send(created);
    } catch (e) {
        res.status(500).send(e);
    }
});

CelebrityController.get("/:celebId", async (req, res) => {
    try {
        let celebrity = await Celebrity
            .get(req.params.celebId)
            .getJoin({directed: true, awards: true})
            .run();

        res.send(celebrity);
    } catch (e) {
        res.status(500).send(e);
    }
});

CelebrityController.delete("/:celebId", (req, res) => {
    try {
        let deleted = Celebrity.get(req.params.celebId).delete().run();
        res.send(deleted);
    } catch (e) {
        res.status(500).send(e);
    }
});

CelebrityController.post("/:celebId/appearances/:movieId", async (req, res) => {
    try {
        let celeb = await Celebrity.get(req.params.celebId).getJoin({appearances: true}).run();
        let movie = await Movie.get(req.params.movieId).run();

        celeb.appearances.push(movie);

        let updated = await celeb.saveAll();
        res.send(updated);
    } catch (e) {
        res.status(500).send(e);
    }
});

CelebrityController.delete("/:celebId/appearances/:movieId", async (req, res) => {
    try {
        let celeb = await Celebrity.get(req.params.celebId).getJoin({appearances: true}).run();
        let movie = await Movie.get(req.params.movieId).run();

        celeb.appearances.splice(celeb.appearances.find(movie), 1);

        let updated = await celeb.saveAll();
        res.send(updated);
    } catch (e) {
        res.status(500).send(e);
    }
});

CelebrityController.post("/:celebId/awards/:oscarId", async (req, res) => {
    try {
        let celeb = await Celebrity.get(req.params.celebId).getJoin({appearances: true}).run();
        let oscar = await Oscar.get(req.params.oscarId).run();

        celeb.awards.push(oscar);

        let updated = await celeb.saveAll();
        res.send(updated);
    } catch (e) {
        res.status(500).send(e);
    }
});

CelebrityController.delete("/:celebId/awards/:oscarId", async (req, res) => {
    try {
        let celeb = await Celebrity.get(req.params.celebId).getJoin({appearances: true}).run();
        let oscar = await Movie.get(req.params.oscarId).run();

        celeb.awards.splice(celeb.awards.find(oscar), 1);

        let updated = await celeb.saveAll();
        res.send(updated);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = CelebrityController;