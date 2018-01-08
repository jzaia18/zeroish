// =============================== Block functions ===============================

// Different "constructors" for each shape

var create_tetromino_I = function() {
  return {x1:3, y1:0, x2:4, y2:0, x3:5, y3:0, x4:6, y4:0, color:'#00FFFF'};
};

var create_tetromino_O = function() {
  return {x1:4, y1:0, x2:4, y2:1, x3:5, y3:0, x4:5, y4:1, color:'#FFFF00'};
};

var create_tetromino_T = function() {
  return {x1:3, y1:1, x2:4, y2:1, x3:4, y3:0, x4:5, y4:1, color:'#FF00FF'};
};

var create_tetromino_S = function() {
  return {x1:3, y1:1, x2:4, y2:1, x3:4, y3:0, x4:5, y4:0, color:'#00FF00'};
};

var create_tetromino_Z = function() {
  return {x1:3, y1:0, x2:4, y2:0, x3:4, y3:1, x4:5, y4:1, color:'#FF0000'};
};

var create_tetromino_J = function() {
  return {x1:3, y1:0, x2:3, y2:1, x3:4, y3:1, x4:5, y4:1, color:'#0000FF'};
};

var create_tetromino_L = function() {
  return {x1:3, y1:1, x2:4, y2:1, x3:5, y3:1, x4:5, y4:0, color:'#FF9900'};
};


// Creation wrapper function
var create_tetromino = function() {
  switch (Math.floor(Math.random() * 7)) {
  case 0: return create_tetromino_I();
  case 1: return create_tetromino_O();
  case 2: return create_tetromino_T();
  case 3: return create_tetromino_S();
  case 4: return create_tetromino_Z();
  case 5: return create_tetromino_J();
  case 6: return create_tetromino_L();
  }
};


// =============================== Board functions ===============================

var check_row = function(y) { //returns true if row is full
  for (var x = 0; x < 10; x++ )
    if (! get_pixel(x, y))
        return false;
    return true;
};

var clear_row = function(y) {

};

var get_pixel = function(x, y) {
  if (x >= 10 || y >= 20)
    return undefined;
  var pixel = 'xy' + x + '-' + y;
  var ret = document.getElementById(pixel).getAttribute('style');
  if (debugging) console.log('get_pixel:' + ret);
  return ret;
};

var set_pixel = function(x, y, color) {
  if (x >= 10 || y >= 20)
    return;
  var pixel = 'xy' + x + '-' + y;
  if (color != null)
    document.getElementById(pixel).setAttribute('style', 'background: ' + color);
  else
    document.getElementById(pixel).removeAttribute('style');
};

var clear_board = function() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 10; j++) {
      set_pixel(j, i, null);
    }
  }
};

// =============================== Piece movement functions ===============================

var clear_piece = function() {
  set_pixel(curr_piece.x1, curr_piece.y1, null);
  set_pixel(curr_piece.x2, curr_piece.y2, null);
  set_pixel(curr_piece.x3, curr_piece.y3, null);
  set_pixel(curr_piece.x4, curr_piece.y4, null);
};

var display_piece = function() {
  set_pixel(curr_piece.x1, curr_piece.y1, curr_piece.color);
  set_pixel(curr_piece.x2, curr_piece.y2, curr_piece.color);
  set_pixel(curr_piece.x3, curr_piece.y3, curr_piece.color);
  set_pixel(curr_piece.x4, curr_piece.y4, curr_piece.color);
};

var gravity = function() {
  clear_piece(); //must happen 1st or it could cause collision problems
  if (curr_piece.y1 >= 19 || curr_piece.y2 >= 19 || curr_piece.y3 >= 19 || curr_piece.y4 >= 19 ||
      get_pixel(curr_piece.x1, curr_piece.y1+1) || get_pixel(curr_piece.x2, curr_piece.y2+1) || get_pixel(curr_piece.x3, curr_piece.y3+1) || get_pixel(curr_piece.x4, curr_piece.y4+1)) { //if not being blocked
    display_piece();
    curr_piece = create_tetromino(); //make a new piece
  }

  // TODO: gameover

  else {
    curr_piece.y1++; curr_piece.y2++; curr_piece.y3++; curr_piece.y4++; //gravity
    display_piece();
  }
  play_game();
};

var lateral_move = function(dir) {
  if (debugging) console.log('moving ' + dir);
  var xs = [curr_piece.x1, curr_piece.x2, curr_piece.x3, curr_piece.x4]; //all x co-ords
  var ys = [curr_piece.y1, curr_piece.y2, curr_piece.y3, curr_piece.y4]; //all y co-ords

  clear_piece(); //must happen 1st or it could cause collision problems
  if (dir == 'ArrowRight' && xs[0] < 9 && xs[1] < 9 && xs[2] < 9 && xs[3] < 9) { // if not touching the border
    if ( !(get_pixel(xs[0]+1, ys[0]) || get_pixel(xs[1]+1, ys[1]) || get_pixel(xs[2]+1, ys[2]) || get_pixel(xs[3]+1, ys[3]))) { //if not being blocked
      curr_piece.x1++; curr_piece.x2++; curr_piece.x3++; curr_piece.x4++; }
  }

  else if (dir == 'ArrowLeft' && xs[0] > 0 && xs[1] > 0 && xs[2] > 0 && xs[3] > 0) { // if not touching the border
    if ( !(get_pixel(xs[0]-1, ys[0]) || get_pixel(xs[1]-1, ys[1]) || get_pixel(xs[2]-1, ys[2]) || get_pixel(xs[3]-1, ys[3]))) { //if not being blocked
      curr_piece.x1--; curr_piece.x2--; curr_piece.x3--; curr_piece.x4--; }
  }
  display_piece();
};


// =============================== Game progression functions ===============================

var start_game = function() {
  game_started = true;
  document.getElementsByClassName('game_start')[0].innerHTML = "Good luck!";
  clear_board();
  curr_piece = create_tetromino();
  display_piece();
  play_game();
};

var game_over = function() {
  alert("game over :c");
  document.getElementsByClassName('game_start')[0].innerHTML = "Press Space to play again";
  clearTimeout(gravity_timer);
  game_started = false;
};

var play_game = function() {
  if (game_started) {
    if (curr_piece == null)
      curr_piece = create_tetromino();
    display_piece();
    if (debugging) console.log(curr_piece);
    gravity_timer = setTimeout(gravity, 500); //1 sec to fall
  }
};

var button_press = function(e) {
  if (debugging) {
    console.log('button push:' + e.code);
    console.log(curr_piece); }

  switch(e.code) {
  case 'Escape':
    game_over();
    break;
  case 'ArrowLeft':
  case 'ArrowRight':
    lateral_move(e.code);
    break;
  }


  if (!game_started) {
    if (e.code == "Space")
      start_game();
    else
      return;
  }
};


// =============================== Setup & run ===============================

var debugging = true;
var level = 1;
var score = 0;

var gravity_timer;
var game_started = false;
var curr_piece = null;
document.addEventListener("keydown", button_press);
