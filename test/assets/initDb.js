const server = require("../../src/server");
const Movie = require("../../src/model/movie");
const Celebrity = require("../../src/model/celebrity");
const Oscar = require("../../src/model/oscar");

async function initDb() {
    /*
     * Celebs
     */
    const Idan = await Celebrity({
        id: "b4ebd9b6-11e0-4a24-b6c8-cf86202aea49",
        firstName: "Idan",
        lastName: "Asraf",
        gender: "male",
        birthday: new Date(12, 3, 1995)
    }).save();

    const Nati = await Celebrity({
        id: "54b0d91d-8c5f-40cb-83da-152160ba7492",
        firstName: "Natanel",
        lastName: "Oren",
        gender: "male",
        birthday: new Date(13, 5, 1995)
    }).save();

    const DeCaprio = await Celebrity({
        id: "1f3793a0-e54d-474c-a9b0-0e3ba1cd0a66",
        firstName: "Leonardo",
        lastName: "Decaprio",
        gender: "male",
        birthday: new Date(4, 3, 1965)
    }).save();

    const Sasha = await Celebrity({
        id: "51afa916-2f8e-4753-81d2-2d9ae4490af4",
        firstName: "Sasha",
        lastName: "Baron-Cohen",
        gender: "female",
        birthday: new Date(12, 7, 85)
    }).save();

    /*
     * Movies
     */
    const Avengers = await Movie({
        id: "4fc42ea3-9918-4f69-b27c-a899c5c47af4",
        title: "Avengers",
        duration: 120,
        release: new Date(3, 4, 2005),
        genres: ["sci-fi"],
        directorId: Idan.id,
        cast: [Nati, Sasha]
    }).save();

    const Avengers2 = await Movie({
        id: "26682488-eda7-4b97-8cb6-08f71252d5de",
        title: "Avengers 2",
        duration: 120,
        release: new Date(2, 5, 2015),
        genres: ["sci-fi"],
        directorId: Idan.id,
        cast: [Nati, DeCaprio, Sasha]
    }).save();

    const IronMan = await Movie({
        id: "8c5bf4a8-6e50-4b6e-8a4c-a23256a9d20f",
        title: "Iron Man",
        duration: 120,
        release: new Date(6, 11, 2008),
        genres: ["sci-fi"],
        directorId: Nati.id,
        cast: [Nati]
    }).save();

    const CaptainAmerica = await Movie({
        id: "0b7abbb4-c286-4e5a-a2d8-1927295c99be",
        title: "Captain America",
        duration: 90,
        release: new Date(1, 1, 2011),
        genres: ["sci-fi"],
        directorId: DeCaprio.id,
        cast: [Nati, Idan, Sasha]
    }).save();

    /*
     * Oscars
     */
    const Oscar1 = await Oscar({
        id: "6410731e-2631-40f9-a0f0-93ab98b50529",
        category: "Best Potato",
        ceremony: new Date(1, 1, 2015),
        movieId: Avengers.id,
        celebId: Nati.id
    }).save();

    const Oscar2 = await Oscar({
        id: "122d56bf-5c12-4746-939a-6792abcd333f",
        category: "Best Director",
        ceremony: new Date(1, 1, 2015),
        movieId: Avengers.id,
        celebId: Idan.id
    }).save();

    const Oscar3 = await Oscar({
        id: "3212f796-119f-4c24-bfa4-436e78f47ce2",
        category: "Best Actress",
        ceremony: new Date(1, 1, 2011),
        movieId: CaptainAmerica.id,
        celebId: Sasha.id
    }).save();

    const Oscar4 = await Oscar({
        id: "d7413242-c51e-48a8-97eb-f4b73b43e125",
        category: "Best, just best",
        ceremony: new Date(1, 1, 2015),
        movieId: IronMan.id,
        celebId: DeCaprio.id
    }).save();
}

initDb();
