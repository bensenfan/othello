//Check if a square is empty
function isEmpty($target){
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

/*
Next level walking from a smarter person
http://www.onlinespiele-sammlung.de/othello/othello-reversi-games/posi-net/othello.js
*/
/*
function NumFlips(x, y, player) {
    var deltax, deltay, distance;
    var posx, posy;
    var count = 0;

  for(deltay = -1; deltay <= 1; deltay++) {
    for(deltax = -1; deltax <= 1; deltax++) {
      for(distance = 1;; distance++) {
        posx = x + (distance * deltax);
        posy = y + (distance * deltay);
        // stop if we go off the board
        if(posx < 0 || posx >= width || posy < 0 || posy >= height)
            break;
        // stop when we reach an empty square
        if(board[posx][posy].player == EMPTY)
            break;
        // only update the flip count when we reach another of the
        // player's pieces
        if(board[posx][posy].player == player) {
            count += distance - 1;
            break;
        }
      }
    }
  }
  return(count);
}
*/