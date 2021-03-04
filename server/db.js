const spicedPg = require("spiced-pg");

var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/finalProject"
);

module.exports.addSound = (soundUrl, recName, category) => {
    const q = `INSERT INTO sounds (sound_url, rec_name, category) VALUES ($1, $2, $3) RETURNING id`;
    const params = [soundUrl, recName, category];
    return db.query(q, params);
};

module.exports.getSounds = () => {
    const q = `SELECT * FROM sounds 
    ORDER BY sounds.id DESC LIMIT 5`;
    const params = [];
    return db.query(q, params);
};
