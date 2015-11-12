Template.game.helpers({
  color: function(moves){
    console.log('color: ', moves.length%2);
    return (moves.length%2===0) ? 'black' : 'white'
  }
})
