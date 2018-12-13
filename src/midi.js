import WebMidi from 'webmidi';
import { Keyboards } from './keyboards'

export class MidiController {
  constructor(key_pressed, key_released) {
    window.webmidi = WebMidi;
    this.key_pressed = key_pressed
    this.key_released = key_released

    WebMidi.enable( (err) => {
      if(err) { console.log(err) }

      this.keyboards = new Keyboards()    
      this.setup_interaction_midi(this.keyboards.vmpk())

      console.log(WebMidi.outputs) 
    })
  }

  setup_interaction_midi(keyboard){
    console.log("setting up midi keyboard for interaction", keyboard, keyboard.name)
    
    keyboard.addListener('noteon', "all", (e) => {
      const key = this.key_to_x(e.data[1])
      console.log("interaction pressed:", e.data[1] )
      this.key_pressed(key)
    });

    keyboard.addListener('noteoff', "all", (e) => {
      const key = this.key_to_x(e.data[1])
      console.log("interaction released:", e.data[1] )
      this.key_released(key)
    });
  }

  key_to_x(key) {
    return key - 21
  }
}