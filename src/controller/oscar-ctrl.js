const express = require("express");
const Oscar = require("../model/oscar");

const OscarController = express.Router();

OscarController.get("/", async (req, res) => {
    try {
        let oscars = await Oscar
            .getJoin({awarded: true, forMovie: true})
            .run();

        res.send(oscars);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

OscarController.post("/", async (req, res) => {
    try {
        let oscar = new Oscar(req.body);
        let created = await oscar.saveAll();
        res.send(created);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

OscarController.get("/:oscarId", async (req, res) => {
    try {
        let oscar = await Oscar
            .get(req.params.oscarId)
            .getJoin({awarded: true, forMovie: true})
            .run();

        res.send(oscar);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

module.exports = OscarController;
