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

function draw_board() {
}
