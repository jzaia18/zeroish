
// Adds most variables to tetromino object
var create_tetromino_helper = function(t) {
    //might be unneeded
};

// Different "constructors" for each shape

var create_tetrominoI = function() {
    return {x1:0, y1:0, x2:1, y2:0, x3:2, y3:0, x4:3, y4:0};
};

var create_tetrominoO = function() {
    return {x1:0, y1:0, x2:1, y2:0, x3:0, y3:1, x4:1, y4:1};
};

var create_tetrominoT = function() {
    return {x1:0, y1:0, x2:1, y2:0, x3:2, y3:0, x4:1, y4:1};
};

var create_tetrominoS = function() {
    return {x1:0, y1:0, x2:1, y2:0, x3:1, y3:1, x4:2, y4:1};
};

var create_tetrominoZ = function() {
    return {x1:0, y1:1, x2:1, y2:0, x3:1, y3:1, x4:2, y4:0};
};

var create_tetrominoJ = function() {
    return {x1:0, y1:0, x2:1, y2:0, x3:2, y3:0, x4:0, y4:1};
};

var create_tetrominoL = function() {
    return {x1:0, y1:0, x2:1, y2:0, x3:2, y3:0, x4:2, y4:1};
};


// Creation wrapper function
var create_tetromino = function() {
    switch (Math.random() * 7)
    case 0: return create_tetromino_I();
    case 1: return create_tetromino_O();
    case 2: return create_tetromino_T();
    case 3: return create_tetromino_S();
    case 4: return create_tetromino_Z();
    case 5: return create_tetromino_J();
    case 6: return create_tetromino_L();
};


