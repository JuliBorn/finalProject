const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

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

// app.get("/edit", (req, res) => {
//     console.log("Email route hit");
//     sendEmail("juliusbornmuc@gmail.com", "Hello", "Urgent")
//         .then(() => {
//             console.log("Email send!");
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
