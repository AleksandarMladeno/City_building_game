import Phaser, { Scene } from "phaser";

import ISOMETRIC_GRID from "../../assests/FfT_Grid_L2.png";
import HOUSING_1HA from "../../assests/Buildings/FfT_Housing_1ha.svg";
import GOLFCOURSE_2HA from "../../assests/Buildings/FfT_GolfCourse_2ha.svg";
import GROCERYSTORE_1HA from "../../assests/Buildings/FfT_Groceries_1ha.svg";
import HOSPITAL_4HA from "../../assests/Buildings/FfT_Hospital_4ha.svg";
import SCHOOL_4FT from "../../assests/Buildings/FfT_School_4ft.svg";
import HOUSING from "../../assests/FfT_Housing_1ha.svg";
import HOSPITAL from "../../assests/FfT_Hospital_4ha.svg";
import GOLFCOURSE from "../../assests/FfT_GolfCourse_2ha.svg";
import GROCERYSTORE from "../../assests/FfT_GroceryStore_1ha.svg";
import SCHOOL from "../../assests/FfT_School_icon.svg";
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

const FIRSTBUILDINGX = 163;
const FIRSTBUILDINGY = 463;

const DELTAXDELTAX = 100;
const DELTAXDELTAY = -58;
const DELTAYDELTAX = 100;
const DELTAYDELTAY = 58;

const BUILDINGOFFSET = 200;
const BUILDINGSPACING = 230;

const MAXDISTANCE = Math.sqrt(100 * 100 + 58 * 58);

const MAP = [
  [1, 4],
  [0, 5],
  [-1, 6],
  [-1, 7],
  [0, 7],
  [1, 8],
  [2, 8],
  [3, 8],
  [4, 7],
  [5, 6],
];

let position, offsetX, offsetY;

class Board extends Scene {
  constructor(props) {
    super(props);
    this.chevron_down = null;
    this.chevron_up = null;
  }

  getPosition(row, col) {
    const x =
      FIRSTBUILDINGX + (row - 1) * DELTAXDELTAX + (col - 1) * DELTAYDELTAX;
    const y =
      FIRSTBUILDINGY + (row - 1) * DELTAYDELTAY + (col - 1) * DELTAXDELTAY;

    return { x, y };
  }

