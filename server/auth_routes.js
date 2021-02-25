const path = require("path");
const { compare, hash } = require("./bc.js");
//const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");

const express = require("express");

const router = express.Router();

const db = require("./db");

router.get("/welcome", (req, res) => {
    if (req.session.userId) {
        console.log("GET /welcome");
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

router.post("/registration", (req, res) => {
    console.log("Post request made to /registration", req.body);

    hash(req.body.password).then((hashedPw) => {
        console.log("Password hashed");
        db.addUser(req.body.first, req.body.last, req.body.email, hashedPw)
            .then((result) => {
                if (result.rows[0]) {
                    console.log("Added succcesful to db", result.rows[0]);
                    req.session.userId = result.rows[0].id;
                    return res.json(result.rows[0]);
                } else {
                    console.log("Wrong Input");
                }
            })
            .catch((err) => {
                console.log("Error adding to DB", err);
                res.json({ error: true });
            });
    });
});

router.post("/login", (req, res) => {
    console.log("Login Post route hit", req.body);
    db.getUserByEmail(req.body.email).then((response) => {
        console.log(("Response from DB", response.rows[0]));

        compare(req.body.password, response.rows[0].password)
            .then((match) => {
                if (match) {
                    console.log("Match", match);
                    req.session.userId = response.rows[0].id;
                    res.json({ error: false });
                } else {
                    console.log("No Match");
                    res.json({ error: true });
                }
            })
            .catch((err) => {
                console.log("Error in compare", err);
            });
    });
});

router.get("/logout", (req, res) => {
    console.log("Logging Out");
    req.session = null;
    res.redirect("/welcome");
});

exports.router = router;
