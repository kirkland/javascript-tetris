var ROWS = 20;
var COLUMNS = 10;
var STATE_COLORS = ['empty', 'red', 'blue', 'green', 'orange', 'purple', 'pink', 'brown']

function initialize_board() {
  var rows = [];
  var i, cells;

  for (i = 0; i < ROWS; i++) {
    cells = []

    var j;
    for (j = 1; j <= COLUMNS; j++) {
      cells.push(0);
    }

    rows.push(cells);
  }

  return rows;
}

function render_board(board) {
  var table = $('<table></table>');

  var i, row;
  for (i = 0; i < ROWS; i++) {
    row = $('<tr></tr>');

    var j, cell, cell_class, state;
    for (j = 0; j < COLUMNS; j++) {
      cell_class = STATE_COLORS[board[i][j]];
      cell = $('<td class="' + cell_class + '"></td>');
      row.append(cell);
    }

    table.prepend(row);
  }

  $('table').detach();
  $('body').append(table);
}

function piece_coordinates(piece) {
  var coordinates = [];
  coordinates.push([piece.row, piece.column]);

  for (i = 0; i < piece.offsets.length; i++) {
    coordinates.push([piece.row + piece.offsets[i][0], piece.column + piece.offsets[i][1]]);
  }

  return coordinates;
}

function is_valid_piece(board, piece) {
  var i;
  var coordinates = piece_coordinates(piece);

  for (i = 0; i < coordinates.length; i++) {
    if ( coordinates[i][0] >= ROWS ||
         coordinates[i][1] >= COLUMNS ||
         coordinates[i][0] < 0 ||
         coordinates[i][1] < 0 ) {
      return false;
    }
  }

  return true;
}

function color_piece(board, piece, color) {
  var i;
  var coordinates = piece_coordinates(piece);

  for (i = 0; i < coordinates.length; i++) {
    board[coordinates[i][0]][coordinates[i][1]] = color;
  }
}

function move_piece(board, piece, direction) {
  color_piece(board, piece, 0);

  if ( direction === 'left' ) {
    piece.column = piece.column - 1;
    if ( !is_valid_piece(board, piece) ) {
      piece.column = piece.column + 1;
      return false;
    }
  } else if ( direction === 'right' ) {
    piece.column = piece.column + 1;
    if ( !is_valid_piece(board, piece) ) {
      piece.column = piece.column - 1;
      return false;
    }
  } else if ( direction == 'down' ) {
    piece.row = piece.row - 1;
    if ( !is_valid_piece(board, piece) ) {
      piece.row = piece.row + 1;
      return false;
    }
  }

  color_piece(board, piece, piece.color);

  render_board(board);
  return true
}

function add_random_piece(board) {
  var choice = Math.floor((Math.random() * 7)) % 7;

  var piece = {};
  piece.row = ROWS - 1;
  piece.column = Math.floor(COLUMNS / 2);
  piece.color = choice + 1;

  if ( choice === 0 ) {
    piece.offsets = [ [0,1], [-1,0], [-1,1] ]
  } else if ( choice === 1 ) {
    piece.offsets = [ [-1,0], [-2,0], [-2,1] ]
  } else if ( choice === 2 ) {
    piece.offsets = [ [-1,0], [-2,0], [-2,-1] ]
  } else if ( choice === 3 ) {
    piece.offsets = [ [-1,0], [-1,-1], [-1,1] ]
  } else if ( choice === 4 ) {
    piece.offsets = [ [-1,0], [-2,0], [-3,0] ]
  } else if ( choice === 5 ) {
    piece.offsets = [ [0,1], [-1,1], [-1,2] ]
  } else if ( choice === 6 ) {
    piece.offsets = [ [-1,-1], [-1,0], [0,1] ]
  }

  color_piece(board, piece, piece.color);
  render_board(board);
  return piece;
}

var board = initialize_board();

$(function() {
  render_board(board);
});
