let express = require("express");
let socket = require("socket.io");
let fenArray = [];
let fenCode = "";

let PORT = 4000;
let PORT2 = 3000;
let app = express();
let game = app.listen(PORT, function () {
    console.log("listening on 4000");
});
let cast = app.listen(PORT2, function () {
    console.log("server2 listening on 3000");
})
app.use(express.static("public"));
var ioGame = socket(game);
var ioCast = socket(cast);
let whitePicked = false;
let moveArray = [];
let room1={
    name:"room1",
    whiteTaken:false,
    blackTaken:false

}



ioCast.on("connection", function (socket) {
    console.log("connection made" + socket.id);
    let fenStr = fenArray[fenArray.length-1];
    ioCast.sockets.emit("all", {fen:fenStr});

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