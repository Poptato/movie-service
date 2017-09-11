const thinky = require("../../src/thinky");
const Movie = require("../../src/model/movie");
const Celebrity = require("../../src/model/celebrity");
const Oscar = require("../../src/model/oscar");

class DbInitializer {
    async init() {
        try {
            // Drop existing tables.
            await Promise.all([
                thinky.r.db("test").table("Celebrity").delete().run(),
                thinky.r.db("test").table("Movie").delete().run(),
                thinky.r.db("test").table("Oscar").delete().run()
            ]);
        } finally {
            // Re-create & populate tables.
            this.celebs = await this.createCelebs();
            this.movies = await this.createMovies();
            this.oscars = await this.createOscars();
        }

        console.info("Populated database...");
    }

    async createCelebs() {
        let mockCelebs = require("./mock-celebs.json");
        return await Promise.all(mockCelebs.map(c => Celebrity(c).save()));
    }

    async createMovies() {
        let mockMovies = require("./mock-movies.json");
        return await Promise.all(mockMovies.map(m => Movie(m).save()));
    }

    async createOscars() {
        let mockOscars = require("./mock-oscars.json");
        return await Promise.all(mockOscars.map(o => Oscar(o).save()));
    }
}

module.exports.go = async function() {
  const initializer = new DbInitializer();
  await initializer.init();
  process.exit();
};

module.exports.default = DbInitializer;
