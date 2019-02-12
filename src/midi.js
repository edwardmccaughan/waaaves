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
      this.setup_page_switcher_midi(this.keyboards.keystation_mini())

      this.keyboards.everything_but_mini_keyboards().forEach((keyboard) => {
        this.setup_interaction_midi(keyboard)
      })
      // this.setup_interaction_midi(this.keyboards.everything_but_mini_keyboards())
    })
  }

  setup_interaction_midi(keyboard){
    if(!keyboard) {
      console.error('couldnt find interaction keyboard!')
      return
    }

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

  setup_page_switcher_midi(keyboard){
    if(!keyboard) {
      console.error('couldnt find page switcher keyboard!')
      return
    }

    console.log("setting up midi for page switcher", keyboard, keyboard.name)

    keyboard.addListener('noteon', "all", (e) => {
      var key = e.data[1]
      console.log("page switcher pressed:", key )
      this.switch_page(key)
    });
  }

  switch_page(key) {
    var pages = {
        48: "between_worlds",
        50: "candelabra",
        52: "pixi_radiant",
        53: "so_many_vs",
        55: "voronoi_sparkles",
        57: "walkers",
        59: "waaaaaaves",
        60: "spiralize",
        62: "dots_everywhere"
    }

    var page = pages[key]

    if(page) {
      var url = "/" + page
      window.location = url
    }
  }

  key_to_x(key) {
    return key - 21
  }
}