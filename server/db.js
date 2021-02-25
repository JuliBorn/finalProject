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

module.exports.addChatMessage = (message, userId) => {
    const q = `INSERT INTO chat (chat_message, sender_id) VALUES ($1,$2)`;
    const params = [message, userId];
    return db.query(q, params);
};

module.exports.getMessages = () => {
    const q = `SELECT chat.sender_id,chat.chat_message, chat.created_at, users.first, users.last, users.profile_pic_url, chat.id 
    FROM chat
    join users
    ON sender_id = users.id
    ORDER BY chat.id DESC LIMIT 10
    `;
    return db.query(q);
};

module.exports.showLastMessage = () => {
    const q = `SELECT chat.sender_id, chat.chat_message, chat.created_at, users.first, users.last, users.profile_pic_url, chat.id 
    FROM chat
    JOIN users
    ON sender_id = users.id
    ORDER BY chat.id DESC LIMIT 1`;

    return db.query(q);
};
