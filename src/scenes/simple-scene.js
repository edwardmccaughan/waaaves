import { MidiController } from '../midi'
import { RealKeyboard } from '../real_keyboard'
import { note_frequencies } from '../note_frequencies'
import { note_names } from '../note_names'
import { Synth } from '../synth'


export class SimpleScene extends Phaser.Scene {
  preload() {}

  create() {
    this.decay_rate = 5
    this.attack_rate = 10
    this.x_scaling = 1200
    this.y_scaling = 70
    this.max_radius = 70
    this.circle_start_offset = 200
    this.line_color = 0x00ffff
    this.fill_color = 0x006a6a;

    this.prefill_note_levels()
    this.graphics = this.add.graphics()

    new MidiController( (key) => { this.key_down(key) }, (key) => { this.key_up(key)} )
    new RealKeyboard( (key) => { this.key_down(key) }, (key) => { this.key_up(key)} )
    this.synth = new Synth(false)
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

      if(this.notes_pressed[key] && this.note_levels[key] < this.max_radius){
        this.note_levels[key] += this.attack_rate
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
    this.path = new Phaser.Curves.Path();
    for(var x = 0; x < window.innerWidth; x++) {
      
      var combined_sin_amplitudes = Object.keys(this.note_levels).reduce((memo, midi_key) => { 
       return  memo + this.note_amplitude(midi_key, x)
      }, 0)

      var y = combined_sin_amplitudes + (window.innerHeight / 2)

      this.path.splineTo([x, y]) ;
    }
  }

  calculate_circle(){
    var circle_points = this.circle_points()
    this.path = new Phaser.Curves.Path(circle_points[0][0],circle_points[0][1]);
    this.circle_points().forEach((point) => { 
      this.path.splineTo([point[0], point[1]]) ;
    })
    // TODO: figure out a better way to make the path close in a pretty way
    this.path.closePath()
  }

  circle_points(){
    var points = []
    // start from 90 degrees, so the gap starts at the bottom
    var start_angle = 90;
    for(var angle = start_angle; angle < start_angle + 360; angle++) {
      var combined_sin_amplitudes = Object.keys(this.note_levels).reduce((memo, midi_key) => { 
       return  memo + this.note_amplitude(midi_key, angle)
      }, 0)

      var point = this.radiant_point(angle, combined_sin_amplitudes) 

      points.push([point.x, point.y]) ;
    }
    return points
  }

  radiant_point(angle, length) {
    var theta = this.toRadians(angle)

    var x_center = window.innerWidth /2;
    var y_center = window.innerHeight /2;
    var x = x_center + (this.circle_start_offset + length) * Math.cos(theta)
    var y = y_center + (this.circle_start_offset + length) * Math.sin(theta)

    return {x: x, y: y}
  }


  toDegrees (angle) {
    return angle * (180 / Math.PI);
  }

  toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  draw_line() {
    this.calculate_circle()
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
    if (!this.notes_pressed[key]) {
      this.notes_pressed[key] = true
      this.synth.key_down(key)
    }   
  }

  key_up(key) {
    this.notes_pressed[key] = false
    this.synth.key_up(key)  
  }
}