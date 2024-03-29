/**
 * HTTP Server on PORT 8080 to serve html, css, js and static files (const app)
 * SOCKET.IO server on PORT 4000 to serve chess and chat (const io)
 * Sequelize connects to the default port of the remote db server:
 * mySQL(3306), PostGres(5432) or JawsDB(?)
 */
const express = require('express')
const http = require('http')
const session = require('express-session')
const passport = require('./orm/passport')
const db = require('./models')
const app = express()
const exphbs = require('express-handlebars')

// >>>>> Middleware >>>>>
app.use(express.static('public'))
app.use('/static', express.static('node_modules'));
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

const PORTSOCKET = process.env.PORT || 8080 // This is for socket.io server on express

// Set Handlebars Template Language
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Requiring our routes
require('./routes/html-routes.js')(app)
require('./routes/api-routes.js')(app)

// >>>>> Chat and chess socket events >>>>>
const server = http.createServer(app)
const io = require('socket.io').listen(server)
db.sequelize.sync().then(() => {
  server.listen(PORTSOCKET, () => console.log('==> 🌎  Listening for socket.io messages on port %s. Visit http://localhost:%s/ in your browser.', PORTSOCKET, PORTSOCKET))
  
})

// const ioCast = socket(ioserver)
// ioCast.set('origins', '*:*')
const chatUsers = {}
let fenArray = []
const fenCode = ''
const whitePicked = false
let moveArray = []
const room1 = {
  name: 'room1',
  whiteTaken: false,
  blackTaken: false
}

app.post("/new", function (req, res) {
  fenArray = [];
  moveArray=[];
  room1.whiteTaken = false;
  room1.blackTaken = false;
  console.log(room1);

});


app.get('/replay', function (req, res) {
  db.Replay.findAll(
  ).then(function (data) {
    res.json(data)
  })
});

app.post("/save", function (req, res) {
  db.Replay.destroy({
    where: {},
    truncate: true
  });
  db.sequelize.transaction(function (t) {
    var promises = []
    for (move of moveArray) {
      var newPromise = db.Replay.create({
        pieceName: move.pieceName,
        capName: move.capName,
        to: move.to,
        from: move.from,
        replay: "a "
      }, { transaction: t });
      promises.push(newPromise);
    };
    return Promise.all(promises).then(function (data) {
      console.log("logged");
    });
  });
});


io.on('connection', socket => {
  console.log(`Connection made by socketid: [${socket.id}]`)
  const fenStr = fenArray[fenArray.length - 1]
  io.sockets.emit('all', { fen: fenStr });

  socket.on("ready", function (rd) {
    console.log(rd.name);
    let name = rd.name;
    let color;
    if (room1.whiteTaken == false && room1.blackTaken == false) {
      room1.whiteTaken = true;
      color = "w";
    } else if (room1.blackTaken == false) {
      room1.blackTaken = true;
      color = "b";
    } else if (room1.whiteTaken == true && room1.blackTaken == true) {
      color = "observer";
    }
    let newData = {
      color: color,
      name: name
    }
    io.sockets.emit("ready", newData);

  });

  socket.on('game', function (data) {
    console.log(data)
    fenArray.push(data.fen)
    const gameMove = {}
    gameMove.pieceName = data.pieceName
    gameMove.capName = data.capName
    gameMove.to = data.to
    gameMove.from = data.from
    gameMove.side = data.side
    moveArray.push(gameMove)

    io.sockets.emit('all', data)
  })



/* 
  app.get("/ready", function (req, res) {
    let color;
    if (room1.whiteTaken == false && room1.blackTaken == false) {
      room1.whiteTaken = true;
      color = "w";
    } else if (room1.blackTaken == false) {
      room1.blackTaken = true;
      color = "b";
    } else if (room1.whiteTaken == true && room1.blackTaken == true) {
      color = "observer";
    }

    res.json({ color: color });
    console.log(color);

  }); */




  /*
  console.log(moveArray);
  let storageStr = JSON.stringify(moveArray);
  for (move of moveArray) {
    db.Replay.create({
      pieceName: move.pieceName,
      capName: move.capName,
      to: move.to,
      from: move.from,
      replay: "a "
    }).then(function (data) {
      console.log("logged");
    })
  
  } */

  socket.on('new-user', name => {
    try {
      chatUsers[socket.id] = name
      socket.broadcast.emit('user-connected', name)
      console.log(`%c SERVER.js -> New User [${name}] Connected`, 'background: #00FF00; color: #FFFFFF;')
    } catch (error) {
      console.log('%c SERVER.js -> EXCEPTION ON NEW USER', 'background: #FF0000; color: #FFFFFF;')
    }
  })

  socket.on('send-chat-message', message => {
    try {
      socket.broadcast.emit('chat-message', { message: message, name: chatUsers[socket.id] })
      console.error(`%c SERVER.js -> New CHAT [${message}]`, 'background: #00FF00; color: #FFFFFF;')
    } catch (error) {
      console.log('%c SERVER.js -> EXCEPTION ON SEND-CHAT-MESSAGE', 'background: #FF0000; color: #FFFFFF;')
    }
  })

  socket.on('disconnect', () => {
    try {
      socket.broadcast.emit('user-disconnected', chatUsers[socket.id])
      delete chatUsers[socket.id]
      console.log(`%c SERVER.js -> User [${socket.id}] DISconnected`, 'background: #00FF00; color: #FFFFFF;')
    } catch (error) {
      console.log('%c SERVER.js -> EXCEPTION ON DISCONNECT', 'background: #FF0000; color: #FFFFFF;')
    }
  })
})

/**************************************************************
 * Login to the db and then start the web server application  *
 **************************************************************
*/
// Syncing our database and logging a message to the user upon success
// db.sequelize.sync().then(() => {
//   app.listen(PORTSEQ, () => {
//     console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORTSEQ, PORTSEQ)

//   })
// })
