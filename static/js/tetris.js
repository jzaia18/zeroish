/**
 * Tetris.js
 * Backend javascript for a tetris board
 * By team Zeroish (Cynthia Cheng, Ishtiaque Mahdi, Adeebur Rahman, & Jake Zaia)
 * Mostly developed by Jake Zaia
 **/

// =============================== Block functions ===============================

// Different "constructors" for each shape
var create_tetromino_I = function() { return {x1:3, y1:0, x2:4, y2:0, x3:5, y3:0, x4:6, y4:0, color:'#00FFFF', shape:'I', orientation:0}; };
var create_tetromino_O = function() { return {x1:4, y1:0, x2:4, y2:1, x3:5, y3:0, x4:5, y4:1, color:'#FFFF00', shape:'O', orientation:0}; };
var create_tetromino_T = function() { return {x1:3, y1:1, x2:4, y2:1, x3:5, y3:1, x4:4, y4:0, color:'#FF00FF', shape:'T', orientation:0}; };
var create_tetromino_S = function() { return {x1:3, y1:1, x2:4, y2:1, x3:4, y3:0, x4:5, y4:0, color:'#00FF00', shape:'S', orientation:0}; };
var create_tetromino_Z = function() { return {x1:3, y1:0, x2:4, y2:0, x3:4, y3:1, x4:5, y4:1, color:'#FF0000', shape:'Z', orientation:0}; };
var create_tetromino_J = function() { return {x1:3, y1:0, x2:3, y2:1, x3:4, y3:1, x4:5, y4:1, color:'#0000FF', shape:'J', orientation:0}; };
var create_tetromino_L = function() { return {x1:3, y1:1, x2:4, y2:1, x3:5, y3:1, x4:5, y4:0, color:'#FF9900', shape:'L', orientation:0}; };

// Creation wrapper function
var create_tetromino = function() {
  var t;
  switch (Math.floor(Math.random() * 7)) {
  case 0: t = create_tetromino_I(); break;
  case 1: t = create_tetromino_O(); break;
  case 2: t = create_tetromino_T(); break;
  case 3: t = create_tetromino_S(); break;
  case 4: t = create_tetromino_Z(); break;
  case 5: t = create_tetromino_J(); break;
  case 6: t = create_tetromino_L(); break;
  }
  time_piece_created = Date.now();
  num_pieces_placed++;

  // Game over if spawn area is filled
  if (get_pixel(t.x1, t.y1) || get_pixel(t.x2, t.y2) || get_pixel(t.x3, t.y3) || get_pixel(t.x4, t.y4))
    return game_over();
  return t;
};

// Sets creates the next piece in the list and gens a new next
var getNewPiece = function() {
  curr_piece = next_piece;
  next_piece = create_tetromino();
};

// Does rotation of a piece (as a matrix operation)
var do_rotation = function(coor1, coor2, coor3, coor4) {
  clear_piece(); //to prevent false positives
  // Check if move is legal
  if (get_pixel(curr_piece.x1+coor1[0], curr_piece.y1+coor1[1]) ||
      get_pixel(curr_piece.x2+coor2[0], curr_piece.y2+coor2[1]) ||
      get_pixel(curr_piece.x3+coor3[0], curr_piece.y3+coor3[1]) ||
      get_pixel(curr_piece.x4+coor4[0], curr_piece.y4+coor4[1]) ) {
    display_piece();
    return;
  }
  // Do actual rotation
  curr_piece.x1 += coor1[0]; curr_piece.y1 += coor1[1];
  curr_piece.x2 += coor2[0]; curr_piece.y2 += coor2[1];
  curr_piece.x3 += coor3[0]; curr_piece.y3 += coor3[1];
  curr_piece.x4 += coor4[0]; curr_piece.y4 += coor4[1];
  curr_piece.orientation = (curr_piece.orientation + 1) %4;
  display_piece();
};

