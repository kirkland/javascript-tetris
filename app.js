var ROWS = 20;
var COLUMNS = 10;

function initialize_board() {
  var rows = [];

  var cells;
  var i;
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

      state = board[i][j];
      if (state == 0) {
        cell_class = 'empty';
      } else if (state == 1) {
        cell_class = 'red';
      }

      cell = $('<td class="' + cell_class + '"></td>');
      row.append(cell);
    }

    table.prepend(row);
  }

  $('table').detach(); // Remove old board before drawing new one
  $('body').append(table);
}

var board = initialize_board();

$(function() {
  render_board(board);
});
