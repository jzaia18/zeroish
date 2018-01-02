
// Adds most variables to tetromino object
var create_tetromino_helper = function(t) {};

// Different "constructors" for each shape

var create_tetrominoI = function() {};

var create_tetrominoO = function() {};

var create_tetrominoT = function() {};

var create_tetrominoS = function() {};

var create_tetrominoZ = function() {};

var create_tetrominoJ = function() {};

var create_tetrominoL = function() {};


// Creation wrapper function
var create_tetromino = function() {
    switch (Math.random() * 7)
    case 0: return create_tertomino_I();
    case 1: return create_tertomino_O();
    case 2: return create_tertomino_T();
    case 3: return create_tertomino_S();
    case 4: return create_tertomino_Z();
    case 5: return create_tertomino_J();
    case 6: return create_tertomino_L();
};