  initBuildings() {
    this.input.on(
      "dragstart",
      (pointer, gameObject) => {
        gameObject.offsetX =
          pointer.x - gameObject.getWorldTransformMatrix().tx;
        gameObject.offsetY =
          pointer.y - gameObject.getWorldTransformMatrix().ty;
      },
      this
    );

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      this.input.mouse.disableContextMenu = true;
      this.game.canvas.style.cursor = "none";
    });

    this.input.on("dragend", (pointer, gameObject) => {
      gameObject.x = BUILDINGOFFSET + gameObject.index * BUILDINGSPACING;
      gameObject.y = 190;

      this.input.mouse.disableContextMenu = false;
      this.game.canvas.style.cursor = "default";

      let index = this.getItemIndex(
        pointer.x - gameObject.offsetX,
        pointer.y - gameObject.offsetY
      );

      let item;
      if (gameObject.index === 1) {
        item = this.add
          .image(
            position[index.row][index.col].x + 5,
            position[index.row][index.col].y,
            "golfcourse_2ha"
          )
          .setOrigin(0, 1)
          .setDisplaySize(286, 205)
          .setDepth(index.row * 10 + 10 - index.col);
      } else if (gameObject.index === 2) {
        item = this.add
          .image(
            position[index.row][index.col].x,
            position[index.row][index.col].y,
            "house_1ha"
          )
          .setOrigin(0, 1)
          .setDepth(index.row * 10 + 10 - index.col);
      } else if (gameObject.index === 3) {
        item = this.add
          .image(
            position[index.row][index.col].x - 95,
            position[index.row][index.col].y,
            "hospital_4ha"
          )
          .setOrigin(0, 1)
          .setScale(2.2)
          .setDepth(index.row * 10 + 10 - index.col);
      } else if (gameObject.index === 4) {
        item = this.add
          .image(
            position[index.row][index.col].x + 9,
            position[index.row][index.col].y,
            "grocerystore_1ha"
          )
          .setOrigin(0, 1)
          .setDepth(index.row * 10 + 10 - index.col);
      } else {
        item = this.add
          .image(
            position[index.row][index.col].x - 105,
            position[index.row][index.col].y,
            "school_4ft"
          )
          .setOrigin(0, 1)
          .setScale(2.2)
          .setDepth(index.row * 10 + 10 - index.col);
      }

      item.setInteractive();
      this.input.setDraggable(item);
    });
    this.dragdropBuilding(1, "golfcourse");
    this.dragdropBuilding(2, "house");
    this.dragdropBuilding(3, "hospital");
    this.dragdropBuilding(4, "grocerystore");
    this.dragdropBuilding(5, "school");
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

    img1.index = index;

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
          BUILDINGOFFSET + index * BUILDINGSPACING + 80,
          200,
          "Hole of Golf (2ha)",
          {
            fontFamily: "Arial",
            fontSize: "12px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.chevron_down.add(subDescription);

      description = this.add
        .text(BUILDINGOFFSET + index * BUILDINGSPACING + 80, 225, "Golf", {
          fontFamily: "Arial",
          fontSize: "20px",
          color: "#9fd771",
        })
        .setOrigin(0.5, 0.5)
        .setAlpha(0);

      this.chevron_down.add(description);
    }

    if (buildingName === "house") {
      subDescription = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 70,
          200,
          "Housing (1ha)",
          {
            fontFamily: "Arial",
            fontSize: "12px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.chevron_down.add(subDescription);

      description = this.add
        .text(BUILDINGOFFSET + index * BUILDINGSPACING + 70, 225, "Housing", {
          fontFamily: "Arial",
          fontSize: "20px",
          color: "#9fd771",
        })
        .setOrigin(0.5, 0.5)
        .setAlpha(0);

      this.chevron_down.add(description);
    }

    if (buildingName === "hospital") {
      subDescription = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 70,
          200,
          "Hospital (4ha)",
          {
            fontFamily: "Arial",
            fontSize: "12px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.chevron_down.add(subDescription);

      description = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 70,
          225,
          "Public Service",
          {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);

      this.chevron_down.add(description);
    }

    if (buildingName === "grocerystore") {
      subDescription = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 70,
          200,
          "Grocery Store (1ha)",
          {
            fontFamily: "Arial",
            fontSize: "12px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.chevron_down.add(subDescription);

      description = this.add
        .text(BUILDINGOFFSET + index * BUILDINGSPACING + 70, 225, "Shopping", {
          fontFamily: "Arial",
          fontSize: "20px",
          color: "#9fd771",
        })
        .setOrigin(0.5, 0.5)
        .setAlpha(0);

      this.chevron_down.add(description);
    }

    if (buildingName === "school") {
      subDescription = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 80,
          200,
          "School (4ft)",
          {
            fontFamily: "Arial",
            fontSize: "12px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.chevron_down.add(subDescription);

      description = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 80,
          225,
          "Public Service",
          {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);

      this.chevron_down.add(description);
    }

    img1.on("pointerover", () => {
      description.setAlpha(1);
      subDescription.setAlpha(1);
    });

    img1.on("pointerout", () => {
      description.setAlpha(0);
      subDescription.setAlpha(0);
    });
  }

  getItemIndex(xPos, yPos) {
    let row = -1;
    let col = -1;

    console.log(xPos, yPos);

    var min = Math.sqrt(
      (position[0][2].x - xPos) * (position[0][2].x - xPos) +
        (position[0][2].y - yPos) * (position[0][2].y - yPos)
    );
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (position[i][j] === null) continue;

        var temp = Math.sqrt(
          (position[i][j].x - xPos) * (position[i][j].x - xPos) +
            (position[i][j].y - yPos) * (position[i][j].y - yPos)
        );

        if (temp > MAXDISTANCE) continue;

        if (temp < min) {
          min = temp;
          row = i;
          col = j;
        }
      }
    }

    return { row, col };
  }

  preload() {
    this.load.image("grid", ISOMETRIC_GRID);
    this.load.svg("house_1ha", HOUSING_1HA);
    this.load.svg("golfcourse_2ha", GOLFCOURSE_2HA);
    this.load.image("grocerystore_1ha", GROCERYSTORE_1HA);
    this.load.image("hospital_4ha", HOSPITAL_4HA);
    this.load.image("school_4ft", SCHOOL_4FT);
    this.load.image("house", HOUSING);
    this.load.image("hospital", HOSPITAL);
    this.load.image("golfcourse", GOLFCOURSE);
    this.load.image("grocerystore", GROCERYSTORE);
    this.load.image("chevron_down", CHEVRON_DOWN);
    this.load.image("chevron_up", CHEVRON_UP);
    this.load.image("title", TITLE);
    this.load.image("dropdown_down", DROPDOWN_DOWN);
    this.load.image("dropdown_up", DROPDOWN_UP);
    this.load.image("dropdown_link", DROPDOWN_LINK);
    this.load.image("hamberger_menu", HAMBERGER_MENU);
    this.load.image("overlay", OVERLAY);
    this.load.image("school", SCHOOL);
    // this.load.text("myFont", "../../assets/PPMori-Book.ttf");
  }
  init() {
    let t = [];
    for (let i = 0; i < 10; i++) {
      let t1 = [];
      for (let j = 0; j < 10; j++) {
        if (j > MAP[i][0] && j < MAP[i][1] + 2) {
          t1.push(this.getPosition(i + 1, j - 1));
        } else {
          t1.push(null);
        }
      }
      t.push(t1);
    }
    position = t;

    console.log(position);
  }
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

    // this.add
    //   .image(
    //     this.getPosition(1, 2).xPosition,
    //     this.getPosition(1, 2).yPosition,
    //     "house"
    //   )
    //   .setOrigin(0, 1);

    // this.add
    //   .image(
    //     this.getPosition(2, 0).xPosition,
    //     this.getPosition(2, 0).yPosition,
    //     "hospital"
    //   )
    //   .setOrigin(0, 1);

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
    this.initBuildings();

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
