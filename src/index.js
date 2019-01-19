import 'phaser'
import { SimpleScene } from './scenes/simple-scene';

const gameConfig = {
  // this might not work on high dpi devices like retina screens
  // since they have 2x pixel density
  width: window.innerWidth, 
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false 
    }
  },
  scene: SimpleScene
}

var game = new Phaser.Game(gameConfig);






