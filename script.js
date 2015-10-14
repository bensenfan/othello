console.log('js is working');

var size = 8;
var board=[];
var counter = 0;

function initBoard(){
  for(row=0; row<size; row++){
    board[row]=[]
    for(col=0; col<size; col++){
      if (row===(size/2-1) && col===(size/2-1)){
        board[row][col]= 'black';  
      } else if (row===(size/2-1) && col===(size/2)){
        board[row][col]= 'white';  
      } else if (row===(size/2) && col===(size/2-1)){
        board[row][col]= 'white';  
      } else if (row===(size/2) && col===(size/2)){
        board[row][col]= 'black';  
      } else {
        board[row][col]= null;  
      }
    }
  }
}

function drawBoard(){
  for(row=0; row<size; row++){
    for(col=0; col<size; col++){
      var color = board[row][col] ? board[row][col] : '';
      var fa = color ? 'fa-circle' : '';

      $('#container #board').append('<div class="box '+ color +'" id="'+row+'-'+col+'"><i class="fa '+fa+' fa-3x"></i></div>')
    }
    $('#container #board').append('<br>');
  }
}

initBoard();
drawBoard();

var $boxes = $('.box');

function isEmpty($target){
  return !($target.hasClass('white') || $target.hasClass('black'));
}

function walk($start, cb){
  //placing piece
  if (counter%2===0){
    //black goes first
    $start.addClass('black');
  } else {
    //white goes second
    $start.addClass('white');
  }

  // determine color
  var color = $start.hasClass('white') ? 'white' : 'black';
  var directions = ['up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right']; 
  //var directions = ['up', 'down', 'left', 'right']; 
  
  //validMoves is an array of 0 or 1. 
  var moveResults = directions.map(function(direction){
    return checkLine(getElements($start, direction, color), color);
  });

  //Sum the moveResults array, a valid move would be > 0
  var validMove = moveResults.reduce(function(pv, cv){
    return pv+cv;
  })

  if (validMove) {
    cb();
  } else {
    cb({
      message: 'No changes could happen, illege move'
    });
  }
}

function nextRound(){
  counter++;
  var color = (counter%2===0) ? 'black' : 'white';
  $('.player').attr('class', 'player').addClass(color);
}

$boxes.click(function(){  
  var $that = $(this);//$that a ref for $(this) to use in all scope
  
  if (isEmpty($(this))){
    //walk the board to redraw pieces
    walk($(this), function(err){
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
  } 
});