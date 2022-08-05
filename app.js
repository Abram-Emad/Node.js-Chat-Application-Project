const express = require("express");
const path = require("path");
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const socketIO = require("socket.io");

const authRouter = require("./routes/auth.route");
const profileRouter = require("./routes/profile.route");
const friendRouter = require("./routes/friend.route");
const homeRouter = require("./routes/home.route");
const chatRouter = require("./routes/chat.route");
const groupRouter = require("./routes/group.route");

const getFrientRequests = require("./models/user.model").getFriendRequests;

const app = express();
const server = require("http").createServer(app);
const io = socketIO(server);

io.onlineUsers = {};

require("./sockets/friend.socket")(io);
require("./sockets/init.socket")(io);
require("./sockets/chat.socket")(io);
require("./sockets/group.socket")(io);

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(flash());

const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/Chat-Application',
    collection: 'sessions',
});

app.use(session({
    secret: 'this is my small secret thAt you cant know so trust me dont try HHHHH......',
    saveUninitialized: false,
    cookie: {
        maxAge: 1*60*60*100
    },
    store: STORE
}))

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
    let userId = req.session.userId;
    if (userId) {
        getFrientRequests(userId)
            .then(requests => {
                req.friendRequests = requests;
                next();
            })
            .catch(error => res.redirect('/error'));
    } else {
        next();
    }
});

app.use("/", authRouter);
app.use("/", homeRouter);
app.use("/profile", profileRouter);
app.use("/friend", friendRouter);
app.use("/chat", chatRouter);
app.use("/groups", groupRouter);

app.get('/error', (req, res, next) => {
    res.status(500);
    res.render('error.ejs', {
        isUser: req.session.userId,
        pageTitle: "Error",
        friendRequests: req.friendRequests
    });
});

app.use((req, res, next) => {
    res.status(404);
    res.render('not-found', {
        isUser: req.session.userId,
        pageTitle: "Page Not Found",
        friendRequests: req.friendRequests
    });
});

const port = process.env.PORT || 7200;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
