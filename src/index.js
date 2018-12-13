import 'phaser'
import { SimpleScene } from './scenes/simple-scene';
import { MidiController } from './midi'

const gameConfig = {
  width: 640,
  height: 480,
  scene: SimpleScene
}

new Phaser.Game(gameConfig);
new MidiController

// window.webmidi = WebMidi




