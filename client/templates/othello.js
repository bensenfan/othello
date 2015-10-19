/*if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  
}*/

Meteor.startup(function(){
  /*Meteor.call('getBoard', function(err, board){
    console.log('callback in getBoard, board', board);
    if(err){
      //couldn't find a board
      throw err;
    } else {
      if (board){
        //found a board
        console.log('found a board, draw', board.board);
        drawBoard(board.board, board.size);//board is an full Mongo document, board.board is the actuall array
      } else {
        //no board, make new board
        Meteor.call('createBoard', function(err, newBoard){
          if (err){
            console.log('error creating board');
          } else {
            console.log('made new board: ', newBoard.board);
            drawBoard(newBoard.board, newBoard.size);
          }
        })
      }
    }
  })*/
})

/*
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}*/
