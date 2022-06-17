window.onload = function() {

  //  Create your Phaser game and inject it into the gameContainer div.
  //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
  var game = new Phaser.Game(360, 480, Phaser.CANVAS, 'gameContainer');
  
  /* make the entire screen but i don't feel like it does what i want it to do.
  if (game.device.desktop) {
    //  If you have any desktop specific settings, they can go in here
    game._width = window.innerWidth;
    game._height = window.innerHeight;
  } else {
    //  Same goes for mobile settings.
    //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
    game._width = window.innerWidth;
    game._height = window.innerHeight;
  }
  */

  //  Add the States your game has.
  //  You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
  game.state.add('Boot', BasicGame.Boot);
  game.state.add('Preloader', BasicGame.Preloader);
  game.state.add('MainMenu', BasicGame.MainMenu);
  game.state.add('Game', BasicGame.Game);

  //  Now start the Boot state.
  game.state.start('Boot');

};
