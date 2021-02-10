const spicedPg = require("spiced-pg");

var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.addUser = (first, last, email, password) => {
    const q = `INSERT INTO users (first, last, email,password) VALUES ($1, $2, $3,$4) RETURNING id`;
    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.getUserByEmail = (email) => {
    const q = `SELECT * FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.storeResetCode = (reset_code, email) => {
    const q = `INSERT INTO reset_codes (code, email) VALUES ($1, $2)`;
    const params = [reset_code, email];
    return db.query(q, params);
};

module.exports.getResetCode = () => {
    const q = `SELECT * FROM reset_codes
    WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'`;
    return db.query(q);
};
