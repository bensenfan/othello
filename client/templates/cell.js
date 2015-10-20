Template.cell.helpers({
  isBlack: function(){
    return this == 1;
  },
  isWhite: function(){
    return this == -1;
  },
  isEmpty: function(){
    return this == 0;
  }
})

Template.cell.events({
    'click .box': function (event, template) {
      var $this = $(event.target).hasClass('box') ? $(event.target) : $(event.target).parent();
      var $that = $this;//$that is a ref for $(this) to use in all scope
      
      if (this == 0){
        //only make move if cell is empty
        var $boardId = $('#board').data('boardId');
        var row = $this.parent().data('row');
        var col = $this.index();
        console.log('row:', row, 'col: ', col);

        Meteor.call('makeMove', $boardId, row, col);
      }
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