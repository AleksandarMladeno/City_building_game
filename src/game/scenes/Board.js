import Phaser, { Scene } from "phaser";

import ISOMETRIC_GRID from "../../assests/FfT_Grid_L1.png";
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

var position, offsetX, offsetY;

class Board extends Scene {
  constructor(props) {
    super(props);
    this.map = [];
    this.mapIndex = 0;
    this.chevron_down = null;
    this.chevron_up = null;
    this.status = [];
    this.result_text = [];
    this.isResult = false;
    this.isFair = false;
    this.overlayText = null;
    this.isChecronDown = true;
    this.chevron_down_btn = null;
    this.mapItems = [];
    this.tmpItems = [];
  }

  getPosition(row, col) {
    const x =
      FIRSTBUILDINGX + (row - 1) * DELTAXDELTAX + (col - 1) * DELTAYDELTAX;
    const y =
      FIRSTBUILDINGY + (row - 1) * DELTAYDELTAY + (col - 1) * DELTAXDELTAY;

    return { x, y };
  }

  // Check if the position is available position
  positionAvailable(row, col, width, height, status) {
    let flag = 0;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        if (status[row - j][col + i] !== 0) {
          flag = 1;
        }
      }
    }

    if (flag === 0) {
      return true;
    } else {
      return false;
    }
  }

  // Set status
  setStatus(row, col, width, height, index) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        this.status[row - j][col + i] = index;
      }
    }

    this.double2triple(this.status, this.map, this.mapIndex);

    console.log(this.map);
  }

  // Set tmpstatus
  setTmpStatus(row, col, width, height, index, status) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        status[row - j][col + i] = index;
      }
    }
  }

  // Double Array to Triple Array
  double2triple(double, triple, index) {
    for (let i = 0; i < double.length; i++) {
      for (let j = 0; j < double[i].length; j++) {
        triple[index][i][j] = double[i][j];
      }
    }
  }

  // Triple Array to Double Array
  triple2double(triple, index, double) {
    for (let i = 0; i < triple[index].length; i++) {
      for (let j = 0; j < triple[index][i].length; j++) {
        double[i][j] = triple[index][i][j];
      }
    }
  }

  // Double to Double
  mapToOther(original, target) {
    for (let i = 0; i < original.length; i++) {
      for (let j = 0; j < original[i].length; j++) {
        target[i][j] = original[i][j];
      }
    }
  }

  // Menu Selected

  menuSelected = (index) => {
    for (let item of this.mapItems[this.mapIndex]) item.setAlpha(0);
    for (let item of this.mapItems[index]) item.setAlpha(1);
    this.mapIndex = index;

    this.triple2double(this.map, this.mapIndex, this.status);

    for (let i = 0; i < this.tmpItems.length; i++) {
      this.tmpItems[i].setAlpha(0);
    }

    this.tmpItems = [];

    for (let i = 0; i < this.result_text.length; i++) {
      this.result_text[i].setAlpha(0);
    }

    this.isResult = false;
    this.isFair = false;
  };

  // Build the buildings
  initBuildings() {
    this.input.on(
      "dragstart",
      (pointer, gameObject) => {
        gameObject.offsetX =
          pointer.x - gameObject.getWorldTransformMatrix().tx;
        gameObject.offsetY =
          pointer.y - gameObject.getWorldTransformMatrix().ty;
        if (gameObject.isInBox) {
        } else {
          gameObject.initX = gameObject.getWorldTransformMatrix().tx;
          gameObject.initY = gameObject.getWorldTransformMatrix().ty;
          this.setStatus(
            gameObject.initRow,
            gameObject.initCol,
            ...gameObject.tileSize,
            0
          );
        }
      },
      this
    );

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      this.input.mouse.disableContextMenu = true;
      this.game.canvas.style.cursor = "none";
      switch (gameObject.index) {
        case 1:
          gameObject.setTexture("golfcourse_2ha").setDisplaySize(286, 205);
          break;
        case 2:
          gameObject.setTexture("house_1ha");
          break;
        case 3:
          gameObject.setTexture("hospital_4ha").setScale(2.2);
          break;
        case 4:
          gameObject.setTexture("grocerystore_1ha");
          break;
        case 5:
          gameObject.setTexture("school_4ft").setScale(2.2);
          break;
      }
    });

    this.input.on("dragend", (pointer, gameObject) => {
      this.input.mouse.disableContextMenu = false;
      this.game.canvas.style.cursor = "default";

      let diffX = 0;
      let diffY = 0;

      if (gameObject.isInBox) {
        switch (gameObject.index) {
          case 1:
            diffX = 5;
            break;
          case 2:
            diffX = 0;
            break;
          case 3:
            diffX = 95;
            break;
          case 4:
            diffX = -9;
            break;
          case 5:
            diffX = 105;
            break;
        }
      }

      let index = this.getItemIndex(
        pointer.x - gameObject.offsetX - diffX,
        pointer.y - gameObject.offsetY - diffY
      );

      if (gameObject.isInBox) {
        gameObject.x = BUILDINGOFFSET + gameObject.index * BUILDINGSPACING;
        gameObject.y = 190;
        if (index.row === -1 || index.col === -1) {
          switch (gameObject.index) {
            case 1:
              gameObject.setTexture("golfcourse").setDisplaySize(150, 150);
              break;
            case 2:
              gameObject.setTexture("house");
              break;
            case 3:
              gameObject.setTexture("hospital").setScale(1);
              break;
            case 4:
              gameObject.setTexture("grocerystore");
              break;
            case 5:
              gameObject.setTexture("school_4ft").setScale(1);
              break;
          }
          return;
        }
        let item;
        if (gameObject.index === 1) {
          if (this.positionAvailable(index.row, index.col, 2, 1, this.status)) {
            item = this.add
              .image(
                position[index.row][index.col].x + 5,
                position[index.row][index.col].y,
                "golfcourse_2ha"
              )
              .setOrigin(0, 1)
              .setDisplaySize(286, 205)
              .setDepth(index.row * 10 + 10 - index.col);

            gameObject.setTexture("golfcourse").setDisplaySize(150, 150);

            item.setInteractive({ cursor: "pointer" });
            this.input.setDraggable(item);
            this.setStatus(index.row, index.col, 2, 1, 1);
            item.tileSize = [2, 1];
            item.index = gameObject.index;
            item.text = "Golf Course";
          } else {
            gameObject.setTexture("golfcourse").setDisplaySize(150, 150);
            return;
          }
        } else if (gameObject.index === 2) {
          if (this.positionAvailable(index.row, index.col, 1, 1, this.status)) {
            item = this.add
              .image(
                position[index.row][index.col].x,
                position[index.row][index.col].y,
                "house_1ha"
              )
              .setOrigin(0, 1)
              .setDepth(index.row * 10 + 10 - index.col);

            gameObject.setTexture("house");

            item.setInteractive({ cursor: "pointer" });
            this.input.setDraggable(item);
            this.setStatus(index.row, index.col, 1, 1, 2);
            item.tileSize = [1, 1];
            item.index = gameObject.index;
            item.text = "House";
          } else {
            gameObject.setTexture("house");
            return;
          }
        } else if (gameObject.index === 3) {
          if (this.positionAvailable(index.row, index.col, 2, 2, this.status)) {
            item = this.add
              .image(
                position[index.row][index.col].x - 95,
                position[index.row][index.col].y,
                "hospital_4ha"
              )
              .setOrigin(0, 1)
              .setScale(2.2)
              .setDepth(index.row * 10 - index.col);

            gameObject.setTexture("hospital").setScale(1);

            item.setInteractive({ cursor: "pointer" });
            this.input.setDraggable(item);
            this.setStatus(index.row, index.col, 2, 2, 3);
            item.tileSize = [2, 2];
            item.index = gameObject.index;
            item.text = "Hospital";
          } else {
            gameObject.setTexture("hospital").setScale(1);
            return;
          }
        } else if (gameObject.index === 4) {
          if (this.positionAvailable(index.row, index.col, 1, 1, this.status)) {
            item = this.add
              .image(
                position[index.row][index.col].x + 9,
                position[index.row][index.col].y,
                "grocerystore_1ha"
              )
              .setOrigin(0, 1)
              .setDepth(index.row * 10 + 10 - index.col);

            gameObject.setTexture("grocerystore");

            item.setInteractive({ cursor: "pointer" });
            this.input.setDraggable(item);
            this.setStatus(index.row, index.col, 1, 1, 4);
            item.tileSize = [1, 1];
            item.index = gameObject.index;
            item.text = "Grocery Store";
          } else {
            gameObject.setTexture("grocerystore");
            return;
          }
        } else if (gameObject.index === 5) {
          if (this.positionAvailable(index.row, index.col, 2, 2, this.status)) {
            item = this.add
              .image(
                position[index.row][index.col].x - 105,
                position[index.row][index.col].y,
                "school_4ft"
              )
              .setOrigin(0, 1)
              .setScale(2.2)
              .setDepth(index.row * 10 - index.col);

            gameObject.setTexture("school_4ft").setScale(1);

            item.setInteractive({ cursor: "pointer" });
            this.input.setDraggable(item);
            this.setStatus(index.row, index.col, 2, 2, 5);
            item.tileSize = [2, 2];
            item.index = gameObject.index;
            item.text = "School";
          } else {
            gameObject.setTexture("school_4ft").setScale(1);
            return;
          }
        }

        this.mapItems[this.mapIndex].push(item);

        item.on("pointerover", () => {
          item.setAlpha(0.5);
          this.overlayText.setText(item.text);
          switch (item.index) {
            case 1:
              this.overlayText.setPosition(item.x + 90, item.y - 110);
              break;
            case 2:
              this.overlayText.setPosition(item.x + 70, item.y - 90);
              break;
            case 3:
              this.overlayText.setPosition(item.x + 150, item.y - 150);
              break;
            case 4:
              this.overlayText.setPosition(item.x + 30, item.y - 70);
              break;
            case 5:
              this.overlayText.setPosition(item.x + 170, item.y - 150);
              break;
          }
          this.overlayText.setAlpha(2);
        });
        item.on("pointerout", () => {
          item.setAlpha(1);
          this.overlayText.setAlpha(0);
        });
        item.on("dragstart", () => {
          this.overlayText.setAlpha(0);
        });
        item.on("dragend", () => {
          item.setAlpha(1);
        });
        item.initRow = index.row;
        item.initCol = index.col;
        console.log(this.status);
      } else {
        if (
          index.row !== -1 &&
          index.col !== -1 &&
          this.positionAvailable(
            index.row,
            index.col,
            ...gameObject.tileSize,
            this.status
          )
        ) {
          console.log(gameObject.index);
          switch (gameObject.index) {
            case 1:
              gameObject
                .setPosition(
                  position[index.row][index.col].x + 5,
                  position[index.row][index.col].y
                )
                .setDepth(index.row * 10 + 10 - index.col);
              break;
            case 2:
              gameObject
                .setPosition(
                  position[index.row][index.col].x,
                  position[index.row][index.col].y
                )
                .setDepth(index.row * 10 + 10 - index.col);
              break;
            case 3:
              gameObject
                .setPosition(
                  position[index.row][index.col].x - 95,
                  position[index.row][index.col].y
                )
                .setDepth(index.row * 10 - index.col);
              break;
            case 4:
              gameObject
                .setPosition(
                  position[index.row][index.col].x + 9,
                  position[index.row][index.col].y
                )
                .setDepth(index.row * 10 + 10 - index.col);
              break;
            case 5:
              gameObject
                .setPosition(
                  position[index.row][index.col].x - 105,
                  position[index.row][index.col].y
                )
                .setDepth(index.row * 10 - index.col);
              break;
          }
          this.setStatus(
            index.row,
            index.col,
            ...gameObject.tileSize,
            gameObject.index
          );
          gameObject.initRow = index.row;
          gameObject.initCol = index.col;
          console.log("End");
          console.log(this.status);
        } else {
          gameObject.setPosition(gameObject.initX, gameObject.initY);
          this.setStatus(
            gameObject.initRow,
            gameObject.initCol,
            ...gameObject.tileSize,
            gameObject.index
          );
        }
      }
    });

    this.dragdropBuilding(1, "golfcourse");
    this.dragdropBuilding(2, "house");
    this.dragdropBuilding(3, "hospital");
    this.dragdropBuilding(4, "grocerystore");
    this.dragdropBuilding(5, "school");
  }

  // Drag and Drop the buildings
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
    img1.isInBox = true;
    img1.text = "";
    img1.setInteractive({ cursor: "pointer" });

    this.input.setDraggable(img1);

    img1.on("dragstart", () => {
      this.chevron_down.bringToTop(img1);
    });

    img1.on("dragend", () => {
      img1.depth = 0;
    });

    img1.on("pointerover", () => {
      img1.setAlpha(0.5);
    });

    img1.on("pointerout", () => {
      img1.setAlpha(1);
    });

    let subDescription = null;

    if (buildingName === "golfcourse") {
      subDescription = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 80,
          210,
          "Hole of Golf (2ha)",
          {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.chevron_down.add(subDescription);
    }

    if (buildingName === "house") {
      subDescription = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 70,
          210,
          "Housing (1ha)",
          {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.chevron_down.add(subDescription);
    }

    if (buildingName === "hospital") {
      subDescription = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 70,
          210,
          "Hospital (4ha)",
          {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.chevron_down.add(subDescription);
    }

    if (buildingName === "grocerystore") {
      subDescription = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 70,
          210,
          "Grocery Store (1ha)",
          {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.chevron_down.add(subDescription);
    }

    if (buildingName === "school") {
      subDescription = this.add
        .text(
          BUILDINGOFFSET + index * BUILDINGSPACING + 80,
          210,
          "School (4ft)",
          {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#9fd771",
          }
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);
      this.chevron_down.add(subDescription);
    }

    img1.on("pointerover", () => {
      subDescription.setAlpha(1);
    });

    img1.on("pointerout", () => {
      subDescription.setAlpha(0);
    });
  }

  getItemIndex(xPos, yPos) {
    let row = -1;
    let col = -1;

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
    let tp = [],
      tm = [],
      ts = [];
    for (let i = 0; i < 10; i++) {
      let tp1 = [],
        ts1 = [],
        ti1 = [];
      for (let j = 0; j < 10; j++) {
        if (j > MAP[i][0] && j < MAP[i][1] + 2) {
          tp1.push(this.getPosition(i + 1, j - 1));
          ts1.push(0);
        } else {
          tp1.push(null);
          ts1.push(100);
        }
        ti1.push(null);
      }
      tp.push(tp1);
      ts.push(ts1);
    }
    position = tp;
    this.status = ts;

    for (let i = 0; i < 13; i++) {
      let tm1 = [];
      for (let j = 0; j < 10; j++) {
        let tm2 = [];
        for (let k = 0; k < 10; k++) {
          if (k > MAP[j][0] && k < MAP[j][1] + 2) {
            tm2.push(0);
          } else {
            tm2.push(100);
          }
        }
        tm1.push(tm2);
      }
      tm.push(tm1);
      this.mapItems.push([]);
    }
    this.map = tm;
  }
  create() {
    this.input.on(
      "pointermove",
      (pointer) => {
        if (pointer.buttons == 0)
          if (this.isChecronDown) {
            if (pointer.y > DEVICEHEIGHT - 60) {
              this.chevron_down.setAlpha(1);
              this.chevron_up.setAlpha(0);
              this.isChecronDown = !this.isChecronDown;
              this.chevron_down_btn.setAlpha(1);

              this.chevron_down.setPosition(0, DEVICEHEIGHT - 80);
              this.tweens.add({
                targets: this.chevron_down,
                y: DEVICEHEIGHT - 240,
                duration: 1000,
                repeat: 0,
                hold: 0,
                repeatDelay: 0,
                ease: "sine.out",
              });
            }
          } else {
            if (pointer.y < DEVICEHEIGHT - 260) {
              this.isChecronDown = !this.isChecronDown;
              this.chevron_up.setPosition(0, DEVICEHEIGHT - 240);
              // this.chevron_down.setAlpha(0);
              // this.chevron_up.setAlpha(1);
              this.chevron_down_btn.setAlpha(0);

              this.tweens.add({
                targets: [this.chevron_up, this.chevron_down],
                y: DEVICEHEIGHT - 80,
                duration: 1000,
                repeat: 0,
                hold: 0,
                repeatDelay: 0,
                ease: "sine.in",
                alpha: 1,
                onComplete: (tween, targets) => {
                  targets[0].setAlpha(1);
                  targets[1].setAlpha(0);
                },
              });
            }
          }
      },
      this
    );

    this.chevron_down = this.add
      .container(0, DEVICEHEIGHT - 240 + 240)
      .setDepth(122);
    // this.chevron_down.setInteractive({ cursor: "pointer" });
    // this.chevron_down.inputEnabled = true;
    this.chevron_up = this.add.container(0, DEVICEHEIGHT - 80).setDepth(1);
    // this.chevron_up.inputEnabled = true;
    // this.chevron_up.setInteractive({ cursor: "pointer" });
    this.chevron_down.setAlpha(0);
    this.overlayText = this.add.text(0, 0, "", {
      fontFamily: "Arial",
      fontSize: 20,
      color: "#9fd771",
    });
    this.overlayText.setAlpha(1).setDepth(121);
    // Title
    const img = this.add.image(150, 150, "title").setScale(1.5);

    // Menu
    new SelectMenu(
      this,
      "dropdown_down",
      "dropdown_up",
      "dropdown_link",
      (DEVICEWIDTH * 16) / 20 - 30,
      30,
      this.menuSelected
    );
    this.add
      .image((DEVICEWIDTH * 19) / 20, 30, "hamberger_menu")
      .setScale(0.3)
      .setOrigin(0, 0);

    // Overlay
    this.add
      .image(window.innerWidth / 2, window.innerHeight / 2 - 330, "overlay")
      .setScale(3.6, 2.6)
      .setDepth(100);

    //Isometric grid
    this.add
      .image(window.innerWidth / 2, window.innerHeight / 2 - 40, "grid")
      .setOrigin(0.5, 0.5);

    // Chevron Down Container
    // this.chevron_down.on(
    //   "pointerover",
    //   () => {
    //     alert("down");
    //     this.chevron_down.setAlpha(0);
    //     this.chevron_up.setAlpha(1);
    //   },
    //   this
    // );
    // Chevron Down
    this.chevron_down_btn = this.add
      .image(DEVICEWIDTH / 2, 10, "chevron_down")
      .setScale(0.08);
    this.chevron_down_btn.setInteractive({ cursor: "pointer" });

    // chevron_down_btn.on("pointerover", () => {
    //   this.chevron_down.setAlpha(0);
    //   this.chevron_up.setAlpha(1);

    //   this.chevron_up.setPosition(0, DEVICEHEIGHT);
    //   this.tweens.add({
    //     targets: this.chevron_up,
    //     y: DEVICEHEIGHT - 80,
    //     duration: 2000,
    //     repeat: 0,
    //     hold: 0,
    //     repeatDelay: 0,
    //     ease: "sine.in",
    //   });
    // });

    this.chevron_down.add(this.chevron_down_btn);

    //Spacing
    this.chevron_down.add(
      this.add
        .rectangle(0, 20, DEVICEWIDTH, 20, 0x004c23)
        .setOrigin(0, 0)
        .setInteractive({ cursor: "pointer" })
    );

    //Building background
    this.chevron_down.add(
      this.add
        .rectangle(0, 40, DEVICEWIDTH, 200, 0x00210e)
        .setOrigin(0, 0)
        .setInteractive({ cursor: "pointer" })
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

    fairway_btn.addListener("click", () => {
      this.isFair = !this.isFair;

      if (this.isFair) {
        let tmpStatus = [],
          ts = [];

        for (let i = 0; i < 10; i++) {
          let ts1 = [];
          for (let j = 0; j < 10; j++) {
            ts1.push(0);
          }
          ts.push(ts1);
        }

        tmpStatus = ts;

        this.mapToOther(this.status, tmpStatus);

        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            if (tmpStatus[i][j] === 0) {
              if (this.positionAvailable(i, j, 2, 1, tmpStatus)) {
                let item = this.add
                  .image(
                    position[i][j].x + 5,
                    position[i][j].y,
                    "golfcourse_2ha"
                  )
                  .setOrigin(0, 1)
                  .setDisplaySize(286, 205)
                  .setDepth(i * 10 + 10 - j)
                  .setAlpha(1);

                this.tmpItems.push(item);
                this.setTmpStatus(i, j, 2, 1, 1, tmpStatus);
              }
            }
          }
        }
      } else {
        for (let i = 0; i < this.tmpItems.length; i++) {
          this.tmpItems[i].setAlpha(0);
        }

        this.tmpItems = [];
      }
    });

    const result_btn = new Button(
      this,
      "Poll Results",
      (DEVICEWIDTH * 4) / 5 + 240,
      850,
      115,
      40
    );

    let num = [];

    result_btn.addListener("click", () => {
      for (let i = 0; i < 5; i++) {
        num[i] = 0;
      }
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          for (let k = 1; k < 6; k++) {
            if (this.status[i][j] === k) {
              num[k - 1]++;
            }
          }
        }
      }

      let result_txt = [
        "Golf Course: " + num[0] / 2,
        "House: " + num[1],
        "Hospital: " + num[2] / 4,
        "Grocery Store: " + num[3],
        "School: " + num[4] / 4,
      ];
      this.isResult = !this.isResult;

      for (let i = 0; i < 5; i++) {
        this.result_text[i].setText(result_txt[i]).setAlpha(this.isResult);
      }
    });

    for (let i = 0; i < 5; i++) {
      this.result_text[i] = this.add
        .text(30, 370 + i * 30, "", {
          fontFamily: "Arial",
          fontSize: "20px",
          color: "#ffffff",
        })
        .setDepth(121)
        .setAlpha(this.isResult);
    }

    // Chevron Up Container
    // this.chevron_up.on(
    //   "pointerover",
    //   () => {
    //     alert("up");
    //     this.chevron_down.setAlpha(1);
    //     this.chevron_up.setAlpha(0);
    //   },
    //   this
    // );
    // Chevron Up
    let chevron_up_btn = this.add
      .image(DEVICEWIDTH / 2, 10, "chevron_up")
      .setScale(0.08);
    chevron_up_btn.setInteractive({ cursor: "pointer" });

    // chevron_up_btn.on("pointerover", () => {
    //   this.chevron_down.setAlpha(1);
    //   this.chevron_up.setAlpha(0);

    //   this.chevron_down.setPosition(0, DEVICEHEIGHT - 80);
    //   this.tweens.add({
    //     targets: this.chevron_down,
    //     y: DEVICEHEIGHT - 240,
    //     duration: 2000,
    //     repeat: 0,
    //     hold: 0,
    //     repeatDelay: 0,
    //     ease: "sine.out",
    //   });
    // });

    this.chevron_up.add(chevron_up_btn);

    // Spacing 1
    this.chevron_up.add(
      this.add
        .rectangle(0, 20, DEVICEWIDTH, 20, 0x004c23)
        .setOrigin(0, 0)
        .setInteractive({ cursor: "pointer" })
    );

    // Spacing 2
    this.chevron_up.add(
      this.add
        .rectangle(0, 40, DEVICEWIDTH, 240, 0x00140a)
        .setOrigin(0, 0)
        .setInteractive({ cursor: "pointer" })
    );
  }
  update() {}
}

export default Board;
