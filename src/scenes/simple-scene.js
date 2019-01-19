import { MidiController } from '../midi'
import { RealKeyboard } from '../real_keyboard'


export class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image('cokecan', 'assets/cokecan.png');
  }

  create() {
    this.colas = []

    new MidiController( (key) => { this.add_cola(key) }, (key) => {} )
    new RealKeyboard()
  }

  add_cola(x) {
    console.log(x)
    var cola = this.physics.add.sprite(x * 6, 0, 'cokecan');
    window.cola = cola
    cola.setBounce(0.5);
    cola.setCollideWorldBounds(true);
    this.colas.push(cola)
  }

}