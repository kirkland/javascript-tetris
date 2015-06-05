var ROWS = 20;
var COLUMNS = 10;
var STATE_COLORS = ['empty', 'red', 'blue', 'green', 'orange', 'purple', 'pink', 'brown']

var Cell = function(state) {
  this.state = state;
}

Cell.prototype.set_state = function(new_state) {
  this.state = new_state;
}

var Piece = function(row, column, color, offsets) {
  this.row = row;
  this.column = column;
  this.color = color;
  this.offsets = offsets;
}

function initialize_board() {
  var rows = [];

  var cells;
  var i;
  for (i = 0; i < ROWS; i++) {
    cells = []

    var j;
    for (j = 1; j <= COLUMNS; j++) {
      cells.push(new Cell(0));
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
      cell_class = STATE_COLORS[board[i][j].state];
      cell = $('<td class="' + cell_class + '"></td>');
      row.append(cell);
    }

    table.prepend(row);
  }

  $('table').detach(); // Remove old board before drawing new one
  $('body').append(table);
}

function add_piece_to_board(board, piece) {
  board[piece.row][piece.column] = new Cell(piece.color);

  var i;
  for (i = 0; i < piece.offsets.length; i++) {
    board[piece.row + piece.offsets[i][0]][piece.column + piece.offsets[i][1]] = new Cell(piece.color);
  }
}

function add_random_piece(board) {
  var choice = Math.floor((Math.random() * 7)) % 7;
  var starting_row = ROWS - 1;
  var starting_column = Math.floor(COLUMNS / 2);
  var piece;

  if ( choice === 0 ) {
    piece = new Piece(starting_row, starting_column, 1, [ [0,1], [-1,0], [-1,1] ]);
  } else if ( choice === 1 ) {
    piece = new Piece(starting_row, starting_column, 2, [ [-1,0], [-2,0], [-2,1] ]);
  } else if ( choice === 2 ) {
    piece = new Piece(starting_row, starting_column, 3, [ [-1,0], [-2,0], [-2,-1] ]);
  } else if ( choice === 3 ) {
    piece = new Piece(starting_row, starting_column, 4, [ [-1,0], [-1,-1], [-1,1] ]);
  } else if ( choice === 4 ) {
    piece = new Piece(starting_row, starting_column, 5, [ [-1,0], [-2,0], [-3,0] ]);
  } else if ( choice === 5 ) {
    piece = new Piece(starting_row, starting_column, 6, [ [0,1], [-1,1], [-1,2]]);
  } else if ( choice === 6 ) {
    piece = new Piece(starting_row, starting_column, 7, [ [-1,-1], [-1,0], [0,1] ]);
  }

  add_piece_to_board(board, piece);
  render_board(board);
}

var board = initialize_board();

$(function() {
  render_board(board);
});
