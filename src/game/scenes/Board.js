import Phaser, { Scene } from "phaser";

import ISOMETRIC_GRID from "../../assests/FfT_Grid_L2.png";
import HOUSING from "../../assests/FfT_Block-Housing.svg";
import HOSPITAL from "../../assests/FfT_Block_Hospital.svg";
import GOLFCOURSE from "../../assests/FfT_Block_GolfCourse.svg";
import CHEVRON_DOWN from "../../assests/FfT_Chevron_Down.svg";
import CHEVRON_UP from "../../assests/FfT_Chevron_Up.svg";
import TITLE from "../../assests/FfT_Title.svg";
import DROPDOWN_DOWN from "../../assests/FfT_UI_Dropdown-Down.svg";
import DROPDOWN_UP from "../../assests/FfT_UI_Dropdown-Up.svg";
import DROPDOWN_LINK from "../../assests/FfT_UI_Dropdown-Link.svg";
import HAMBERGER_MENU from "../../assests/FfT_UI_Hamburger-Menu.svg";
import OVERLAY from "../../assests/FfT_UI_Grid_Gradient_Overlay.svg";

import Button from "../components/Button";
import SelectMenu from "../components/SelectMenu";

const DEVICEHEIGHT = window.innerHeight;
const DEVICEWIDTH = window.innerWidth;

const xspacing = 100;
const yspacing = 54;

const offsetX = 0;
const offsetY = 22;
const firstBuildingX = DEVICEWIDTH / 2;
const firstBuildingY = DEVICEHEIGHT / 2;

const BUILDINGOFFSET = 90;
const BUILDINGSPACING = 200;

class Board extends Scene {
  constructor(props) {
    super(props);
    this.chevron_down = null;
    this.chevron_up = null;
  }

  getPosition(row, col) {
    const xPosition = firstBuildingX + (row + col - 2) * xspacing + offsetX;
    const yPosition = firstBuildingY + (row - col) * yspacing + offsetY;

    return { xPosition, yPosition };
  }

  initBuilding(index) {
    if (index % 3 == 0) this.dragdropBuilding(index, "golfcourse");
    if (index % 3 == 1) this.dragdropBuilding(index, "house");
    if (index % 3 == 2) this.dragdropBuilding(index, "hospital");
  }

  dragdropBuilding(index, buildingName) {
    const img = this.add
      .image(BUILDINGOFFSET + index * BUILDINGSPACING, 190, buildingName)
      .setOrigin(0, 1);
    this.chevron_down.add(img);
    const img1 = this.add
      .image(BUILDINGOFFSET + index * BUILDINGSPACING, 190, buildingName)
      .setOrigin(0, 1);
    this.chevron_down.add(img1);

    img1.setInteractive();
    this.input.setDraggable(img1);

    img1.on("dragstart", () => {
      this.chevron_down.bringToTop(img1);
    });

    img1.on("dragend", () => {
      img1.depth = 0;
    });

    let subDescription = null,
      description = null;
    if (buildingName === "golfcourse") {
      subDescription = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 90,
          200,
          "Hole of Golf (2ha)",
          {
            fontFamily: "Arial",
            fontSize: "12px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5);
      this.chevron_down.add(subDescription);

      description = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 90,
          225,
          "Golf Course",
          {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5);

      this.chevron_down.add(description);
    }

    this.input.on("dragstart", (pointer, gameObject) => {}, this);

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      this.input.mouse.disableContextMenu = true;
      this.game.canvas.style.cursor = "none";
    });

