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
    return Boards.findOne().board;
    /*return  [
              [0,0,0,0,0,0,0,0,],
              [0,0,0,0,0,0,0,0,],
              [0,0,0,0,0,0,0,0,],
              [0,0,0,1,-1,0,0,0,],
              [0,0,0,-1,1,0,0,0,],
              [0,0,0,0,0,0,0,0,],
              [0,0,0,0,0,0,0,0,],
              [0,0,0,0,0,0,0,0,]
            ];*/
  }
})

Template.game.events({
    'click .box': function (event, template) {
      var $this = template.$(event.target);
      var $that = $this;//$that is a ref for $(this) to use in all scope
  console.log('box:', $that.attr('id'));
      /*if (isEmpty($this)){
        //walk the board to redraw pieces
        walk($this, function(err){
          if (err){
            //there is an err in placing piece at current position
            $that.attr('class', 'box') //return box to empty
            console.log(err.message);
          } else {
            //board is redrawn, iterate anad actually draw new circle
            $that.find('i').addClass('fa-circle');
            nextRound();
          }
        }); 
      } */
    }
  });