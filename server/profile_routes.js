const express = require("express");

const router = express.Router();

const db = require("./db");

router.post("/profile/bio/", (req, res) => {
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

router.get("/api/profile/:id", (req, res) => {
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

exports.router = router;