    this.input.on("dragend", (pointer, gameObject) => {
      img1.x = BUILDINGOFFSET + index * BUILDINGSPACING;
      img1.y = 190;

      this.input.mouse.disableContextMenu = false;
      this.game.canvas.style.cursor = "default";
      console.log(gameObject.x + ", " + gameObject.y);
    });
  }

  preload() {
    this.load.image("grid", ISOMETRIC_GRID);
    this.load.image("house", HOUSING);
    this.load.image("hospital", HOSPITAL);
    this.load.image("golfcourse", GOLFCOURSE);
    this.load.image("chevron_down", CHEVRON_DOWN);
    this.load.image("chevron_up", CHEVRON_UP);
    this.load.image("title", TITLE);
    this.load.image("dropdown_down", DROPDOWN_DOWN);
    this.load.image("dropdown_up", DROPDOWN_UP);
    this.load.image("dropdown_link", DROPDOWN_LINK);
    this.load.image("hamberger_menu", HAMBERGER_MENU);
    this.load.image("overlay", OVERLAY);
    // this.load.text("myFont", "../../assets/PPMori-Book.ttf");
  }
  init() {}
  create() {
    this.chevron_down = this.add.container(0, DEVICEHEIGHT - 240).setDepth(1);
    this.chevron_up = this.add.container(0, DEVICEHEIGHT - 80).setDepth(1);
    this.chevron_down.setAlpha(0);

    // Title
    const img = this.add.image(150, 150, "title").setScale(1.5);

    // Menu
    new SelectMenu(
      this,
      "dropdown_down",
      "dropdown_up",
      "dropdown_link",
      (DEVICEWIDTH * 16) / 20 - 30,
      30
    );
    this.add
      .image((DEVICEWIDTH * 19) / 20, 30, "hamberger_menu")
      .setScale(0.3)
      .setOrigin(0, 0);

    // Overlay
    this.add
      .image(window.innerWidth / 2, window.innerHeight / 2 - 300, "overlay")
      .setScale(4, 2)
      .setDepth(1);

    //Isometric grid
    this.add
      .image(window.innerWidth / 2, window.innerHeight / 2 - 40, "grid")
      .setOrigin(0.5, 0.5);

    this.add
      .image(
        this.getPosition(1, 2).xPosition,
        this.getPosition(1, 2).yPosition,
        "house"
      )
      .setOrigin(0, 1)
      .setScale(1.3);

    this.add
      .image(
        this.getPosition(1, 1).xPosition,
        this.getPosition(1, 1).yPosition,
        "golfcourse"
      )
      .setOrigin(0, 1);

    this.add
      .image(
        this.getPosition(2, 0).xPosition,
        this.getPosition(2, 0).yPosition,
        "hospital"
      )
      .setOrigin(0, 1);

    // Chevron Down Container
    // Chevron Down
    let chevron_down_btn = this.add
      .image(DEVICEWIDTH / 2, 10, "chevron_down")
      .setScale(0.08);
    chevron_down_btn.setInteractive({ cursor: "pointer" });

    chevron_down_btn.on("pointerup", () => {
      this.chevron_down.setAlpha(0);
      this.chevron_up.setAlpha(1);
    });

    this.chevron_down.add(chevron_down_btn);

    //Spacing
    this.chevron_down.add(
      this.add.rectangle(0, 20, DEVICEWIDTH, 20, 0x004c23).setOrigin(0, 0)
    );

    //Building background
    this.chevron_down.add(
      this.add.rectangle(0, 40, DEVICEWIDTH, 200, 0x00210e).setOrigin(0, 0)
    );

    // Building items
    for (var i = 0; i < 9; i++) {
      this.initBuilding(i);
    }

    //Add Buttons
    const fairway_btn = new Button(
      this,
      "Tāmaki’s Fairways Now",
      (DEVICEWIDTH * 4) / 5,
      850,
      210,
      40
    );

    const result_btn = new Button(
      this,
      "Poll Results",
      (DEVICEWIDTH * 4) / 5 + 240,
      850,
      115,
      40
    );

    // Chevron Up Containre
    // Chevron Up
    let chevron_up_btn = this.add
      .image(DEVICEWIDTH / 2, 10, "chevron_up")
      .setScale(0.08);
    chevron_up_btn.setInteractive({ cursor: "pointer" });

    chevron_up_btn.on("pointerup", () => {
      this.chevron_down.setAlpha(1);
      this.chevron_up.setAlpha(0);
    });

    this.chevron_up.add(chevron_up_btn);

    // Spacing 1
    this.chevron_up.add(
      this.add.rectangle(0, 20, DEVICEWIDTH, 20, 0x004c23).setOrigin(0, 0)
    );

    // Spacing 2
    this.chevron_up.add(
      this.add.rectangle(0, 40, DEVICEWIDTH, 40, 0x00140a).setOrigin(0, 0)
    );
  }
  update() {}
}

export default Board;
