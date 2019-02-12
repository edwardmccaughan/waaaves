import WebMidi from 'webmidi';

export class Keyboards {
  // todo: string include
  constructor() {}
  find_by_name(name) {
    return WebMidi.inputs.filter((input) =>{ return input.name.includes(name)})
  }

  alessis(){
    return this.find_by_name("Alesis Recital")[0]
  }

  garage_key(){
    return this.find_by_name("GarageKey mini")[0]
  }

  keystation_mini(){
    return this.find_by_name("Keystation Mini 32")[0]
  }

  yamaha(){
    return this.find_by_name("Digital Piano")[0]
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

  everything_but_mini_keyboards(){
    return WebMidi.inputs.filter((input) => {
      return ![this.garage_key(), this.keystation_mini()].includes(input)
    })
  }
}