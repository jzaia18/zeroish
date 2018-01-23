//postion of snek
var snek_posx = 10;
var snek_posy = 10;
//map size
var height = 20;
var length = 20;
//time interval
var time = 100;
//how much snek grows by eating apple
var snek_grow = 1;
//position of snek body
var tail_posx = [snek_posx];
var tail_posy = [snek_posy];
//position of apple
//randomness needed for apples
var random = function(min,max){
  return Math.floor(Math.random()*(max-min) + min);
}
var apple_posx = random(1,length-1);
var apple_posy = random(1,height-1);
//is the game currently playing? Use for play/pause
var playing = false;
var game_over = false;
//arrow key values used to determine snek direction
// 1 = up, 2 = right, down = 3, left = 4
var dir = 0;
//will be used to store function later for timer
var inital;
//necessary for length of snake
var len = 0;
//direction needs to be stored in var so that when update is made, direction can be updated
var temp_dir = dir;
//keeps track of user score
var score = 0;
var level = 1;
game_mode = 0;

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
  return t;
};





//main function that runs
var main = function(){
  //preliminary setup fxn
  setup();
  //updater fxn
  inital = setInterval(loop, time)
};

var reset = function(){
  location.reload();
};

var get_id = function(x,y){
  return document.getElementById(x+"-"+y);
};

var get_class = function(x,y){
    return get_id(x,y).getAttribute("class");
};

var set_class = function(x,y,claz){
  if(x != null && y != null){
        get_id(x,y).setAttribute("class", claz);
  }
};

var update_game_prog = function() {
  document.getElementById('gi-level').innerHTML = 'Level: ' + level;
  document.getElementById('gi-score').innerHTML = 'Score: ' + score;
};

var update_game_status = function(playing,game_over) {
  if (playing){
    document.getElementById('gi-status').innerHTML = "Game is playing";
  }
  if (!playing){
    document.getElementById('gi-status').innerHTML = "Game is paused";
  }
  if (game_over){
    document.getElementById('gi-status').innerHTML = "Game has ended";
  }
};

var setup = function(){
  //make_map();
  poof_tetris();
  poof_tetris();
  poof_tetris();
  poof_tetris();
  draw_snek();
  draw_apple(); //implement later
};

var poof_tetris = function(){
  var x = random(-2,12);
  var y = random(2,18);
  var t = create_tetromino();
  var z = random(0,3);
  while(z-- > 0){
    rotate_piece(t);
  }
  t.x1 += x;
  t.x2 += x;
  t.x3 += x;
  t.x4 += x;
  t.y1 += y;
  t.y2 += y;
  t.y3 += y;
  t.y4 += y;
  display_piece(t);
}

var display_piece = function(t) {
  set_class(t.x1, t.y1, "tetris");
  set_class(t.x2, t.y2, "tetris");
  set_class(t.x3, t.y3, "tetris");
  set_class(t.x4, t.y4, "tetris");
};

// Does rotation of a piece (as a matrix operation)
var do_rotation = function(t,coor1, coor2, coor3, coor4) {
  // Do actual rotation
  t.x1 += coor1[0]; t.y1 += coor1[1];
  t.x2 += coor2[0]; t.y2 += coor2[1];
  t.x3 += coor3[0]; t.y3 += coor3[1];
  t.x4 += coor4[0]; t.y4 += coor4[1];
  t.orientation = (t.orientation + 1) %4;
};

