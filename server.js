const express = require('express')
const socket = require('socket.io')
const fenArray = []

const PORT = process.env.PORT || 4000
const app = express()
const server = app.listen(PORT, function () {
  console.log('listening on 4000')
})

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'))

// Parse application body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Set Handlebars.
var exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Import routes and give the server access to them.
// let routes = require("./routes/user.js");
// let routes = require("./routes/gamehistory.js");
// let routes = require("./routes/chathistory.js");

// app.use(routes);
// app.use(anyotherroutes);

var io = socket(server)
io.on('connection', function (socket) {
  console.log('connection made' + socket.id)
  socket.on('fen', function (data) {
    const fen = data.message
    io.sockets.emit('fen', data)
    console.log(fen)
    fenArray.push(fen)
  })
})
