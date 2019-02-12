export class RealKeyboard {
  constructor(scene_keydown_handler, scene_keyup_handler) {
    this.fullscreen_handler()
    this.switch_page_from_keyboard()
    this.scene_keyup_handler = scene_keyup_handler
    this.scene_keydown_handler = scene_keydown_handler

    this.qwerty_ids = [81,65,90,87,83,88,69,68,67,82,70,86,84,71,66,89,72,78,85,74,77,73,75,188,79,76,190,80,186,191]

    window.addEventListener("keydown", this.downHandler.bind(this), false);
    window.addEventListener("keyup", this.upHandler.bind(this), false);
  }

  switch_page_from_keyboard(){
    window.addEventListener("keydown", (event) => {
      var pages = {
          Digit0: "between_worlds",
          Digit1: "candelabra",
          Digit2: "pixi_radiant",
          Digit3: "so_many_vs",
          Digit4: "voronoi_sparkles",
          Digit5: "walkers",
          Digit6: "waaaaaaves",
          Digit7: "spiralize",
          Digit8: "dots_everywhere"
      }
      var page = pages[event.code]

      if(page) {
        var url = "/" + page
        window.location = url
      }

    }, false);
  }


  fullscreen_handler() {
    window.addEventListener('keypress', (e) => {
      if(e.code == 'Digit9') {
        document.documentElement.webkitRequestFullScreen()
      } else if (e.code == 'Digit0') {
        document.webkitExitFullscreen()
      }
      console.log(e.code);
    });
  }

  key_to_number(event) {
    return  this.qwerty_ids.indexOf(event.keyCode)
  }

  downHandler(event) {
    var key = this.key_to_number(event)
    if(key > -1){
      this.scene_keydown_handler(key)
    }
  };

  upHandler(event) {
    var key = this.key_to_number(event)
    if(key > -1){
      this.scene_keyup_handler(key)
    }
  };
}

