let express = require("express");
let socket = require("socket.io");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./orm/passport");
var db = require("./models");
let fenArray = [];

let PORTSOCKET = process.env.PORTSOCKET || 4000;
let PORTSEQ = process.env.PORTSOCKET || 8080;
let app = express();
let server = app.listen(PORTSOCKET, function() {
  console.log("listening on 4000");
});

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
//let routes = require("./routes/user.js");
//let routes = require("./routes/gamehistory.js");
//let routes = require("./routes/chathistory.js");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

var io = socket(server);
io.on("connection", function(socket) {
  console.log("connection made" + socket.id);
  socket.on("fen", function(data) {
    let fen = data.message;
    io.sockets.emit("fen", data);
    console.log(fen);
    fenArray.push(fen);
  });
});

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORTSEQ, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORTSEQ, PORTSEQ);
  });
});
