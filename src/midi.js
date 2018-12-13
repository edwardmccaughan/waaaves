import WebMidi from 'webmidi';
import { Keyboards } from './keyboards'

export class MidiController {
  constructor() {
    window.webmidi = WebMidi;

    WebMidi.enable( (err) => {
      if(err) {
        console.log(err)
      }

      
      const keyboard = new Keyboards().vmpk()

      console.log('keyboard', keyboard)
      keyboard.addListener('noteon', "all", (e) =>  {
        var key = e.data[1]
        console.log("page switcher pressed:", key )
        // switch_page(key)
      });


      console.log(WebMidi.outputs) 
    })
  }
}