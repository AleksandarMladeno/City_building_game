class SelectMenu {
  constructor(scene, bg_down, bg_up, bg_item, x = 0, y = 0, menuSelected) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.menuSelected = menuSelected;
    this.items = [
      "Great Barrier Island",
      "Omaha Beach",
      "Pupuke",
      "Takapuna",
      "Waiheke Island",
      "Waitemata",
      "Muriwai",
      "Chamberlain Park",
      "Waittakere",
      "Remura",
      "Āwhitu",
      "Clarks Beach",
      "Waiuku",
    ];
    this.selectedText = this.scene.add
      .text(this.x + 20, this.y + 10, this.items[0], {
        fontFamily: "Arial",
        fontSize: 24,
        color: "#9fd771",
      })
      .setDepth(2001);

    // this.item_tiles = [26, 46, 45, 43, 37, 27, 86, 32, 47, 61, 15, 34, 36];

    // Infomations
    const infos = this.scene.add.container(x, y).setAlpha(0).setDepth(2000);

    for (let i = 0; i < this.items.length; i++) {
      const info_item = this.scene.add
        .image(0, i * 45 + 40, bg_item)
        .setOrigin(0, 0)
        .setInteractive({ cursor: "pointer" })
        .setDepth(2000)
        .on("pointerdown", () => {
          this.setText(i);
          infos.setAlpha(0);
          this.menu_down.setAlpha(1);
          this.menu_up.setAlpha(0);

          this.menuSelected(i);
        });

      const info_item_txt = this.scene.add
        .text(20, 10 + i * 45 + 40, this.items[i], {
          fontFamily: "Arial",
          fontSize: 24,
          color: "#123d25",
        })
        .setDepth(2000);

      // const info_item_tile = this.scene.add.text(
      //   310,
      //   10 + i * 50 + 40,
      //   this.item_tiles[i].toString() + " tiles",
      //   {
      //     fontFamily: "Arial",
      //     fontSize: 20,
      //     color: "#9fd771",
      //   }
      // );

      infos.add([info_item, info_item_txt]);
    }

    // Select background
    this.menu_up = this.scene.add
      .image(this.x, this.y, bg_up)
      .setInteractive({ cursor: "pointer" })
      .setOrigin(0, 0)
      .setAlpha(0)
      .setDepth(2000);

    this.menu_down = this.scene.add
      .image(this.x, this.y, bg_down)
      .setInteractive({ cursor: "pointer" })
      .setOrigin(0, 0)
      .setAlpha(1)
      .setDepth(2000);

    this.menu_down.on("pointerdown", () => {
      this.menu_up.setAlpha(1);
      this.menu_down.setAlpha(0);
      infos.setAlpha(1);
    });

    this.menu_up.on("pointerdown", () => {
      this.menu_down.setAlpha(1);
      this.menu_up.setAlpha(0);
      infos.setAlpha(0);
    });

    // TEXT
    this.setText(0);
  }

  setText(index) {
    this.selectedText.setText(this.items[index]);
  }
}

export default SelectMenu;
