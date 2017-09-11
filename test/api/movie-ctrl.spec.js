const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const request = require("supertest");
const DbInitializer = require("../assets/db-init");
const server = require("../../src/server");

const expect = chai.expect;
chai.use(sinonChai);

describe("MovieController", function() {
    before(async function() {
        const initializer = new DbInitializer();
        await initializer.init();
    });

    describe("GET /movies", function() {
        it("should return all movies", async function() {
            let res = await request(server).get("/movies");
            expect(res.statusCode).to.be.equal(200);
            expect(res.headers["content-type"]).to.be.equal("application/json; charset=utf-8");
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body.length).to.be.equal(4);
        });
    });
});
