import { MidiController } from '../midi'
import { RealKeyboard } from '../real_keyboard'


export class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image('cokecan', 'assets/cokecan.png');
  }

  create() {
    this.colas = []
    this.line_test()
    new MidiController( (key) => { this.add_cola(key) }, (key) => {} )
    new RealKeyboard()
  }

  update() {
    // this.line_test()

  }
  line_test() {
    var path = new Phaser.Curves.Path(0, 100);
    // var sine_points = Array.from({length: 360}, (x,i) => i).map((x) => { return 5 * Math.sin(x) })
    for(var n = 0; n < window.innerWidth; n++) {
      var y =  100 * Math.sin(0.1 * n) + (window.innerHeight / 2)
      console.log(n, y)
      path.splineTo([n, y]) ;
    }
    

    var graphics = this.add.graphics()
    graphics.lineStyle(2, 0x00ffff, 1);

    path.draw(graphics);
  }


  add_cola(x) {
    console.log(x)
    var cola = this.physics.add.sprite(x * 6, 0, 'cokecan');
    window.cola = cola
    cola.setBounce(0.5);
    cola.setCollideWorldBounds(true);
    this.colas.push(cola)
  }

}