const express = require("express");
const app = express();
exports.app = app;

const server = require("http").Server(app);

const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

const auth_router = require("./auth_routes").router;

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

//const cookieSession = require("")
const cookieSessionMiddleware = cookieSession({
    secret: secrets,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

app.use(cookieSessionMiddleware);

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

app.use(auth_router);

app.get("/profile", (req, res) => {
    //console.log("Get Profile", req);
    //console.log("Get ID", req.session.userId);
    db.getProfileById(req.session.userId)
        .then((response) => {
            //console.log("Profile from DB", response.rows[0]);
            res.json(response.rows[0]);
        })
        .catch((err) => {
            //console.log(err);
            res.json({ error: true });
        });
});

// app.post("/api/chat", (req, res) => {
//     console.log("Chat Route hit", req);

//     const viewerId = req.session.userId;

//     //console.log("get friends, viewer", viewerId);
// });

app.get("/api/chat", (req, res) => {
    console.log("GET Chat Route hit", req);

    const viewerId = req.session.userId;
    db.getMessages.then((result) => {
        console.log("Result from DB Chat", result);
    });
    //console.log("get friends, viewer", viewerId);
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

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

io.on("connection", (socket) => {});

io.on("connection", async (socket) => {
    console.log(`socket with the id ${socket.id} is now connected`);

    const { userId } = socket.request.session;
    if (!userId) {
        return socket.disconnect(true);
    }
    console.log("connected", userId);

    // socket.on("disconnect", function () {
    //     console.log(`socket with the id ${socket.id} is now disconnected`);
    // });

    socket.on("chatMessage", async (data) => {
        try {
            console.log("socket on sendmessage: ", data);
            const result = await db.addChatMessage(data, userId);
            const lastMsg = await db.showLastMessage();
            console.log("Result laast Chat to DB", lastMsg.rows[0]);
            io.emit("updateChatMessage", lastMsg.rows[0]);
        } catch (err) {
            console.log("IO Error", err);
        }
    });

    try {
        const messages = await db.getMessages();

        io.emit("chatMessages", messages.rows.reverse());
    } catch (err) {
        console.log("err in chatMessage", err);
    }
});
