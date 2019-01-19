import { MidiController } from '../midi'
import { RealKeyboard } from '../real_keyboard'
import { note_frequencies } from '../note_frequencies'

export class SimpleScene extends Phaser.Scene {
  preload() {
    console.log(note_frequencies)
  }

  create() {
    this.keys_down = []
    this.graphics = this.add.graphics()

    new MidiController( (key) => { this.key_down(key) }, (key) => { this.key_up(key)} )
    new RealKeyboard()
  }

  update() {
    this.line_test()
  }

  line_test() {
    var path = new Phaser.Curves.Path(0, 100);
    for(var x = 0; x < window.innerWidth; x++) {
      var real_sin = this.keys_down.reduce((memo, midi_key) => memo + this.note_amplitude(midi_key, x), 0);
      var y =  80 * real_sin + (window.innerHeight / 2)
      //console.log(n, y)
      path.splineTo([x, y]) ;
    }

    this.graphics.clear()

    this.graphics.lineStyle(2, 0x00ffff, 1);
    path.draw(this.graphics);
  }

  note_amplitude(midi_key, x) {
    return  Math.sin(note_frequencies[midi_key] * x / 600)
  }


  key_down(key) {
    this.keys_down.push(key) 
  }

  key_up(key) {
    // remove from the array, there's probably a more efficient way to do this
    this.keys_down = this.keys_down.filter(item => item !== key )
  }

}