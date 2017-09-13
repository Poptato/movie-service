const thinky = require("../../src/thinky");
const Movie = require("../../src/model/movie");
const Celebrity = require("../../src/model/celebrity");
const Oscar = require("../../src/model/oscar");

class DbInitializer {
    async init() {
        // Re-create & populate tables.
        this.celebs = await this.createCelebs();
        this.movies = await this.createMovies();
        this.oscars = await this.createOscars();

        console.info("Populated database...");
    }

    async createCelebs() {
        try {
            await thinky.r.db("test").table("Celebrity").delete().run();
        } finally {
            let mockCelebs = require("./mock-celebs.json");
            return await Promise.all(mockCelebs.map(c => Celebrity(c).save()));
        }
    }

    async createMovies() {
        try {
            await thinky.r.db("test").table("Movie").delete().run();
        } finally {
            let mockMovies = require("./mock-movies.json");
            return await Promise.all(mockMovies.map(m => Movie(m).save()));
        }
    }

    async createOscars() {
        try {
            await thinky.r.db("test").table("Oscar").delete().run();
        } finally {
            let mockOscars = require("./mock-oscars.json");
            return await Promise.all(mockOscars.map(o => Oscar(o).save()));
        }
    }

    static async go() {
        const initializer = new DbInitializer();
        await initializer.init();
        process.exit();
    }
}

module.exports = DbInitializer;
