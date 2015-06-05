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

function create_square(row, column) {
  return new Piece(row, column, 1, [ [0,1], [-1,0], [-1,1] ]);
}

function create_l(row, column) {
  return new Piece(row, column, 2, [ [-1,0], [-2,0], [-2,1] ]);
}

function create_backwards_l(row, column) {
  return new Piece(row, column, 3, [ [-1,0], [-2,0], [-2,-1] ]);
}

function create_pyramid(row, column) {
  return new Piece(row, column, 4, [ [-1,0], [-1,-1], [-1,1] ]);
}

function create_line(row, column) {
  return new Piece(row, column, 5, [ [-1,0], [-2,0], [-3,0] ]);
}

function create_jagged(row, column) {
  return new Piece(row, column, 6, [ [0,1], [-1,1], [-1,2]]);
}

function create_backwards_jagged(row, column) {
  return new Piece(row, column, 7, [ [-1,-1], [-1,0], [0,1] ]);
}



var board = initialize_board();

$(function() {
  render_board(board);
});
