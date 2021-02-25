const spicedPg = require("spiced-pg");

var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/finalProject"
);

module.exports.addSound = (soundUrl) => {
    const q = `INSERT INTO sounds (sound_url) VALUES ($1)`;
    const params = [soundUrl];
    return db.query(q, params);
};

module.exports.getSounds = () => {
    const q = `SELECT * FROM sounds 
    ORDER BY sounds.id DESC LIMIT 5`;
    const params = [];
    return db.query(q, params);
};