// Wrapper function for piece rotation
var rotate_piece = function() {
  // These numbers will be added to the coords [x,y]
  var coor1_change = [0,0];
  var coor2_change = [0,0];
  var coor3_change = [0,0];
  var coor4_change = [0,0];
  var s = curr_piece.orientation; //to save space

  switch(curr_piece.shape) {
  case 'O':
    break;
  case 'I':
    if (s %2 == 0) {
      coor1_change = [1, -3];
      coor2_change = [0, -2];
      coor3_change = [-1, -1];
      coor4_change = [-2, 0];
    } else {
      coor1_change = [-1, 3];
      coor2_change = [0, 2];
      coor3_change = [1, 1];
      coor4_change = [2, 0];
    }
    break;
  case 'L':
    if (s==0) {
      coor1_change = [1, -2];
      coor2_change = [0, -1];
      coor3_change = [-1, 0];
      coor4_change = [0, 1];
    } else if (s==1) {
      coor1_change = [1, 1];
      coor2_change = [0, 0];
      coor3_change = [-1, -1];
      coor4_change = [-2, 0];
    } else if (s==2) {
      coor1_change = [-1, 1];
      coor2_change = [0, 0];
      coor3_change = [1, -1];
      coor4_change = [0, -2];
    } else if (s==3){
      coor1_change = [-1, 0];
      coor2_change = [0, 1];
      coor3_change = [1, 2];
      coor4_change = [2, 1];
    }
    break;
  case 'J':
    if (s==0) {
      coor1_change = [2, -1];
      coor2_change = [1, -2];
      coor3_change = [0, -1];
      coor4_change = [-1, 0];
    } else if (s==1) {
      coor1_change = [0, 2];
      coor2_change = [1, 1];
      coor3_change = [0, 0];
      coor4_change = [-1, -1];
    } else if (s==2) {
      coor1_change = [-2, 0];
      coor2_change = [-1, 1];
      coor3_change = [0, 0];
      coor4_change = [1, -1];
    } else if (s==3) {
      coor1_change = [0, -1];
      coor2_change = [-1, 0];
      coor3_change = [0, 1];
      coor4_change = [1, 2];
    }
    break;
  case 'S':
    if (s %2 == 0) {
      coor1_change = [0, -2];
      coor2_change = [-1, -1];
      coor3_change = [0, 0];
      coor4_change = [-1, 1];
    } else {
      coor1_change = [0, 2];
      coor2_change = [1, 1];
      coor3_change = [0, 0];
      coor4_change = [1, -1];
    }
    break;
  case 'Z':
    if (s %2 == 0) {
      coor1_change = [2, -1];
      coor2_change = [1, 0];
      coor3_change = [0, -1];
      coor4_change = [-1, 0];
    } else {
      coor1_change = [-2, 1];
      coor2_change = [-1, 0];
      coor3_change = [0, 1];
      coor4_change = [1, 0];
    }
    break;
  case 'T':
    if (s==0) {
      coor1_change = [1, -2];
      coor2_change = [0, -1];
      coor3_change = [-1, 0];
      coor4_change = [1, 0];
    } else if (s==1) {
      coor1_change = [1, 1];
      coor2_change = [0, 0];
      coor3_change = [-1, -1];
      coor4_change = [-1, 1];
    } else if (s==2) {
      coor1_change = [-1, 1];
      coor2_change = [0, 0];
      coor3_change = [1, -1];
      coor4_change = [-1, -1];
    } else if (s==3) {
      coor1_change = [-1, 0];
      coor2_change = [0, 1];
      coor3_change = [1, 2];
      coor4_change = [1, 0];
    }
    break;
  }
  //does actual rotation
  do_rotation(coor1_change, coor2_change, coor3_change, coor4_change);
};


// =============================== Board functions ===============================


// Returns true if pixel is a block, false if otherwise
var pixel_is_filled = function(str) {
  if (str)
    return (str.includes('background')); //background might not be the best choice
  return false;
};

// Returns the color of a specified pixel (or null)
var get_pixel = function(x, y) {
  if (x >= 10 || y >= 20 || x < 0 || y < 0)
    return true;
  var pixel = 'xy' + x + '-' + y;
  var ret = document.getElementById(pixel).getAttribute('style');
  if (pixel_is_filled(ret))
    return ret.substring(ret.indexOf('#')); // return only the color
  return ret; // or null
};

