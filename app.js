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

function add_piece_to_board(board, piece) {
  // Clear out current piece
  if (board.current_piece) {
    var i;
    var piece = board.current_piece;

    board[piece.row][piece.column] = 0;
    for (i = 0; i < piece.offsets.length; i++) {
      board[piece.row + piece.offsets[i][0]][piece.column + piece.offsets[i][1]] = 0;
    }
  }

  board.current_piece = piece;

  var i;
  var piece = board.current_piece;

  board[piece.row][piece.column] = piece.color;
  for (i = 0; i < piece.offsets.length; i++) {
    board[piece.row + piece.offsets[i][0]][piece.column + piece.offsets[i][1]] = piece.color;
  }
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

  add_piece_to_board(board, piece);
  render_board(board);
}

function move_piece(board, direction) {
  if ( direction === 'left' ) {
    board.current_piece.column = board.current_piece.column - 1;
  } else if ( direction === 'right' ) {
    board.current_piece.column = board.current_piece.column + 1;
  } else if ( direction == 'down' ) {
    board.current_piece.row = board.current_piece.row - 1;
  }

  add_piece_to_board(board, board.current_piece);
}

var board = initialize_board();

$(function() {
  render_board(board);
});
