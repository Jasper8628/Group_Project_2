let express = require("express");
let socket = require("socket.io");
let fenArray = [];

let PORT = process.env.PORT||4000;
let app = express();
let server = app.listen(PORT, function () {
    console.log("listening on 4000");
});
app.use(express.static("public"));
var io = socket(server);
io.on("connection", function (socket) {
    console.log("connection made"+socket.id);
    socket.on("fen", function (data) {
        let fen = data.message;
        io.sockets.emit("fen",data);
        console.log(fen);
        fenArray.push(fen);
    });
});