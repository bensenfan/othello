Template.game.helpers({
  board: function(){
    /*Meteor.call('getBoard', function(err, currentBoard){
      if(err){
        //couldn't find a board
        throw err;
      } else {
        if (currentBoard){
          //found a currentBoard
          console.log('found a currentBoard, draw', currentBoard.board);
          return currentBoard.board;//board is an full Mongo document, board.board is the actuall array
        } else {
          //no board, make new board
          Meteor.call('createBoard', function(err, newBoard){
            if (err){
              throw err
            } else {
              console.log('made new board: ', newBoard.board);
              return newBoard.board;
            }
          })
        }
      }
    })*/
    var board = Boards.findOne();
    console.log('found board: ', board);
    return board;
  }
})
