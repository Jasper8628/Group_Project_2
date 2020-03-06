/**
 * HTTP Server on PORT 8080 to serve html, css, js and static files (const app)
 * SOCKET.IO server on PORT 4000 to serve chess and chat (const io)
 * Sequelize connects to the default port of the remote db server:
 * mySQL(3306), PostGres(5432) or JawsDB(?)
 */
const express = require('express')
const socket = require('socket.io')
const session = require('express-session')
const passport = require('./orm/passport')
const db = require('./models')
const app = express()
const exphbs = require('express-handlebars')

// >>>>> Middleware >>>>>
app.use(express.static('public'))
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

const PORTSOCKET = process.env.PORTSOCKET || 4000 // This is for socket.io server
const PORTSEQ = process.env.PORTSEQ || 8080 // This is for the html server

// Set Handlebars Template Language
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Requiring our routes
require('./routes/html-routes.js')(app)
require('./routes/api-routes.js')(app)

// let cast = app.listen(PORT2, function () { console.log("server listening on 3000");});

// >>>>> Chat and chess socket events >>>>>
const ioserver = app.listen(PORTSOCKET, () => console.log(`listening for socket.io messages on port ${PORTSOCKET}`))
const ioCast = socket(ioserver)
ioCast.set('origins', '*:*')
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

ioCast.on('connection', socket => {
  console.log(`Connection made by socketid: [${socket.id}]`)
  const fenStr = fenArray[fenArray.length - 1]
  ioCast.sockets.emit('all', { fen: fenStr })

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

    ioCast.sockets.emit('all', data)
  })

  app.post('/new', function (req, res) {
    moveArray = []
  })

  app.get('/replay', function (req, res) {
    db.Replay.findAll(
    ).then(function (data) {
      res.json(data)
    })
  })

<<<<<<< HEAD
app.post("/new",function(req,res){
  fenArray=[];
  room1.whiteTaken=false;
  room1.blackTaken=false;

});

app.get("/replay", function (req, res) {
  db.Replay.findAll(
  ).then(function (data) {
    res.json(data);
  });
});

app.get("/ready", function (req, res) {
  let color;
  if(room1.whiteTaken==false && room1.blackTaken==false){
    room1.whiteTaken=true;
    color="w";
  } else if(room1.blackTaken==false){
    room1.blackTaken=true;
    color="b";
  } else if(room1.whiteTaken==true && room1.blackTaken==true){
    color="observer";
  }
  
  res.json({color:color});
  console.log(color);
  
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

/*
=======
  app.get('/ready', function (req, res) {
    let color
    if (room1.whiteTaken == false && room1.blackTaken == false) {
      room1.whiteTaken = true
      color = 'w'
    } else if (room1.blackTaken == false) {
      room1.blackTaken = true
      color = 'b'
    } else if (room1.whiteTaken == true && room1.blackTaken == true) {
      color = 'observer'
    }

    res.json({ color: color })
    console.log(color)
  })

  app.post('/save', function (req, res) {
    db.Replay.destroy({
      where: {},
      truncate: true
    })
    db.sequelize.transaction(function (t) {
      var promises = []
      for (move of moveArray) {
        var newPromise = db.Replay.create({
          pieceName: move.pieceName,
          capName: move.capName,
          to: move.to,
          from: move.from,
          replay: 'a '
        }, { transaction: t })
        promises.push(newPromise)
      };
      return Promise.all(promises).then(function (data) {
        console.log('logged')
      })
    })
  })

  /*
>>>>>>> add6ca53f550431470ef8207a891f75393f32b74
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
    chatUsers[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: chatUsers[socket.id] })
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', chatUsers[socket.id])
    console.log(`User ${chatUsers[socket.id]} left the chat`)
    delete chatUsers[socket.id]
  })
})

/**************************************************************
 * Login to the db and then start the web server application  *
 **************************************************************
*/
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORTSEQ, () => {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORTSEQ, PORTSEQ)
  })
})