// Sets the color of a specified pixel
var set_pixel = function(x, y, color) {
  if (x >= 10 || y >= 20 || x < 0 || y < 0)
    return;
  var pixel = 'xy' + x + '-' + y;
  if (color != null)
    document.getElementById(pixel).setAttribute('style', 'background: ' + color +'; ');
  else
    document.getElementById(pixel).removeAttribute('style');
};

// Set pixel color in box containing next piece
var set_nextbox_pixel = function(x, y, color){
  x-=3;
  if (x >= 4 || y >= 2 || x < 0 || y < 0)
    return;
  var pixel = 'xynext' + x + '-' + y;
  if (color != null)
    document.getElementById(pixel).setAttribute('style', 'background: ' + color +'; ');
  else
    document.getElementById(pixel).removeAttribute('style');
};

// Checks if a row of pixels is full
var check_row = function(y) {
  for (var x = 0; x < 10; x++ )
    if (! get_pixel(x, y))
      return false;
  return true;
};

// Clears rows that are full
var clear_rows = function() {
  if (debugging) console.log("Trying to clear rows...");
  for (var y = 0; y < 20; y++)
    if (check_row(y))
      move_down(y);
};

// Moves all higher rows down after row clear
var move_down = function(start) {
  rows_cleared++;
  score += 100 + 50*level;
  console.log('Moving rows down, starting at ' + start);

  for (var y = start; y > 0; y--) //shift all rows above down
    for (var x = 0; x < 10; x++)
      set_pixel(x, y, get_pixel(x, y-1));

  for (x = 0; x < 10; x++) //clear top row (to prevent copying)
    set_pixel(x, 0, null);
};

// Completely resets the board
var clear_board = function() {
  for (var y = 0; y < 20; y++)
    for (var x = 0; x < 10; x++)
      set_pixel(x, y, null);
};

var clear_nextbox = function() {
  for (var x = 3; x < 7; x++)
    for (var y = 0; y < 2; y++)
      set_nextbox_pixel(x, y, null);
};

// =============================== UNUSED (needs further development) ===============================

// var outline_pixel = function(x, y, color) {
//   if (x >= 10 || y >= 20 || x < 0 || y < 0)
//     return;
//   var begin = document.getElementById('xy'+ x + '-' + y).getAttribute('style');
//   if (begin && begin.includes('border'))
//     return;
//   if (!begin)
//     begin = ''; //because js is a pain in the rear null -> 'null'
//   if (color)
//     document.getElementById('xy'+ x + '-' + y).setAttribute('style', begin + 'border-color: ' + color +';');
//   //else //TODO: FIX!
//   //document.getElementById('xy'+ x + '-' + y).setAttribute('style', begin.substring(0, begin.indexOf('border'))); //untested
// };
// var outline_fall_area = function() { //in progress
//   // c is going to walk down until it hits the bottom
//   var c = { x1:curr_piece.x1, y1:curr_piece.y1, x2:curr_piece.x2, y2:curr_piece.y2, x3:curr_piece.x3, y3:curr_piece.y3, x4:curr_piece.x4, y4:curr_piece.y4 };
//   while (! (get_pixel(c.x1, c.y1) || get_pixel(c.x2, c.y2) || get_pixel(c.x3, c.y3) || get_pixel(c.x4, c.y4))) {
//     c.y1--; c.y2--; c.y3--; c.y4--; }
//   outline_pixel(c.x1, c.y1, curr_piece.color);
//   outline_pixel(c.x2, c.y2, curr_piece.color);
//   outline_pixel(c.x3, c.y3, curr_piece.color);
//   outline_pixel(c.x4, c.y4, curr_piece.color);
// };
// var unoutline_fall_area = function() {
//   var c = { x1:curr_piece.x1, y1:curr_piece.y1, x2:curr_piece.x2, y2:curr_piece.y2, x3:curr_piece.x3, y3:curr_piece.y3, x4:curr_piece.x4, y4:curr_piece.y4 };
//   while (! (get_pixel(c.x1, c.y1) || get_pixel(c.x2, c.y2) || get_pixel(c.x3, c.y3) || get_pixel(c.x4, c.y4))) {
//     c.y1--; c.y2--; c.y3--; c.y4--; }
//   outline_pixel(c.x1, c.y1, null);
//   outline_pixel(c.x2, c.y2, null);
//   outline_pixel(c.x3, c.y3, null);
//   outline_pixel(c.x4, c.y4, null);
// };


