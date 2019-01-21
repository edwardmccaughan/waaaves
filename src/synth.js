import { note_names } from './note_names'
window.Tone = require('tone')

export class Synth {
  constructor(playsound) {
    this.playsound = playsound
    this.polySynth = new Tone.PolySynth(88, Tone.AMSynth).toMaster();
  }

  key_down(key) {
    if(!this.playsound) { return }
    this.polySynth.triggerAttack([note_names[key]])
    console.log('playing note:', note_names[key])
  }

  key_up(key) {
    if(!this.playsound) { return }
    this.polySynth.triggerRelease([note_names[key]])
    console.log('stopping note:', note_names[key])
  }
}