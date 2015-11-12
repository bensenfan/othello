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
    }
  });