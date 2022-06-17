// Gamepad navigator
// version 0.1
// http://www.mrspeaker.net/
//
// ===== INSTRUCTIONS =====
//
// ==UserScript==
// @name           brenden adamczak try
// @namespace      http://www.mrspeaker.net/
// @description    Navigate web pages with your gamepad... only works with Firefox and NES Retrolink gamepad for now!
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//
// @include        http://*
// @include        https://*
// @grant GM_addStyle
// ==/UserScript==



console.log("this is working");

GM_addStyle("a{background-color :yellow !important;}");

(function() {
    console.log("inside function");
    // These buttons are for a NES retrolink gamepad.
    // Should really be using input.js or something to support more devices.
    var axisX = 4,
        axisY = 5,
        L1 = 4,
        R1 = 5
        buttonGo = [1, 2],
        buttonBack = [8],
        buttonForward = [9],
        gamepad = null;
    
    var hasGP = false;
    var scrollSpeed = 5;
  
  
    var rAF = window.mozRequestAnimationFrame ||  //get the right AnimationFrame variable
    window.webkitRequestAnimationFrame ||
    window.requestAnimationFrame;

    var rAFStop = window.mozCancelRequestAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.cancelRequestAnimationFrame;
  
    

    function onY(isUp) {
        //console.log("onY");
        if(isUp === 0){ return}
        window.scrollBy(0,isUp*scrollSpeed);
    }
    /*
    function onX(isRight) {
       //console.log("isRight");
        var links = $("a"),
            indx = (links.index($("a:focus").first()) >= 0 ) || 0;
            console.log(indx);
        links.eq((indx + isRight) % links.length).focus();
      //console.log("isRight");
    }
    */
    function changeFocus(left,right){ //if the left and right button have ben pressed then they will return 1;
        var direction = 0;
        if(left.pressed){
            direction = -1;
        }
        if(right.pressed){
            direction = 1;
        }
            
        if(!direction){
            var links = $("a"),
                indx = (links.index($("a:focus").first()) >= 0 ) || 0;
                //console.log(indx);
            links.eq((indx + direction) % links.length).focus();
            $("a").first().focus();
        }
        
    }
    
    function reportOnGamepad(){
        //console.log("start");
        var gp = navigator.getGamepads()[0]; //bet i can makes this better for more controllers


        var direction = function(value){
          if(Math.abs(value) > 0.1){
            if(value < 0.1){
              return -1
            }
            else{
              return 1
            }
          }
          else{
            return 0;
          }
        };
        //console.log(gp.axes[0] +  "asdfasdf");
        var axesLSUpDown = direction(gp.axes[0]);
        var axesLSLeftRight = direction(gp.axes[1]);
        onY(axesLSUpDown);
        //console.log(gp.buttons[L1]);
        //changeFocus(gp.buttons[L1],gp.buttons[R1]);
        
        //onX(axesLSLeftRight);
        //console.log(axesLSUpDown);
      
         rAF(reportOnGamepad);
       }
    
    
    
/********************************************************************************************************/
    // might wan't to look into navigator.webkitGamepads and MozGamepadAxisMove support for older browsers
/********************************************************************************************************/
    
    
    
    var checkForGamepadSupport = function(){
        return "getGamepads" in navigator;
    }
    
    if(checkForGamepadSupport()){
        console.log("there is gamepad support")
        window.addEventListener("gamepadconnected", function(e) {
            console.log("gamepadConnected");
            hasGP = true;
            
            repGP = rAF(reportOnGamepad);
            //gamepad = e.gamepad.index;
        }, false);
      
        window.addEventListener("gamepaddisconnected", function(){
            console.log("gamepadNotConnected");     
            rAFStop(reportOnGamepad)
        }, false);
        
        
        if(navigator.appVersion.indexOf("Chrome") > 0){  //chrome detective
            console.log("Your using Chrome");
            var checkGP = window.setInterval(function(){ // problem with chrome where it can't get detected
                if(navigator.getGamepads()[0]){
                    if(!hasGP) $(window).trigger("gamepadconnected");
                    window.clearInterval(checkGP);
                }
            }, 500);
        }
        
        
    }else{
        console.log("doesn't have gamepad support");
    }
})();






