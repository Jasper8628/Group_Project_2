$("#SetFen").click(function () {
	var fenStr = $("#fenIn").val();
	NewGame(fenStr);
});



function NewGame(fenStr) {
	ParseFen(fenStr);
	PrintBoard();
	SetInitialBoardPieces();
	CheckAndSet();
}

function ClearAllPieces() {
	$(".Piece").remove();
	scene.remove(group3D);
}

function SetInitialBoardPieces() {

	var sq;
	var sq120;
	var file, rank;
	var rankName;
	var fileName;
	var imageString;
	var pieceFileName;
	var pce;

	ClearAllPieces();

	for (sq = 0; sq < 64; ++sq) {
		sq120 = SQ120(sq);
		pce = GameBoard.pieces[sq120];
		if (pce >= PIECES.wP && pce <= PIECES.bK) {
			AddGUIPiece(sq120, pce);
		}
	}
	//console.log(scene);
}

function DeSelectSq(sq) {
	$('.Square').each(function (index) {
		if (PieceIsOnSq(sq, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
			$(this).removeClass('SqSelected');
		}
	});
}

function SetSqSelected(sq) {
	$('.Square').each(function (index) {
		if (PieceIsOnSq(sq, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
			$(this).addClass('SqSelected');
		}
	});
}

function ClickedSquare(pageX, pageY) {
	//console.log('ClickedSquare() at ' + pageX + ',' + pageY);
	var position = $('#Board').position();
	//console.log(position);
	var workedX = Math.floor(position.left);
	var workedY = Math.floor(position.top);
	pageX = Math.floor(pageX);
	pageY = Math.floor(pageY);
	var file = Math.floor((pageX - workedX) / 60);
	var rank = 7 - Math.floor((pageY - workedY) / 60);
	var sq = FR2SQ(file, rank);
	//console.log(file, rank, sq);
	//console.log('Clicked sq:' + PrSq(sq));
	SetSqSelected(sq);
	return sq;
}
function ClickedSquare3D(x, y) {
	var file = x;
	var rank = y;
	var sq = FR2SQ(file, rank);
	//console.log(file, rank, sq);
	//console.log('Clicked sq:' + PrSq(sq));
	SetSqSelected(sq);
	return sq;
}

$(document).on('click', '.Piece', function (e) {
	//console.log('Piece Click');
	if (UserMove.from == SQUARES.NO_SQ) {
		UserMove.from = ClickedSquare(e.pageX, e.pageY);
	} else {
		UserMove.to = ClickedSquare(e.pageX, e.pageY);
	}
	MakeUserMove();
});



$(document).on('click', '.Square', function (e) {
	//console.log('Square Click');
	if (UserMove.from != SQUARES.NO_SQ) {
		UserMove.to = ClickedSquare(e.pageX, e.pageY);
		MakeUserMove();
	}

});

function MakeUserMove() {

	if (UserMove.from != SQUARES.NO_SQ && UserMove.to != SQUARES.NO_SQ) {

		//console.log("User Move:" + PrSq(UserMove.from) + PrSq(UserMove.to));

		var parsed = ParseMove(UserMove.from, UserMove.to);
		//console.log(parsed);

		if (parsed != NOMOVE) {
			MakeMove(parsed);
			PrintBoard();
			MoveGUIPiece(parsed);
			CheckAndSet();
			//socket.emit("fen", {message: newFen});
		}

		DeSelectSq(UserMove.from);
		DeSelectSq(UserMove.to);

		UserMove.from = SQUARES.NO_SQ;
		UserMove.to = SQUARES.NO_SQ;
	}

}

function PieceIsOnSq(sq, top, left) {

	if ((RanksBrd[sq] == 7 - Math.round(top / 60)) &&
		FilesBrd[sq] == Math.round(left / 60)) {
		return BOOL.TRUE;
	}

	return BOOL.FALSE;

}
function RemoveGUIPiece(sq) {
	$('.Piece').each(function (index) {
		if (PieceIsOnSq(sq, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
			$(this).remove();



		}
	});
}

let cubePos = {
	x: 0,
	y: 0
};
let pieceName = "";
let capName = "";
let selected3D = false;
let group3D = new THREE.Group();
let array = [];
for (i = 0; i < 32; i++) {
	array.push(i);
}

function AddGUIPiece(sq, pce) {
	let colors = [0, 0xDAF7A6, 0xFFC300, 0xFF5733, 0xC70039, 0x900C3F, 0x581845, 0xDAF7A6, 0xFFC300, 0xFF5733, 0xC70039, 0x900C3F, 0x581845];
	let GUIgeo = new THREE.BoxGeometry(0.8, 0.8, 1.6);

	var file = FilesBrd[sq];
	var rank = RanksBrd[sq];
	console.log(rank);
	var rankName = "rank" + (rank + 1);
	var fileName = "file" + (file + 1);
	var pieceFileName = "images/" + SideChar[PieceCol[pce]] + PceChar[pce].toUpperCase() + ".png";
	var imageString = "<image src=\"" + pieceFileName + "\" class=\"Piece " + rankName + " " + fileName + "\"/>";
	//console.log(imageString);
	$("#Board").append(imageString);


	//console.log(pce);
	let newMat = new THREE.MeshBasicMaterial({ color: colors[pce] });
	let newCube = new THREE.Mesh(GUIgeo, newMat);
	newCube.name = PceChar[pce] + array[0];
	array.shift();

	newCube.position.x = file - 4;
	newCube.position.y = rank - 4;
	newCube.position.z = 0.9;
	domEvents.addEventListener(newCube, "click", event => {
		cubePos.x = newCube.position.x;
		cubePos.y = newCube.position.y;
		console.log("cube name: ", newCube.name, newCube.id);
		console.log("current piecename: " + pieceName);

		if (selected3D == false) {
			pieceName = newCube.name;

			UserMove.from = ClickedSquare3D(cubePos.x + 4, cubePos.y + 4);
			selected3D = true;
		} else {
			UserMove.to = ClickedSquare3D(cubePos.x + 4, cubePos.y + 4);
			capName = newCube.name;
			//console.log("capName:" + capName);
			selected3D = false;
			socketCast.emit("game", {
				pieceName: pieceName,
				capName: capName,
				to: UserMove.to,
				from: UserMove.from
			});
			MakeUserMove();
		}
		//console.log("scene lenght: " + scene.children.length);

	});
	//scene.add(newCube);
	//group3D.add(newCube);
}

function MoveGUIPiece(move) {
	let isCaptured = false;

	var from = FROMSQ(move);
	var to = TOSQ(move);
	console.log(to);
	if (move & MFLAGEP) {
		var epRemove;
		if (GameBoard.side == COLOURS.BLACK) {
			epRemove = to - 10;
		} else {
			epRemove = to + 10;
		}
		RemoveGUIPiece(epRemove);

	} else if (CAPTURED(move)) {
		RemoveGUIPiece(to);
		isCaptured = true;
	}
	var file = FilesBrd[to];
	var rank = RanksBrd[to];
	var rankName = "rank" + (rank + 1);
	var fileName = "file" + (file + 1);
	$('.Piece').each(function (index) {
		if (PieceIsOnSq(from, $(this).position().top, $(this).position().left) == BOOL.TRUE) {
			$(this).removeClass();
			$(this).addClass("Piece " + rankName + " " + fileName);
		}
	});
	let newObj = scene.getObjectByName(pieceName);
	newObj.position.x = file - 4;
	newObj.position.y = rank - 4;

	if (isCaptured) {
		let killed = scene.getObjectByName(capName);
		killed.position.x = -5;
	}
	if (move & MFLAGCA) {
		let bKing = "K4";
		let wKing = "k28";
		let bRook1 = "r24";
		let bRook2 = "r31";
		let wRook1 = "R0";
		let wRook2 = "R7";
		switch (to) {
			case SQUARES.G1:
				RemoveGUIPiece(SQUARES.H1);
				scene.getObjectByName(wRook2).position.z = -500;
				AddGUIPiece(SQUARES.F1, PIECES.wR);
				break;
			case SQUARES.C1:
				RemoveGUIPiece(SQUARES.A1);
				scene.getObjectByName(wRook1).position.z = -500;
				AddGUIPiece(SQUARES.D1, PIECES.wR);
				break;
			case SQUARES.G8:
				RemoveGUIPiece(SQUARES.H8);
				scene.getObjectByName(bRook2).position.z = -500;
				AddGUIPiece(SQUARES.F8, PIECES.bR);
				break;
			case SQUARES.C8:
				RemoveGUIPiece(SQUARES.A8);
				scene.getObjectByName(bRook1).position.z = -500;
				AddGUIPiece(SQUARES.D8, PIECES.bR);
				break;
		}
	} else if (PROMOTED(move)) {
		RemoveGUIPiece(to);
		let promotePawn = scene.getObjectByName(pieceName);
		promotePawn.position.x = -5;
		AddGUIPiece(to, PROMOTED(move));
	}

}

function DrawMaterial() {

	if (GameBoard.pceNum[PIECES.wP] != 0 || GameBoard.pceNum[PIECES.bP] != 0) return BOOL.FALSE;
	if (GameBoard.pceNum[PIECES.wQ] != 0 || GameBoard.pceNum[PIECES.bQ] != 0 ||
		GameBoard.pceNum[PIECES.wR] != 0 || GameBoard.pceNum[PIECES.bR] != 0) return BOOL.FALSE;
	if (GameBoard.pceNum[PIECES.wB] > 1 || GameBoard.pceNum[PIECES.bB] > 1) { return BOOL.FALSE; }
	if (GameBoard.pceNum[PIECES.wN] > 1 || GameBoard.pceNum[PIECES.bN] > 1) { return BOOL.FALSE; }

	if (GameBoard.pceNum[PIECES.wN] != 0 && GameBoard.pceNum[PIECES.wB] != 0) { return BOOL.FALSE; }
	if (GameBoard.pceNum[PIECES.bN] != 0 && GameBoard.pceNum[PIECES.bB] != 0) { return BOOL.FALSE; }

	return BOOL.TRUE;
}

function ThreeFoldRep() {
	var i = 0, r = 0;

	for (i = 0; i < GameBoard.hisPly; ++i) {
		if (GameBoard.history[i].posKey == GameBoard.posKey) {
			r++;
		}
	}
	return r;
}

function CheckResult() {
	if (GameBoard.fiftyMove >= 100) {
		$("#GameStatus").text("GAME DRAWN {fifty move rule}");
		return BOOL.TRUE;
	}

	if (ThreeFoldRep() >= 2) {
		$("#GameStatus").text("GAME DRAWN {3-fold repetition}");
		return BOOL.TRUE;
	}

	if (DrawMaterial() == BOOL.TRUE) {
		$("#GameStatus").text("GAME DRAWN {insufficient material to mate}");
		return BOOL.TRUE;
	}

	GenerateMoves();

	var MoveNum = 0;
	var found = 0;

	for (MoveNum = GameBoard.moveListStart[GameBoard.ply]; MoveNum < GameBoard.moveListStart[GameBoard.ply + 1]; ++MoveNum) {

		if (MakeMove(GameBoard.moveList[MoveNum]) == BOOL.FALSE) {
			continue;
		}
		found++;
		TakeMove();
		break;
	}

	if (found != 0) return BOOL.FALSE;

	var InCheck = SqAttacked(GameBoard.pList[PCEINDEX(Kings[GameBoard.side], 0)], GameBoard.side ^ 1);

	if (InCheck == BOOL.TRUE) {
		if (GameBoard.side == COLOURS.WHITE) {
			$("#GameStatus").text("GAME OVER {black mates}");
			return BOOL.TRUE;
		} else {
			$("#GameStatus").text("GAME OVER {white mates}");
			return BOOL.TRUE;
		}
	} else {
		$("#GameStatus").text("GAME DRAWN {stalemate}"); return BOOL.TRUE;
	}

	return BOOL.FALSE;
}

function CheckAndSet() {
	if (CheckResult() == BOOL.TRUE) {
		GameController.GameOver = BOOL.TRUE;
	} else {
		GameController.GameOver = BOOL.FALSE;
		$("#GameStatus").text('');
	}
}

















