// Wrapper function for piece rotation
var rotate_piece = function(t) {
  // These numbers will be added to the coords [x,y]
  var coor1_change = [0,0];
  var coor2_change = [0,0];
  var coor3_change = [0,0];
  var coor4_change = [0,0];
  var s = t.orientation; //to save space

  switch(t.shape) {
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
  do_rotation(t,coor1_change, coor2_change, coor3_change, coor4_change);
};




















var lvl = function(){
  if ((score > level*200) && (level < 10)){
    level += 1;
    clearInterval(inital);
    time = time-5;
    inital = setInterval(loop, time);
    }
  };

var loop = function(){
    if(playing && !game_over){
        update();
    }else if(game_over){
      //this fxn stops the updater (setinterval)
        clearInterval(inital);
    }
};

var draw_snek= function() {
  draw(snek_posx,snek_posy,"snek")
};

var draw = function(x,y,type){
  var store = document.getElementById(x+"-"+y);
  return store.setAttribute("class",type);
};

var draw_apple = function(){
      //check if the apple exist first
      var no_exist = true;
      //find a radom non-occupied location for apple
      while(no_exist && (0 < (length-2)*(height-2)+1)){
          var temp_apple_posx = random(1,length-1);
          var temp_apple_posy = random(1,height-1);
          //empty location is marked by the background property
          if(get_class(temp_apple_posx, temp_apple_posy) == "back")
              no_exist = false;
      }
      //sets the location for the new apple
      set_class(temp_apple_posx, temp_apple_posy, "apple");
      apple_posx = temp_apple_posx;
      apple_posy = temp_apple_posy;
};

//updates tail position based on array position
var tail = function(){
      for(var i = len; i > 0; i--){
          tail_posx[i] = tail_posx[i-1];
          tail_posy[i] = tail_posy[i-1];
      }
      tail_posx[0] = snek_posx;
      tail_posy[0] = snek_posy;
};

// Displays gameover message
var alert_gameover = function() {
  update_game_status(playing,true);
  var s = "Game over.\n\n";
  s+= "You made it to level " + level + ",\n";
  s+= "You scored " + score + " points!\n";
  s+= "Press spacebar to play again!"
  alert(s);
};


window.addEventListener("keydown", function key(event){
      //W or up arrow set direction up
      var key = event.keyCode;
      if(dir != 3 && (key == 119 || key == 87 || key == 38))
          temp_dir = 1;
      //S oe down arrow set direction down
      else if(dir!= 1 && (key == 115 || key == 83 || key == 40))
          temp_dir = 3;
      //A or left arrow set direction left
      else if(dir != 2 && (key == 97 || key == 65 || key == 37))
          temp_dir = 4;
      //D or right arrow set direction right
      else if(dir != 4 && (key == 100 || key == 68 || key == 39))
          temp_dir = 2;
      //if spacebar is pressed pause game
      if(!playing)
          playing = true;
      else if(key == 32 || key == 80)
          playing = false;
      if((playing == false && game_over == true) && key == 32){
        reset();

      }
      update_game_status(playing,game_over);
});

var update = function(){
      //set the actual direction to the direction given by keypress
      dir = temp_dir;
      update_game_prog(playing,game_over);
      set_class(apple_posx, apple_posy, "apple");
      //makes non snake cells back to background cells
      set_class(tail_posx[len], tail_posy[len], "back");
      //updates tail position
      tail();
      //shifts head and body based on dir
      if(dir == 1)//up
          snek_posy--;
      else if(dir == 3)//down
          snek_posy++;
      else if(dir == 4)//left
          snek_posx--;
      else if(dir == 2)//right
          snek_posx++;
      //new cells of snek made
      for(var i = tail_posx.length-1; i >=0; i--){
        // this checks for collision by checking of snek lands on a snek cell
          if((get_class(snek_posx, snek_posy) == "snek")){
              game_over = true;
              update_game_status(playing,game_over);
              alert_gameover();
              send_score();
              break;
          }
      }
      //snek collsion is being checked via borders
      if((get_class(snek_posx, snek_posy) == "border") || (get_class(snek_posx, snek_posy) == "tetris")){
          set_class(snek_posx,snek_posy,"border")
          game_over = true;
          update_game_status(playing,game_over);
          alert_gameover();
          send_score();
      }
      //sets the new x,y postions of snek on the grid
      if (!game_over){
        set_class(snek_posx, snek_posy, "snek");
      }
      //if the snek eats apple, grow it and respawn apple
      if(snek_posx == apple_posx && snek_posy == apple_posy){
          score += 50;
          draw_apple();
          len += snek_grow;
      }
      update_game_status(playing,game_over);
      console.log(time);
      lvl();
};

// Updates database
var send_score = function(e) {
  $.ajax({
    url: '/snake/update',
    type: 'POST',
    data: {'score' : score },
    success: function(d) {
      console.log(d);
    } //end success callback
  });//end ajax call
  console.log('goodbye');
};

//let's play snek
main();
