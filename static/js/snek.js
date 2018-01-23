//postion of snek
var snek_posx = 10;
var snek_posy = 10;
//map size
var height = 20;
var length = 20;
//time interval
var time = 100;
//how much snek grows by eating fruit
var snek_grow = 5;
//position of snek body
var tail_posx = [snek_posx];
var tail_posy = [snek_posy];
//position of fruit
var apple_posx = 2;
var apple_posy = 2;
//is the game currently playing? Use for play/pause
var playing;
var game_over;
//arrow key values used to determine snek direction
// 1 = up, 2 = right, down = 3, left = 4
var dir = 3;
//will be used to store function later
var set;

function main(){
  setup();
  set = (loop, time)
}

//sets up main part of map
function setup(){
  make_map();
  create_snek();
  create_fruit();
  create_tetris();
}

function make_map(){
  document.write("<center><table>");
  for (var y = 0; y < height; y ++){
    document.write("<tr>");
    for (var x = 0; x < length; x ++){
      if (x == 0 || y == 0 || x == length - 1 || y == height - 1){
        document.write("<td class='border' id='" + x + "-" + y + "'></td>");
      }
      else{
        document.write("<td class='back' id='" + x + "-" + y + "'></td>");
      }
    }
    document.write("</tr>")
  }
  document.write("</tables></center>")
}




main()
