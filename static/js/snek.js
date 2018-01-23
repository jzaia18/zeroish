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
var inital;
var len = 0;

function main(){
  setup();
  intial = (loop, time)
}

function random(min,max){
  return Math.floor(Math.random()*(max-min) +min);
}

function get_id(x,y){
  return document.getElementById(x+"-"+y);
}

function get_class(x,y){
    return get_id(x,y).getAttribute("class");
}

function set_class(x,y,claz){
  get_id(x,y).setAttribute("class", claz);
}


//sets up main part of map
function setup(){
  make_map();
  draw_snek();
  draw_fruit();
  poof_tetris();//implement later
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

function draw_snek() {
  draw(snek_posx,snek_posy,"snek")
}

function draw(x,y,type){
  var store = document.getElementById(x+"-"+y);
  return store.setAttribute("class",type);
}

function draw_fruit(){
      var found = false;
      while(!found && (0 < (length-2)*(height-2)+1)){
          var fruitX = random(1,length-1);
          var fruitY = random(1,height-1);
          if(get_class(fruitX, fruitY) == "back")
              found = true;
      }
      set_class(fruitX, fruitY, "apple");
      apple_posx = fruitX;
      apple_posy = fruitY;
  }




main()
