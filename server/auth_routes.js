const path = require("path");
const { compare, hash } = require("./bc.js");
//const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");

const express = require("express");

const router = express.Router();


const { sendEmail } = require("./ses");

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

router.post("/password/reset/start", (req, res) => {
    console.log("Password reset start: ", req.body);

    db.getUserByEmail(req.body.email)
        .then((result) => {
            console.log("Result from Database", result.rows);
            if (result.rows[0]) {
                console.log("Result from DB", result.rows[0]);

                const secretCode = cryptoRandomString({
                    length: 6,
                });

                console.log("Secret Code: ", secretCode);

                db.storeResetCode(secretCode, req.body.email)
                    .then((result) => {
                        console.log("Reset Code stored", result);
                        const message = `Hello, your code is: ${secretCode}`;
                        sendEmail(req.body.email, message, "Reset_code");
                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log("Error in DB", err);
                    });
            } else {
                console.log("No Email found");
                res.json({ error: true });
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/password/reset/verify", (req, res) => {
    console.log("Password reset verify: ", req.body);

    db.getResetCode()
        .then((result) => {
            console.log("Reset codes from DB: ", result.rows);
            let resetCodes = result.rows.sort((a, b) => {
                a.timestamp - b.timestamp;
            });
            const lastCode = resetCodes[resetCodes.length - 1];
            console.log("Sortet Array", resetCodes);
            console.log("last code", lastCode.code);
            if (lastCode.code === req.body.code) {
                console.log("Right Code!!!");
                console.log("New Password", req.body.password);

                hash(req.body.password).then((hashedPw) => {
                    console.log("Hashed PW: ", hashedPw);
                    db.updateUser(req.body.email, hashedPw)
                        .then((result) => {
                            console.log("Updated PW in DB", result);
                            res.json({ success: true });
                        })
                        .catch((err) => {
                            console.log("Error updating DB", err);
                        });
                });
            } else {
                console.log("Codes dont match");
                res.json({ error: true });
            }
        })
        .catch((err) => {
            console.log("Error with DB", err);
            res.json({ error: true });
        });
});

router.get("/logout", (req, res) => {
    console.log("Logging Out");
    req.session = null;
    res.redirect("/welcome");
});

exports.router = router;
