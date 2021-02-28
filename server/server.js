const express = require("express");
const app = express();
// exports.app = app;

const compression = require("compression");
const path = require("path");

const { uploader } = require("./upload");
const awsUrl = require("./config");
const s3 = require("./s3");

const db = require("./db");

app.use(express.json());
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use((req, res, next) => {
    console.log("req.url", req.url);
    next();
});

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "..", "client", "index.html"));
// });

app.post("/sound", uploader.single("audio/mp3"), (req, res) => {
    console.log("sound uploaded", req.file);
    const url = awsUrl.s3Url + req.file.filename;
    db.addSound(url)
        .then((result) => {
            console.log("Added to DB", result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/sounds", (req, res) => {
    console.log("get sounds", req.body);
    // const url = awsUrl.s3Url + req.file.filename;
    db.getSounds()
        .then((result) => {
            console.log("Get to DB", result);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
