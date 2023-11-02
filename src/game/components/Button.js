import Phaser from "phaser";

class Button {
  constructor(scene, txt, x = 0, y = 0, width = 0, height = 0) {
    this.scene = scene;
    // rect
    this.rect = this.scene.add
      .rectangle(x, y, width, height, 0x002010)
      .setOrigin(0, 0)
      .setInteractive({ cursor: "pointer" });

    //border
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(2, 0x004c23);
    this.graphics.strokeRect(x, y, width, height);

    //text
    this.text = this.scene.add.text(x + 10, y + 9, txt, {
      fontFamily: "Arial",
      fontSize: 18,
      color: "#004c23",
    });

    this.handlers = {
      click: () => {
        console.log("click");
      },
    };
  }

  addListener(action, handler = () => {}) {
    this.handlers[action] = handler;
  }
}

export default Button;
