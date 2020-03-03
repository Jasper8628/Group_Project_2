let express = require("express");
let socket = require("socket.io");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./orm/passport");
var db = require("./models");
let fenArray = [];
let fenCode = "";

let PORT2 = 3000;
let PORTSOCKET = process.env.PORTSOCKET || 4000;
let PORTSEQ = process.env.PORTSOCKET || 8080;
let app = express();
var exphbs = require('express-handlebars')
let cast = app.listen(PORT2, function () {
  console.log("server listening on 3000");
})
app.use(express.static("public"));
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


var ioCast = socket(cast);
let whitePicked = false;
let moveArray = [];
let room1 = {
  name: "room1",
  whiteTaken: false,
  blackTaken: false

}

ioCast.on("connection", function (socket) {
  console.log("connection made" + socket.id);
  let fenStr = fenArray[fenArray.length - 1];
  ioCast.sockets.emit("all", { fen: fenStr });

  socket.on("game", function (data) {
    console.log(data);
    fenArray.push(data.fen);
    let gameMove = {};
    gameMove.pieceName = data.pieceName;
    gameMove.capName = data.capName;
    gameMove.to = data.to;
    gameMove.from = data.from;
    moveArray.push(gameMove);

    ioCast.sockets.emit("all", data);

  });
});

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORTSEQ, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORTSEQ, PORTSEQ);
  });
});

app.get("/replay", function (req, res) {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Author
  db.Replay.findAll().then(function (data) {
    res.json(data);
  });
});

app.post("/save", function (req, res) {
  let storageStr=JSON.stringify(moveArray);
      db.Replay.create({
        playerName:playerName,
        replay:storageStr
      }).then(function (data) {
        res.json(data);
      });
  
});
