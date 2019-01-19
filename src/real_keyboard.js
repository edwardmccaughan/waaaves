export class RealKeyboard {
  constructor() {

    document.addEventListener('keypress', (e) => {
      if(e.code == 'Digit9') {
        document.documentElement.webkitRequestFullScreen()
      } else if (e.code == 'Digit0') {
        document.webkitExitFullscreen()
      }
      console.log(e.code);
    });
  }
}

