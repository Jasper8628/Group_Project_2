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

const PORTSOCKET = process.env.PORTSOCKET || 4000 // This is for socket.io server
const PORTSEQ = process.env.PORTSEQ || 8080 // This is for the html server

// >>>>> Middleware >>>>>
app.use(express.static('public')) // Serve static content
app.use(express.urlencoded({ extended: true })) // Take care of encodings and json
app.use(express.json())
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })) // Track the logged in user
app.use(passport.initialize())
app.use(passport.session())

// Set Handlebars Template Language
var exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Requiring our routes
require('./routes/html-routes.js')(app)
require('./routes/api-routes.js')(app)

// >>>>> Chat and chess socket events >>>>>
const ioserver = app.listen(PORTSOCKET, () => console.log('listening for socket.io messages on port 4000'))
const io = socket(ioserver)
const chatUsers = {}
const fenArray = []

io.on('connection', socket => {
  console.log(`Connection made by socketid: [${socket.id}]`)

  socket.on('fen', data => {
    const fen = data.message
    io.sockets.emit('fen', data)
    console.log(fen)
    fenArray.push(fen)
  })

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
db.sequelize.sync().then(() => {
  app.listen(PORTSEQ, () => {
    console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORTSEQ, PORTSEQ)
  })
})
