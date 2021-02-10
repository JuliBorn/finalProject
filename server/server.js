const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cryptoRandomString = require("crypto-random-string");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

const { sendEmail } = require("./ses");

const { compare, hash } = require("./bc.js");
const db = require("./db");

app.use(express.json());
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

let secrets;
if (process.env.cookie_secret) {
    secrets = process.env.cookie_secret;
} else {
    secrets = require("../secrets.json").sessionSecret;
}

app.use(
    cookieSession({
        secret: secrets,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(csurf());

app.use((req, res, next) => {
    res.cookie("geheimestoken", req.csrfToken());
    next();
});

app.use((req, res, next) => {
    console.log("req.url", req.url);
    console.log("req.session:", req.session);

    next();
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        console.log("GET /welcome");
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        console.log("GET /welcome");
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", (req, res) => {
    console.log("Post request made to /registration", req.body);

    hash(req.body.password).then((hashedPw) => {
        console.log("Password hashed");
        db.addUser(req.body.first, req.body.last, req.body.email, hashedPw)
            .then((result) => {
                if (result.rows[0]) {
                    console.log("Added succcesful to db", result.rows[0]);
                    req.session.userId = result.rows[0];
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

app.post("/login", (req, res) => {
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

app.post("/password/reset/start", (req, res) => {
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
                        sendEmail(
                            "opposite.fibre@spicedling.email",
                            message,
                            "Reset_code"
                        );
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

    // this runs when the user enters their email in ResetPassword
    /*
        things to do here 
        1. verify the email the user entered actually exists in users 
        2. send the email to that user if their email is valid 
            - we have to generate a secret code and send that secret code to the user 
            - we're also going to have store the secret code somewhere 
    */
    // how to verify the email address?
    // query the users table to see if the email exists in it

    // secret code stuff :D
    // this generates a random string of 6 characters

    // we need to store the secret code somewhere
    // we're going to store the secret code in a new table!
    // insert the code and the user's email in our new table

    // use sendEmail to send an email to this user!
    // when calling sendEmail, remember to pass it the email of the recipient,
    // secret code, and subject of email

    // send back a response to the client (ResetPassword) indicating either
    // 1. everything went according to plan
    // 2. something broke along the way :(
});

app.post("/password/reset/verify", (req, res) => {
    console.log("Password reset verify: ", req.body);

    /*
        big picture 
        1. verify the code the user entered is correct 
        2. take new password, hash it, and store it in users 
    */

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
                res.json({ success: true });
            } else {
                console.log("Codes dont match");
                res.json({ error: true });
            }
        })
        .catch((err) => {
            console.log("Error with DB", err);
            res.json({ error: true });
        });

    // verifying the code
    // 1. go to reset_codes and retrieve the code stored there for the user
    // we want to make sure the code is no more than 10 minutes old! We can use this query
    /*
        SELECT * FROM my_table
        WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';
    */
    // if the code is expired - send back a message to React indicating that
    // (send back some sort of failure/error message)
    // if the code is NOT expired...
    // check if the code we received from the user (in req.body) matches the code we received from the db
    // if they do NOT match
    // send back a response to React indicating failure/error/lack of success in some way
    // React should allow the user to enter their code again in this case
    // if they DO match
    // hash the password, update users, and send back a success message to React
    //
});

app.get("/profile/profile_pic", (req, res) => {
    console.log("Get Profile profile_pic", req);
    res.json({ answer: "yes" });
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
