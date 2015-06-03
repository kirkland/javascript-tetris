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

function create_board(board) {
  var table = $('<table></table>');

  var i, row;
  for (i = 0; i < ROWS; i++) {
    row = $('<tr></tr>');

    var j, cell;
    for (j = 1; j <= COLUMNS; j++) {
      cell = $('<td></td>');
      row.append(cell);
    }

    table.append(row);
  }

  $('body').append(table);
}

$(function() {
  var board = initialize_board();
  create_board(board);
});
