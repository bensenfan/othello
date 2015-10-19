drawBoard = function(board, size){
  console.log('board', board);
  for(row=0; row<size; row++){
    for(col=0; col<size; col++){
      var color = '';
      if (board[row][col] < 0){
        color = 'black';
      } else if (board[row][col] > 0){
        color = 'white';
      }

      var fa = !(board[row][col]===0) ? 'fa-circle' : '';

      $('#container #board').append('<div class="box '+ color +'" id="'+row+'-'+col+'"><i class="fa '+fa+' fa-3x"></i></div>')
    }
    $('#container #board').append('<br>');
  }
}

//Check if a square is empty
isEmpty = function($target){
  return !($target.hasClass('white') || $target.hasClass('black'));
}

/*
  Starting from $start
    * Go in the direction indicated
    * Grab every element that has a color
    * Stop when encountering first blank space OR edge of board

*/
function getElements($start, direction){
  var color = $start.hasClass('white') ? 'white' : 'black';
  var row = parseInt($start.attr('id').split('-')[0]); //row number
  var col = parseInt($start.attr('id').split('-')[1]); //column number
  var elements = [];
  //Each direction involves a different while loop
  switch (direction){
    case 'up': //column stays same, row decreases 
      row--;
      while (row>=0 && !(isEmpty($('#'+row+'-'+col)))){
        elements.push($('#'+row+'-'+col));
        if ($('#'+row+'-'+col).hasClass(color)){
          break;
        }
        row--; //this goes up on the board
      }
      break;
    case 'down'://column stays, row increase
      row++;
      while (row<size && !(isEmpty($('#'+row+'-'+col)))){
        elements.push($('#'+row+'-'+col));
        if ($('#'+row+'-'+col).hasClass(color)){
          break;
        }
        row++; //this goes down on the board
      }
      break;
    case 'left'://row stay, column decrease
      col--;
      while (col>=0 && !(isEmpty($('#'+row+'-'+col)))){
        elements.push($('#'+row+'-'+col));
        if ($('#'+row+'-'+col).hasClass(color)){
          break;
        }
        col--; //this goes up on the board
      }
      break;
    case 'right'://row stay, column increase
      col++;
      while (col<size && !(isEmpty($('#'+row+'-'+col)))){
        elements.push($('#'+row+'-'+col));
        if ($('#'+row+'-'+col).hasClass(color)){
          break;
        }
        col++; //this goes up on the board
      }
      break;
    case 'up-left'://row decrease, column decrease
      row--; 
      col--;
      while (col>=0 && row>=0 && !(isEmpty($('#'+row+'-'+col)))){
        elements.push($('#'+row+'-'+col));
        if ($('#'+row+'-'+col).hasClass(color)){
          break;
        }
        row--;
        col--; //move up, then left
      }
      break;
    case 'up-right'://row decrease, column increase
      row--; 
      col++;
      while (col<size && row>=0 && !(isEmpty($('#'+row+'-'+col)))){
        elements.push($('#'+row+'-'+col));
        if ($('#'+row+'-'+col).hasClass(color)){
          break;
        }
        row--;
        col++; //move up, then right
      }
      break;
    case 'down-left'://row increase, column decrease
      row++; 
      col--;
      while (col>=0 && row<size && !(isEmpty($('#'+row+'-'+col)))){
        elements.push($('#'+row+'-'+col));
        if ($('#'+row+'-'+col).hasClass(color)){
          break;
        }
        row++;
        col--; //move down, then left
      }
      break;
    case 'down-right':
      row++; 
      col++;
      while (col<size && row<size && !(isEmpty($('#'+row+'-'+col)))){
        elements.push($('#'+row+'-'+col));
        if ($('#'+row+'-'+col).hasClass(color)){
          break;
        }
        row++;
        col++; //move down, then right
      }
      break;
    default: 
      break;
  }
  return elements;
}

/* Given an line of pieces, check if the move is a valid one, 
   Criterion for validity:
      * line of pieces has more than two element
      * last and first element must be same color
      * every other element must be opposite color
   If valid move
      * Change all elements to color
      * return 1
   If not valid
      * return 0
*/
function checkLine(elements, color){  
  if (elements.length <2 ){
    //either piece is the only one in the line or the next square has the same color
    return 0
  } else if (elements[elements.length-1].hasClass(color)){
    // last element must have same color as var color
    // return 1 if yes, 0 if no
    elements.forEach(function($el){
      $el.attr('class', 'box').addClass(color);
      $el.find('i').addClass('fa-circle');
    })
    //console.log('valid move');
    return 1;
  } else {
    //last element has opposite color, invalid move
    //console.log('last piece opposite color');
    return 0;
  }
}

/*function walk($start, cb){
  //temporarily mark the starting spot with color
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
  
  //validMoves is an array of 0 or 1. 
  var moveResults = directions.map(function(direction){
    return checkLine(getElements($start, direction), color);
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
}*/

function nextRound(){
  counter++;
  var color = (counter%2===0) ? 'black' : 'white';
  $('.player').attr('class', 'player').addClass(color);
}


/*
Next level walking from a smarter person
http://www.onlinespiele-sammlung.de/othello/othello-reversi-games/posi-net/othello.js
*/

walk = function($start, board, color) {
  var deltax, deltay, distance;
  var posx, posy;
  var count = 0;

  var boarArray = board.board //actual board array

  var x = $start.attr('id').split[0]; //row
  var y = $start.attr('id').split[1]; //col

  for(deltay = -1; deltay <= 1; deltay++) {
    for(deltax = -1; deltax <= 1; deltax++) {
      for(distance = 1;; distance++) {
        posx = x + (distance * deltax);
        posy = y + (distance * deltay);
        // stop if we go off the board
        if(posx < 0 || posx >= board.size || posy < 0 || posy >= board.size)
            break;
        // stop when we reach an empty square
        if(boardArray[posx][posy] === 0)
            break;
        // only update the flip count when we reach another of the
        // player's pieces
        if(boardArray[posx][posy] === color) {
            count += distance - 1;
            break;
        }
      }
    }
  }
  return(count);
}
