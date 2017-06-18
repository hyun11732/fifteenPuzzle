# // Hyun Suk Lee
// 05/02/2017
// CSE 154
// Instructor : Chadi Moussi
// assignment#5
// This javascript is connected to fifteen.html and manipulates its page.
// This script creates "fifteen puzzle" that most of people played when they
// are young. This script will divide the image into 15 pieaces and a user
// can shuffle it to solve puzzle.
(function() {
    
    "use strict";
    
    var blankid;
    var blankPositionX;
    var blankPositionY;
    var neighbor;
    

    // This function is called when the page is just loaded. It splits picture into
    // fifteen boxes, check which box is moveable or not, and make fifteen boxes 
    // shuffles randomly when a user clicks a "shuffle" below the puzzle.
    $(document).ready(function(){
        $("#shufflebutton").click(shuffle);
        split();
        moveAble();
    });
    
    // This function is called when a user clicks a box which is moveable(neighbor box of
    // blank box) and make it move to a blank box.
    function clickMove() {
        var movingid = parseInt(this.id);
        var boxText = this.innerHTML;
        move(movingid, boxText);
    }
    
    // This takes "movingId" and "boxText" as parameters and make an actual movement
    // of a box. "MovingId" is an abosolute position number of a box which will be moved and
    // "boxText" is a number on its box. This will copy physical properties 
    // of a "movingId" box. Then, it will paste these properties like the number on
    // the box and its background image into a blank page. Finally, it will remove
    // a moved box to make a blank box and check a neighbor of a new blank box(moveable boxes). 
    function move(movingId, boxText) {
        var object = $("#" + movingId + "box");
        var imgPositionX = parseInt(object.css("backgroundPositionX"));
        var imgPositionY = parseInt(object.css("backgroundPositionY"));
        makeBox(blankPositionX, blankPositionY, -imgPositionX,
                -imgPositionY, blankid, boxText);
        blankPositionX = parseInt(object.css("left"));
        blankPositionY = parseInt(object.css("top"));
        blankid = movingId;
        object.remove();
        renew();
        moveAble();
    }
    
    // This function splits an image to fifteen pieaces to make a puzzle.
    function split() {
        var top = 0;
        var left = 0;
        for(var i = 1; i <= 15; i++) {
            makeBox(left, top, left, top, i, i);
            left += 100;
            if(left == 400) {
                left = 0;
                top += 100;
            }
        }
    blankid = 16;
    blankPositionX = 300;
    blankPositionY = 300;
    }
    
    // This function takes "boxLeft", "boxTop", "imgLeft", "imgTop", "id", "text"
    // as parameters. "boxLeft" and "boxTop" gives an absolute x-y corrdinate position
    // to a box and "imgLeft" and "imgTop" gives a location of backgroundimage which
    // each box needs to be showed. "id" gives absolute position number(not in x/y corrdinate)
    // by giving each box id. Lastly, "text" gives on actual number text on the box. 
    // This function will create an "div" tag w, a box, into html file and gives
    // these parameters' properties to each box. Also, it will give a common physical
    // property of "box" class. 
    function makeBox(boxLeft, boxTop, imgLeft, imgTop, id, text) {
        var div = $("<div></div>");
        div.attr("id", id + "box");
        div.attr("class", "box");
        div.css("backgroundPosition", -imgLeft + "px " + -imgTop + "px");
        div.text(text);
        div = $("#puzzlearea").append(div);
        div = $("#" + id + "box");
        div.css("left", boxLeft + "px");
        div.css("top", boxTop + "px");
    }
    
    // It will renew class name and event every boxes in "box" class and neighbors of
    // old blank box to reset new moveable boxes, neighbors of a new blank box. 
    function renew() {
        var boxArray = $(".box");
        for(var i = 0; i < boxArray.length; i++) {
            var box = $(boxArray[i]);
            box.attr("class", "box");
            box.off("click", clickMove);
        }
        neighbor =null;
    }
    
    // This function will check each of boxes is a neighbor to a blank box. 
    // If a box is a neighbor of a blank box, it means it can be moveable. 
    // This will set neighbor boxes of a blank box and gives them clickable
    // event so when a user clicks it, it can be moved to a blank box. Also, 
    // this gives a physical properties of neighbors, moveable boxes. When a user
    // puts a mouse on moveable box, its border and text number will change to red
    // and mouse pointer will change to hand shape pointer. 
    function moveAble() {
        var value = blankid;
        var canMove = [];
        if(value != 13 && value != 9 && value !=5 && value != 1) {
            canMove.push(value - 1);
        }
        if(value != 13 && value != 14 && value != 15  && value != 16) {
            canMove.push(value + 4);
        }
        if(value != 16 && value != 12 && value !=8 && value != 4) {
            canMove.push(value + 1);
        }
        if(value != 1 && value !=2 && value !=3 && value !=4) {
            canMove.push(value -4);
        }
        for(var i = 0; i < canMove.length; i++) {
            $("#" + canMove[i] + "box").attr("class", "box moveAble");
            $("#" + canMove[i] + "box").on("click", clickMove);
        }
        neighbor = canMove;
    }
    
    // This will shuffle a box randomly so a user can start to solve a puzzle. 
    // It will randomly choose one box from neighbor boxes of a blank boxes, moveable
    // boxes, and make it move to a blank page. Then, it will repeat this process
    // for 1000 times. 
    function shuffle(){
        for(var i = 0; i < 1000; i++) {
            var random = Math.floor(Math.random() * neighbor.length);
            var movingBox = $("#" + neighbor[random] + "box");
            move(neighbor[random], movingBox.html());
        }
    }
})();
