//postion of snek
var snek_posx = 10;
var snek_posy = 10;
//map size
var height = 20;
var length = 20;
//time interval
var time = 100;
//how much snek grows by eating fruit
var snek_grow = 1;
//position of snek body
var tail_posx = [snek_posx];
var tail_posy = [snek_posy];
//position of fruit
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
  draw_snek();
  draw_fruit();
//  poof_tetris();//implement later
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

var draw_fruit = function(){
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
      if(get_class(snek_posx, snek_posy) == "border"){
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
          draw_fruit();
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
