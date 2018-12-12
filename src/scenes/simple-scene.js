export class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image('cokecan', 'assets/cokecan.png');
  }

  create() {
    this.add.text(100,100,'woo', { fill: '#0f0'});
    this.add.image(100,200, 'cokecan');
  }
}