// =============================== Piece display functions ===============================


// Stops displaying current piece
var clear_piece = function() {
  set_pixel(curr_piece.x1, curr_piece.y1, null);
  set_pixel(curr_piece.x2, curr_piece.y2, null);
  set_pixel(curr_piece.x3, curr_piece.y3, null);
  set_pixel(curr_piece.x4, curr_piece.y4, null);
};

// Displays current piece
var display_piece = function() {
  set_pixel(curr_piece.x1, curr_piece.y1, curr_piece.color);
  set_pixel(curr_piece.x2, curr_piece.y2, curr_piece.color);
  set_pixel(curr_piece.x3, curr_piece.y3, curr_piece.color);
  set_pixel(curr_piece.x4, curr_piece.y4, curr_piece.color);
};

var display_next = function() {
  set_nextbox_pixel(next_piece.x1, next_piece.y1, next_piece.color);
  set_nextbox_pixel(next_piece.x2, next_piece.y2, next_piece.color);
  set_nextbox_pixel(next_piece.x3, next_piece.y3, next_piece.color);
  set_nextbox_pixel(next_piece.x4, next_piece.y4, next_piece.color);
};

// =============================== Piece movement functions ===============================


// Calculates the amount of time between gravity
var get_fall_time = function() { // in testing
  if (debugging) var init_level = level;
  level = Math.max(1, Math.floor(num_pieces_placed/12));
  if (debugging && level !=  init_level)
    console.log("Levelled up to " + level);
  if (debug_falling)
    return 100;
  else
    return 500/Math.pow(1.1, level - 1);
};

// Helper function (moves curr piece down)
var gravity = function() { //handles actual falling
  if (Date.now() - time_piece_created < 500)
    return false;
  clear_piece(); //must happen 1st or it could cause collision problems
  if (curr_piece.y1 >= 19 || curr_piece.y2 >= 19 || curr_piece.y3 >= 19 || curr_piece.y4 >= 19 ||
      get_pixel(curr_piece.x1, curr_piece.y1+1) || get_pixel(curr_piece.x2, curr_piece.y2+1) || get_pixel(curr_piece.x3, curr_piece.y3+1) || get_pixel(curr_piece.x4, curr_piece.y4+1)) { //if not being blocked
    display_piece();
    clear_rows(20);
    getNewPiece(); //make a new piece
    return false;
  }
  else {
    curr_piece.y1++; curr_piece.y2++; curr_piece.y3++; curr_piece.y4++; //gravity
    display_piece();
    return true;
  }
};

// Acts as gravity (wrapper)
var do_gravity = function() { //also is a callback for play_game
  gravity();
  score+=level;
  play_game();
};

// Forces a piece to the floor (wrapper)
var gravity_until_floor = function() {
  while (gravity())
    score += level*7;
};

// Moves a piece left or right (uses user input)
var lateral_move = function(dir) {
  var xs = [curr_piece.x1, curr_piece.x2, curr_piece.x3, curr_piece.x4]; //all x co-ords
  var ys = [curr_piece.y1, curr_piece.y2, curr_piece.y3, curr_piece.y4]; //all y co-ords
  clear_piece(); //must happen 1st or it could cause collision problems

  if ((dir == 'ArrowRight' || dir == 'KeyD' ) && xs[0] < 9 && xs[1] < 9 && xs[2] < 9 && xs[3] < 9) { // if not touching the border
    if ( !(get_pixel(xs[0]+1, ys[0]) || get_pixel(xs[1]+1, ys[1]) || get_pixel(xs[2]+1, ys[2]) || get_pixel(xs[3]+1, ys[3]))) { //if not being blocked
      curr_piece.x1++; curr_piece.x2++; curr_piece.x3++; curr_piece.x4++; }
  }

  else if ((dir == 'ArrowLeft' || dir == 'KeyA' ) && xs[0] > 0 && xs[1] > 0 && xs[2] > 0 && xs[3] > 0) { // if not touching the border
    if ( !(get_pixel(xs[0]-1, ys[0]) || get_pixel(xs[1]-1, ys[1]) || get_pixel(xs[2]-1, ys[2]) || get_pixel(xs[3]-1, ys[3]))) { //if not being blocked
      curr_piece.x1--; curr_piece.x2--; curr_piece.x3--; curr_piece.x4--; }
  }
  display_piece();
};


