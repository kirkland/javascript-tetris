var ROWS = 20;
var COLUMNS = 10;
var STATE_COLORS = ['empty', 'red', 'blue', 'green', 'orange', 'purple', 'pink', 'brown']
var CLOCK_RATE = 1000;

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

  var offsets = piece.rotation_states[piece.rotation_state_index];

  for (i = 0; i < offsets.length; i++) {
    coordinates.push([piece.row + offsets[i][0], piece.column + offsets[i][1]]);
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

    if ( board[coordinates[i][0]][coordinates[i][1]] != 0 ) {
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
      color_piece(board, piece, piece.color);
      return false;
    }
  } else if ( direction === 'right' ) {
    piece.column = piece.column + 1;
    if ( !is_valid_piece(board, piece) ) {
      piece.column = piece.column - 1;
      color_piece(board, piece, piece.color);
      return false;
    }
  } else if ( direction == 'down' ) {
    piece.row = piece.row - 1;
    if ( !is_valid_piece(board, piece) ) {
      piece.row = piece.row + 1;
      color_piece(board, piece, piece.color);
      return false;
    }
  }

  color_piece(board, piece, piece.color);
  render_board(board);
  return true
}

function add_random_piece(board) {
  var choice = Math.floor((Math.random() * 7)) % 7;
  var piece;

  if ( choice === 0 ) {
    piece = create_square();
  } else if ( choice === 1 ) {
    piece = create_l();
  } else if ( choice === 2 ) {
    piece = create_backwards_l();
  } else if ( choice === 3 ) {
    piece = create_pyramid();
  } else if ( choice === 4 ) {
    piece = create_line();
  } else if ( choice === 5 ) {
    piece = create_backwards_s_piece();
  } else if ( choice === 6 ) {
    piece = create_s_piece();
  }

  piece.row = ROWS - 1;
  piece.column = Math.floor(COLUMNS / 2);

  if ( is_valid_piece(board, piece) ) {
    color_piece(board, piece, piece.color);
    render_board(board);
    return piece;
  } else {
    return false;
  }
}

function create_s_piece() {
  var piece = {};
  piece.color = 1;

  piece.rotation_states = [
    [[ 0, 1], [-1, 0], [-1, -1]],
    [[ 1, 0], [0, 1], [-1, 1]]
  ]

  piece.rotation_state_index = 0;

  return piece;
}

function create_backwards_s_piece() {
  var piece = {};
  piece.color = 2;

  piece.rotation_states = [
    [[ 0, -1], [-1,  0], [-1,  1]],
    [[ 1,  0], [ 0, -1], [-1, -1]]
  ]

  piece.rotation_state_index = 0;

  return piece;
}

function create_square() {
  var piece = {};
  piece.color = 3;

  piece.rotation_states = [
    [[0,1], [-1,0], [-1,1]]
  ]

  piece.rotation_state_index = 0;

  return piece;
}

function create_l() {
  var piece = {};
  piece.color = 4;

  piece.rotation_states = [
    [[1,  0], [-1,  0], [-1, 1]],
    [[0, -1], [ 0,  1], [ 1, 1]],
    [[1, -1], [ 1,  0], [-1, 0]],
    [[0, -1], [-1, -1], [0, 1]]
  ]

  piece.rotation_state_index = 3;

  return piece;
}

function create_backwards_l() {
  var piece = {};
  piece.color = 5;

  piece.rotation_states = [
    [[1,  0], [-1,  0], [-1, -1]],
    [[0, -1], [ 0,  1], [-1,  1]],
    [[1,  0], [ 1,  1], [-1,  0]],
    [[1, -1], [ 0, -1], [ 0,  1]]
  ]

  piece.rotation_state_index = 1;

  return piece;
}

function create_pyramid() {
  var piece = {};
  piece.color = 6;

  piece.rotation_states = [
    [[ 0, -1], [ 0,  1], [ -1, 0]],
    [[ 1,  0], [ 0,  1], [ -1, 0]],
    [[ 0, -1], [ 1,  0], [  0, 1]],
    [[ 1,  0], [ 0, -1], [ -1, 0]]
  ]

  piece.rotation_state_index = 0;

  return piece;
}

function create_line() {
  var piece = {};
  piece.color = 7;

  piece.rotation_states = [
    [[-1, 0],[1,0],[2,0]],
    [[0,-1],[0,1],[0,2]]
  ]

  piece.rotation_state_index = 1;

  return piece;
}

function rotate_piece(piece, left) {
  if ( left ) {
    if ( piece.rotation_state_index === piece.rotation_states.length - 1) {
      piece.rotation_state_index = 0;
    } else {
      piece.rotation_state_index = piece.rotation_state_index + 1;
    }
  } else {
    if ( piece.rotation_state_index === 0) {
      piece.rotation_state_index = piece.rotation_states.length - 1;
    } else {
      piece.rotation_state_index = piece.rotation_state_index - 1;
    }
  }
}

function rotate_piece_on_board(board, piece, left) {
  color_piece(board, piece, 0);
  rotate_piece(piece, left);

  if ( !is_valid_piece(board, piece) ) {
    rotate_piece(piece, !left);
    return false;
  }

  color_piece(board, piece, piece.color);
  render_board(board);
  return true
}

function clock_tick(game) {
  if ( game.current_piece ) {
    if ( !move_piece(game.board, game.current_piece, 'down') ) {
      game.current_piece = null;
    }
  } else {
    game.current_piece = add_random_piece(game.board);

    if ( game.current_piece === false ) {
      console.log('Game Over');
      stop_clock(game);
    }
  }

  render_board(game.board);
  return game.current_piece;
}

function stop_clock(game) {
  clearInterval(game.interval_id);
}

function start_clock(game) {
  game.interval_id = setInterval(function() {
    game.current_piece = clock_tick(game);
  }, CLOCK_RATE);
}

function reset_clock(game) {
  stop_clock(game);
  start_clock(game);
}

function start_game() {
  var game = {};
  game.board = initialize_board();

  render_board(game.board);

  $('body').keydown(function(e) {
    if ( e.keyCode === 37 ) { // left arrow
      move_piece(game.board, game.current_piece, 'left');
    } else if ( e.keyCode === 39 ) { // right arrow
      move_piece(game.board, game.current_piece, 'right');
    } else if ( e.keyCode === 40 ) {
      move_piece(game.board, game.current_piece, 'down');
      reset_clock(game);
    } else if ( e.keyCode === 65 || e.keyCode === 38 ) { // 65 = letter a, 38 = up arrow
      rotate_piece_on_board(game.board, game.current_piece, true);
    } else if ( e.keyCode === 83 ) { // letter s
      rotate_piece_on_board(game.board, game.current_piece, false);
    }
  });

  start_clock(game);
}

$(function() {
  start_game();
});
