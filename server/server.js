const express = require("express");
const app = express();
exports.app = app;
const router = require("./auth_routes").router;

const compression = require("compression");
const path = require("path");

const cookieSession = require("cookie-session");
const csurf = require("csurf");

const { uploader } = require("./upload");
const awsUrl = require("./config");
const s3 = require("./s3");

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

app.use(router);

app.get("/profile", (req, res) => {
    console.log("Get Profile", req);
    console.log("Get ID", req.session.userId);
    db.getProfileById(req.session.userId)
        .then((response) => {
            console.log("Profile from DB", response.rows[0]);
            res.json(response.rows[0]);
        })
        .catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
});

app.post(
    "/profile/profile_pic/",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        console.log("upload complete");
        console.log("Storing image for id: ", req.session.userId);

        console.log("req.file: ", req.file);
        const url = awsUrl.s3Url + req.file.filename;
        console.log("URL: ", url);
        db.upsertProfilePicUrl(url, req.session.userId)
            .then((result) => {
                console.log("Result from DB", result.rows);
                res.json({ profilePicUrl: result.rows[0].profile_pic_url });
            })
            .catch((err) => {
                console.log("Error in DB", err);
                res.json({ error: true });
            });
        //console.log("req.body URL: ", req.body.profilePicUrl);
    }
);

app.post("/profile/bio/", (req, res) => {
    console.log("Bio Route hit");
    console.log("Storing bio for id: ", req.session.userId);
    console.log("Data from Client: Bio", req.body);
    db.addBio(req.body.bio, req.session.userId)
        .then((result) => {
            console.log(result.rows[0]);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("Error adding Bio to DB", err);
        });
});

app.get("/api/profile/:id", (req, res) => {
    console.log("Get Profile", req.params.id);

    db.getProfileById(req.params.id)
        .then((response) => {
            console.log("Profile from DB", response.rows[0]);
            res.json(response.rows[0]);
        })
        .catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
});

app.get("/api/users", (req, res) => {
    console.log("get Users route hit", req.query);

    db.getUsersByName(req.query.input)
        .then((result) => {
            //console.log("Result from DB inc Search: ", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("Error inc Search", err);
        });
});

app.get("/api/users/latest", (req, res) => {
    console.log("get Users latest route hit");

    db.getUsersLatest()
        .then((result) => {
            //console.log("Result from DB inc Search: ", result.rows);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("Error inc Search", err);
        });
});

app.get("*", (req, res) => {
    if (!req.session.userId) {
        // if user not logged in redirect to welcome
        res.redirect("/welcome");
    } else {
        // if user logged in send over the html
        // once the client has the HTML start.js will render the <p>
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
