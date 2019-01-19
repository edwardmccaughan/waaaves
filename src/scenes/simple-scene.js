import { MidiController } from '../midi'
import { RealKeyboard } from '../real_keyboard'
import { note_frequencies } from '../note_frequencies'

export class SimpleScene extends Phaser.Scene {
  preload() {}

  create() {
    this.decay_rate = 5
    this.x_scaling = 1200
    this.y_scaling = 100
    this.line_color = 0x00ffff

    this.prefill_note_levels()
    this.graphics = this.add.graphics()

    new MidiController( (key) => { this.key_down(key) }, (key) => { this.key_up(key)} )
    new RealKeyboard( (key) => { this.key_down(key) }, (key) => { this.key_up(key)} )
  }

  update() {
    this.decay_note_levels()
    this.draw_line()
  }

  decay_note_levels(){
    Object.keys(this.note_levels).forEach((key) => { 
      if(this.note_levels[key] > 0 && !this.notes_pressed[key]){
        this.note_levels[key] -= this.decay_rate
      }
    })
  }

  prefill_note_levels() {
    this.note_levels = {}
    this.notes_pressed = {}
    for(var x = 0; x < note_frequencies.length; x++) {
      this.note_levels[x] = 0
      this.notes_pressed[x] = false
    }
  } 


  calculate_line() {
    this.path = new Phaser.Curves.Path(0, window.innerHeight / 2);
    for(var x = 0; x < window.innerWidth; x++) {
      
      var real_sin = Object.keys(this.note_levels).reduce((memo, midi_key) => { 
       return  memo + this.note_amplitude(midi_key, x)
      }, 0)

      var y = real_sin + (window.innerHeight / 2)

      this.path.splineTo([x, y]) ;
    }
  }

  draw_line() {
    this.calculate_line()
    this.graphics.clear()

    this.graphics.lineStyle(2, this.line_color, 1);
    this.path.draw(this.graphics);
  }

  note_amplitude(midi_key, x) {
    var raw_amplitude =  Math.sin(note_frequencies[midi_key] * x / this.x_scaling)
    var scaled_amplitude = raw_amplitude * this.note_levels[midi_key]
    return scaled_amplitude
  }


  key_down(key) {
    this.notes_pressed[key] = true
    this.note_levels[key] = this.y_scaling
  }

  key_up(key) {
    this.notes_pressed[key] = false
  }

}