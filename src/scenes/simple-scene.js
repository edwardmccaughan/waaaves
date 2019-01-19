import { MidiController } from '../midi'
import { RealKeyboard } from '../real_keyboard'
import { note_frequencies } from '../note_frequencies'

export class SimpleScene extends Phaser.Scene {
  preload() {
    console.log(note_frequencies)
  }

  create() {
    this.sin_layers = []
    this.graphics = this.add.graphics()

    new MidiController( (key) => { this.add_sin(key) }, (key) => { this.remove_sin(key)} )
    new RealKeyboard()
  }

  update() {
    this.line_test()
  }

  line_test() {
    var path = new Phaser.Curves.Path(0, 100);
    for(var n = 0; n < window.innerWidth; n++) {
      var real_sin = this.sin_layers.reduce((memo, sin_layer) => memo + Math.sin(sin_layer * n / 400), 0);
      var y =  80 * real_sin + (window.innerHeight / 2)
      //console.log(n, y)
      path.splineTo([n, y]) ;
    }

    this.graphics.clear()

    this.graphics.lineStyle(2, 0x00ffff, 1);
    path.draw(this.graphics);
  }


  add_sin(key) {
    this.sin_layers.push(key) 
  }

  remove_sin(key) {
    // remove from the array, there's probably a more efficient way to do this
    this.sin_layers = this.sin_layers.filter(item => item !== key )
  }

}