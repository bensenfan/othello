Boards = new Mongo.Collection("boards");

/*
Constructor for a board
1 = black
-1 = white
0 = empty
Default board: 8x8
[
    [0,0,0,0,0,0,0,0,]
    [0,0,0,0,0,0,0,0,]
    [0,0,0,0,0,0,0,0,]
    [0,0,0,1,-1,0,0,0,]
    [0,0,0,-1,1,0,0,0,]
    [0,0,0,0,0,0,0,0,]
    [0,0,0,0,0,0,0,0,]
    [0,0,0,0,0,0,0,0,]
]
*/

function makeBoard(size){
    size = size || 8;
    var board = [];
    for(row=0; row<size; row++){
        board[row]=[]
        for(col=0; col<size; col++){
          if (row===(size/2-1) && col===(size/2-1)){
            board[row][col]= 1;  
          } else if (row===(size/2-1) && col===(size/2)){
            board[row][col]= -1;  
          } else if (row===(size/2) && col===(size/2-1)){
            board[row][col]= -1;  
          } else if (row===(size/2) && col===(size/2)){
            board[row][col]= 1;  
          } else {
            board[row][col]= 0;  
          }
        }
    }
    console.log('inside makeBoard', board);
    return board;
}

/*
    Next level walking from a smarter person
    http://www.onlinespiele-sammlung.de/othello/othello-reversi-games/posi-net/othello.js
    
    board: 2x2 array of cells
    row/col: Number
    color: 1 = black, -1 = white

    returns post-flip board, or false if no changes
*/
function walk(board, row, col, color){
    //console.log('inside walk()', board, row, col, color);
    var deltax, deltay, distance;
    var posx, posy;
    var count = 0;
    var size = board[0].length

    var x = row;
    var y = col;

    for(deltay = -1; deltay <= 1; deltay++) {
        for(deltax = -1; deltax <= 1; deltax++) {
          for(distance = 1;; distance++) {
            posx = x + (distance * deltax);
            posy = y + (distance * deltay);
            // stop if we go off the board
            if(posx < 0 || posx >= size || posy < 0 || posy >= size) {
                break;
            }
            // stop when we reach an empty square
            if(board[posx][posy] === 0){
                break;
            }
            // only update the flip count when we reach another of the
            // player's pieces
            if(board[posx][posy] === color) {
                /*
                //tally the total number of pieces flipped
                count += distance - 1;
                break;*/
                count += distance - 1;//update count
                // backtrack, flipping pieces
                for(distance--; distance > 0; distance--) {
                  posx = x + (distance * deltax);
                  posy = y + (distance * deltay);
                  board[posx][posy] = color;
                }
                break;
            }
          }
        }
    }
    if (count===0){
        //no piece was flipped
        return false;
    } else {
        board[row][col] = color;
        //console.log('post-flip board: ', board);
        //console.log('flipped pieces: ', count);
        return {
            board: board
        };
    }
    
}

Meteor.methods({
	createBoard : function(player1_id, player2_id, size){
    	// Make sure the user is logged in before inserting a task
        /*if (! Meteor.userId()) {
          throw new Meteor.Error("not-authorized");
        }*/
        var size = size ? size : 8;
        var player1_id = player1_id ? player1_id : 'Player 1';
        var player2_id = player2_id ? player2_id : 'Player 2';

        var newBoard_id = Boards.insert({
        	players: [player1_id, player2_id],
        	status: 'new', // 'new', 'in_progress', 'complete'
        	size: size, //default 8, could also be 6 (small) or 10 (large)
        	created_at: new Date(),
            board: makeBoard(size),
            moves: []
        });

        return Boards.findOne(newBoard_id);
	},
	
    getBoard: function(boardId){
        //return Boards.findOne(boardId);
        return Boards.findOne();
    },

	deleteBoard: function(boardId){
		throw new Meteor.Error('function not yet implemented');
	},

	setBoard: function(boardId, move){
		var board = Boards.findOne(boardId);
		// sset up board
		Boards.update(boardId, {$set: {board: board}});
	}, 
    makeMove: function(boardId, row, col){
        console.log('makeMove called: ', row, col);
        /*
            1. retrieve board
            2. walk the board, params: board, row/col, color
        */
        var board = Boards.findOne({_id: boardId});

        //if moves.length % 2 === 0, black is about to go
        var color = (board.moves.length%2===0) ? 1 : -1
        var validMove = walk(board.board, row, col, color)

        if (validMove !== false){
            board.moves.push({row: row, col: col})//save valid move
            //if a valid move, we pass back the new board and moves array
            Boards.update(
                boardId, 
                {$set: 
                    {
                        board: validMove.board, 
                        moves: board.moves
                    }
                });
            //return Board.findOne(boardId);//return updated board
        } else {
            throw new Meteor.Error('Not a valid move');
        }
    }
})

/*if (Meteor.isServer && Boards.find().count() === 0) {
  Meteor.startup(function() {
    Boards.insert(startBoard);
  });
}*/