// =============================== UI Updators ===============================

var update_game_status = function(status) {
  document.getElementById('gi-status').innerHTML = status;
};

var update_game_prog = function() {
  document.getElementById('gi-level').innerHTML = 'Level: ' + level;
  document.getElementById('gi-score').innerHTML = 'Score: ' + score;
};

var update_game_info = function() {
  clear_nextbox();
  display_next();
  update_game_prog();
  update_game_status('Game in progress');
};


// =============================== Game progression functions ===============================


// Sets board up for a new game
var start_game = function() {
  game_started = true;
  document.getElementsByClassName('game_start')[0].innerHTML = 'Good luck! Press Escape to quit.';
  clear_board();

  //set globals
  next_piece = create_tetromino();
  curr_piece = create_tetromino();
  level = 1;
  rows_cleared = 0;
  score = 0;
  num_pieces_placed = 0;

  display_piece();
  play_game();
};

// Displays gameover message
var alert_gameover = function() {
  var s = "Game over.\n\n";
  s+= "You made it to level " + level + ",\n";
  s+= "scored " + score + " points,\n";
  s+= "cleared " + rows_cleared + " rows,\n";
  s+= "and placed " + num_pieces_placed + " blocks!\n";
  alert(s);
};

// Updates database
var send_score = function(e) {
  $.ajax({
    url: '/tetris/update',
    type: 'POST',
    data: {'score' : score },
    success: function(d) {
      console.log(d);
    } //end success callback
  });//end ajax call
  console.log('goodbye');
};

// Ends the game
var game_over = function() {
  send_score();
  alert_gameover();
  document.getElementsByClassName('game_start')[0].innerHTML = 'Press Space to play again';
  clearTimeout(gravity_timer);
  game_started = false;
  update_game_status('Game over');
};

// Main function that loops while game is in progress
var play_game = function() {
  if (game_started) {
    if (is_paused)
      return; //waits for unpause
    if (curr_piece == null)
      getNewPiece();
    display_piece();
    if (debugging) console.log(curr_piece);
    update_game_info();
    gravity_timer = setTimeout(do_gravity, get_fall_time());
  }
};

// Handles user input
var button_press = function(e) {
  if (debugging)
    console.log('button push: ' + e.code);

  if (!game_started) {
    if (e.code == 'Space') {
      start_game();
      return;
    }
    else
      return;
  }

  if (is_paused) {
    if (e.code == 'KeyP') {
      if (debugging) console.log('unpause!');
      is_paused = false;
      play_game();
    }
    return;
  }

  if (Date.now() - time_piece_created > 500) //half sec grace period
    switch(e.code) {
    case 'Escape':
      game_over();
      break;
    case 'ArrowLeft':
    case 'ArrowRight':
    case 'KeyA':
    case 'KeyD':
      lateral_move(e.code);
      break;
    case 'KeyW':
    case 'ArrowUp':
      rotate_piece();
      break;
    case 'ArrowDown':
    case 'KeyS':
      score += 2*level;
      gravity();
      break;
    case 'Space':
      gravity_until_floor();
      break;
    case 'KeyP':
      clearTimeout(gravity_timer);
      is_paused = true;
      update_game_status('Game paused');
    }
};


// =============================== Globals ===============================

var debugging = false; //verbose function output
var debug_falling = false; // forces pieces to move faster

// User progression variables
var level = 1;
var rows_cleared = 0;
var score = 0;
var num_pieces_placed = 0;

// Timer variables
var gravity_timer;
var game_started = false;
var is_paused = false;
var time_piece_created = 0;

// Stores pieces
var next_piece = null;
var curr_piece = null;

// Runs the game when the user presses Space
document.addEventListener("keydown", button_press);
