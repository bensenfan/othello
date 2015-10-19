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
  return board;
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
	}
})

/*if (Meteor.isServer && Boards.find().count() === 0) {
  Meteor.startup(function() {
    Boards.insert(startBoard);
  });
}*/