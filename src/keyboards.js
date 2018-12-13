import WebMidi from 'webmidi';

export class Keyboards {
  // todo: string include
  constructor() {}
  find_by_name(name) {
    return WebMidi.inputs.filter(function(input){ return input.name == name})
  }

  alessis(){
    return this.find_by_name("Alesis Recital MIDI 1")[0]
  }

  garage_key(){
    return this.find_by_name("GarageKey mini MIDI 1")[0]
  }

  yamaha(){
    return this.find_by_name("Digital Piano MIDI 1")[0]
  }

  vmpk(){
    return this.find_by_name("VMPK Output")[0]
  }

  first(){
    return WebMidi.inputs[1]
  }

  everything_but_garage_key(){
    return WebMidi.inputs.filter(function(input){ return input != keyboards.garage_key()})
  }
}