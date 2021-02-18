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

module.exports.updateUser = (email, password) => {
    const q = `UPDATE users SET password= $2 WHERE email = $1`;
    const params = [email, password];
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

module.exports.getProfileById = (userId) => {
    const q = `SELECT * FROM users WHERE id = $1`;
    const params = [userId];
    return db.query(q, params);
};

module.exports.upsertProfilePicUrl = (profilePicUrl, userId) => {
    const q = `UPDATE users 
    SET profile_pic_url = $1
    WHERE id = $2 
    RETURNING profile_pic_url`;
    const params = [profilePicUrl, userId];
    return db.query(q, params);
};

module.exports.addBio = (bio, userId) => {
    const q = `UPDATE users 
    SET bio = $1
    WHERE id = $2 
    RETURNING bio`;
    const params = [bio, userId];
    return db.query(q, params);
};

module.exports.getUsersByName = (search) => {
    const q = `SELECT * FROM users WHERE first ILIKE $1`;
    const params = [search + "%"];
    return db.query(q, params);
};

module.exports.getUsersLatest = () => {
    const q = `SELECT * FROM users ORDER BY id DESC LIMIT 3;`;
    return db.query(q);
};

module.exports.getFriendshipStatus = (viewerId, viewedId) => {
    const q = `SELECT * FROM friendships
            WHERE (recipient_id = $1 AND sender_id = $2)
            OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [viewedId, viewerId];
    return db.query(q, params);
};

module.exports.requestFriendship = (viewerId, viewedId) => {
    const q = `INSERT INTO friendships (recipient_id, sender_id) VALUES ($1, $2) RETURNING id;`;
    const params = [viewerId, viewedId];
    return db.query(q, params);
};

module.exports.acceptFriendship = (viewerId, viewedId) => {
    const q = `UPDATE friendships 
            SET accepted = true 
            WHERE (recipient_id = $1 AND sender_id = $2)
            OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [viewerId, viewedId];
    return db.query(q, params);
};

module.exports.getFriends = (viewerId) => {
    const q = `SELECT users.id, first, last, profile_pic_url, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)`;
    const params = [viewerId];
    return db.query(q, params);
};
