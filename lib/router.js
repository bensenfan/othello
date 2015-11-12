var boardSubscription;

// Global subscriptions
if (Meteor.isClient) {
  boardSubscription = Meteor.subscribe('boards');
}

Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'othello', //@TODO: make a better layout template
 
  // the appNotFound template is used for unknown routes and missing lists
  //notFoundTemplate: 'appNotFound', //@TODO
});


Router.route('/game/:_id', {
	name: 'game',
  template: 'game', //@TODO: no longer use this 
	data: function(){
    //console.log('game:', Boards.findOne({_id:this.params._id}));
    var board = Boards.findOne({_id:this.params._id});
    if (board){
      board.board.forEach(function(row){
        console.log(row);
      });
    }
    
		return board;
	}, 
	action: function(){
		this.render();
	}
});

Router.route('/', {
  action: function() {
    Router.go('game', {_id:'dEdtDZK26gv7tiwJs'});
  }
})
