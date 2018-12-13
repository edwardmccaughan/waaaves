import 'phaser'
import { SimpleScene } from './scenes/simple-scene';

const gameConfig = {
  width: 640,
  height: 480,
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






