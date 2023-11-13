import Phaser, { Scene } from "phaser";

import ISOMETRIC_GRID from "../../assests/FfT_Grid_L2.png";
import GREATBARRIER from "../../assests/GolfCourse_Maps/FfT_01-GreatBarrier_26tiles_L1.png";
import OMAHABEACH from "../../assests/GolfCourse_Maps/FfT_02_OmahaBeach_46tiles_L1.png";
import PUPUKE from "../../assests/GolfCourse_Maps/FfT_03_Pupuke_45tiles_L1.png";
import TAKAPUNA from "../../assests/GolfCourse_Maps/FfT_04_Takapuna_43tiles_L1.png";
import WAIHEKEISLAND from "../../assests/GolfCourse_Maps/FfT_05_WaihekeIsland_37tiles_L1.png";
import WAITEMATA from "../../assests/GolfCourse_Maps/FfT_06-Waitemata_27tiles_L1.png";
import MURIWAI from "../../assests/GolfCourse_Maps/FfT_07_Muriwai_86tiles_L1.png";
import CHAMBERLAINPARK from "../../assests/GolfCourse_Maps/FfT_08_ChamberlainPark_32tiles_L1.png";
import WAITTAKERE from "../../assests/GolfCourse_Maps/FfT_09_Waitakere_47tiles_L1.png";
import REMUERA from "../../assests/GolfCourse_Maps/FfT_10_Remuera_61tiles_L1.png";
import AWHITU from "../../assests/GolfCourse_Maps/FfT_11_Awhitu_15tiles_L1.png";
import CLARKSBEACH from "../../assests/GolfCourse_Maps/FfT_12_ClarksBeach_34tiles_L1.png";
import WAIUKU from "../../assests/GolfCourse_Maps/FfT_13_Waiuku_36tiles_L1.png";
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

const FIRSTBUILDING = [
  { x: 264, y: 533 },
  { x: 163, y: 516 },
  { x: 163, y: 516 },
  { x: 163, y: 516 },
  { x: 164, y: 465 },
  { x: 264, y: 513 },
  { x: -236, y: 567 },
  { x: 264, y: 533 },
  { x: 164, y: 545 },
  { x: -38, y: 554 },
  { x: 465, y: 493 },
  { x: 264, y: 533 },
  { x: 164, y: 475 },
];

const DELTAXDELTAX = 100;
const DELTAXDELTAY = -58;
const DELTAYDELTAX = 100;
const DELTAYDELTAY = 58;

const BUILDINGOFFSET = 200;
const BUILDINGSPACING = 230;

const MAXDISTANCE = Math.sqrt(100 * 100 + 58 * 58);

const ISOMETRIC_GRID_LOCATION = [
  140, 100, 100, 100, 150, 160, 50, 140, 70, 60, 180, 140, 140,
];

const ISOMETRIC_GRID_NAME = [
  "greatbarrier",
  "omahabeach",
  "pupuke",
  "takapuna",
  "waihekeisland",
  "waitemata",
  "muriwai",
  "chamberlainpark",
  "waittakere",
  "remuera",
  "awhitu",
  "clarksbeach",
  "waiuku",
];

const MAPROW = [7, 8, 8, 8, 8, 7, 12, 7, 8, 10, 5, 7, 8];

const MAP = [
  [
    [4, 4],
    [2, 6],
    [1, 6],
    [2, 7],
    [3, 6],
    [1, 8],
    [4, 6],
    [5, 5],
  ],
  [
    [2, 5],
    [1, 6],
    [1, 7],
    [1, 7],
    [2, 8],
    [3, 8],
    [4, 8],
    [5, 7],
  ],
  [
    [2, 5],
    [1, 6],
    [1, 7],
    [1, 7],
    [2, 8],
    [3, 8],
    [4, 8],
    [5, 7],
  ],
  [
    [2, 4],
    [1, 6],
    [1, 6],
    [1, 7],
    [2, 8],
    [3, 8],
    [4, 8],
    [5, 7],
  ],
  [
    [2, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [2, 7],
    [3, 8],
    [4, 8],
    [5, 7],
  ],
  [
    [3, 4],
    [2, 5],
    [1, 6],
    [2, 7],
    [3, 7],
    [4, 6],
    [5, 5],
  ],
  [
    [4, 6],
    [3, 8],
    [2, 9],
    [1, 10],
    [1, 11],
    [2, 11],
    [3, 12],
    [4, 12],
    [5, 11],
    [6, 11],
    [7, 10],
    [8, 9],
  ],
  [
    [2, 4],
    [1, 6],
    [1, 6],
    [2, 7],
    [3, 7],
    [4, 7],
    [5, 6],
  ],
  [
    [3, 5],
    [1, 7],
    [1, 7],
    [1, 8],
    [2, 8],
    [3, 8],
    [4, 7],
    [5, 7],
  ],
  [
    [3, 5],
    [2, 7],
    [1, 8],
    [1, 9],
    [2, 9],
    [3, 10],
    [4, 10],
    [5, 10],
    [6, 9],
    [7, 8],
  ],
  [
    [2, 2],
    [1, 4],
    [1, 4],
    [2, 5],
    [3, 4],
  ],
  [
    [2, 5],
    [1, 6],
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
    [5, 6],
  ],
  [
    [3, 3],
    [2, 5],
    [1, 6],
    [1, 7],
    [2, 7],
    [3, 8],
    [4, 7],
    [5, 6],
  ],
];

var position, offsetX, offsetY;

class Board extends Scene {
  constructor(props) {
    super(props);
    this.grid = [];
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

  getPosition(index, row, col) {
    const x =
      FIRSTBUILDING[index].x +
      (row - 1) * DELTAXDELTAX +
      (col - 1) * DELTAYDELTAX;
    const y =
      FIRSTBUILDING[index].y +
      (row - 1) * DELTAYDELTAY +
      (col - 1) * DELTAXDELTAY;

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
  triple2double(triple, index) {
    let td = [];
    for (let i = 0; i < triple[index].length; i++) {
      let td1 = [];
      for (let j = 0; j < triple[index][i].length; j++) {
        td1.push(0);
      }
      td.push(td1);
    }

    for (let i = 0; i < triple[index].length; i++) {
      for (let j = 0; j < triple[index][i].length; j++) {
        td[i][j] = triple[index][i][j];
      }
    }

    return td;
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
    for (let item of this.mapItems[this.mapIndex])
      if (item !== null) item.setAlpha(0);
    for (let item of this.mapItems[index]) if (item !== null) item.setAlpha(1);
    this.grid[this.mapIndex].setAlpha(0);
    this.grid[index].setAlpha(1);
    this.mapIndex = index;

    this.status = this.triple2double(this.map, this.mapIndex);

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
                position[this.mapIndex][index.row][index.col].x + 5,
                position[this.mapIndex][index.row][index.col].y,
                "golfcourse_2ha"
              )
              .setOrigin(0, 1)
              .setDisplaySize(286, 205)
              .setDepth(
                index.row * MAPROW[this.mapIndex] +
                  MAPROW[this.mapIndex] -
                  index.col
              );

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
                position[this.mapIndex][index.row][index.col].x,
                position[this.mapIndex][index.row][index.col].y,
                "house_1ha"
              )
              .setOrigin(0, 1)
              .setDepth(
                index.row * MAPROW[this.mapIndex] +
                  MAPROW[this.mapIndex] -
                  index.col
              );

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
                position[this.mapIndex][index.row][index.col].x - 95,
                position[this.mapIndex][index.row][index.col].y,
                "hospital_4ha"
              )
              .setOrigin(0, 1)
              .setScale(2.2)
              .setDepth(index.row * MAPROW[this.mapIndex] - index.col);

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
                position[this.mapIndex][index.row][index.col].x + 9,
                position[this.mapIndex][index.row][index.col].y,
                "grocerystore_1ha"
              )
              .setOrigin(0, 1)
              .setDepth(
                index.row * MAPROW[this.mapIndex] +
                  MAPROW[this.mapIndex] -
                  index.col
              );

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
                position[this.mapIndex][index.row][index.col].x - 105,
                position[this.mapIndex][index.row][index.col].y,
                "school_4ft"
              )
              .setOrigin(0, 1)
              .setScale(2.2)
              .setDepth(index.row * MAPROW[this.mapIndex] - index.col);

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
                  position[this.mapIndex][index.row][index.col].x + 5,
                  position[this.mapIndex][index.row][index.col].y
                )
                .setDepth(
                  index.row * MAPROW[this.mapIndex] +
                    MAPROW[this.mapIndex] -
                    index.col
                );
              break;
            case 2:
              gameObject
                .setPosition(
                  position[this.mapIndex][index.row][index.col].x,
                  position[this.mapIndex][index.row][index.col].y
                )
                .setDepth(
                  index.row * MAPROW[this.mapIndex] +
                    MAPROW[this.mapIndex] -
                    index.col
                );
              break;
            case 3:
              gameObject
                .setPosition(
                  position[this.mapIndex][index.row][index.col].x - 95,
                  position[this.mapIndex][index.row][index.col].y
                )
                .setDepth(index.row * MAPROW[this.mapIndex] - index.col);
              break;
            case 4:
              gameObject
                .setPosition(
                  position[this.mapIndex][index.row][index.col].x + 9,
                  position[this.mapIndex][index.row][index.col].y
                )
                .setDepth(
                  index.row * MAPROW[this.mapIndex] +
                    MAPROW[this.mapIndex] -
                    index.col
                );
              break;
            case 5:
              gameObject
                .setPosition(
                  position[this.mapIndex][index.row][index.col].x - 105,
                  position[this.mapIndex][index.row][index.col].y
                )
                .setDepth(index.row * MAPROW[this.mapIndex] - index.col);
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

    switch (img1.index) {
      case 1:
        img1.text = "Golf Course";
        break;
      case 2:
        img1.text = "House";
        break;
      case 3:
        img1.text = "Hospital";
        break;
      case 4:
        img1.text = "Grocery Store";
        break;
      case 5:
        img1.text = "School";
        break;
    }

    this.input.setDraggable(img1);

    img1.on("dragstart", () => {
      this.chevron_down.bringToTop(img1);
      this.overlayText.setAlpha(0);
    });

    img1.on("dragend", () => {
      img1.depth = 0;
    });

    img1.on("pointerover", () => {
      img1.setAlpha(0.3);
      img.setAlpha(0.3);

      this.overlayText.setText(img1.text);
      switch (img1.index) {
        case 1:
          this.overlayText.setPosition(img1.x + 30, img1.y - 70);
          break;
        case 2:
          this.overlayText.setPosition(img1.x + 40, img1.y - 70);
          break;
        case 3:
          this.overlayText.setPosition(img1.x + 40, img1.y - 70);
          break;
        case 4:
          this.overlayText.setPosition(img1.x + 5, img1.y - 70);
          break;
        case 5:
          this.overlayText.setPosition(img1.x + 70, img1.y - 70);
          break;
      }
      this.overlayText.setAlpha(2);
    });

    img1.on("pointerout", () => {
      img1.setAlpha(1);
      img.setAlpha(1);
    });

    // let subDescription = null;

    // if (buildingName === "golfcourse") {
    //   subDescription = this.add
    //     .text(
    //       BUILDINGOFFSET + index * BUILDINGSPACING + 80,
    //       210,
    //       "Hole of Golf (2ha)",
    //       {
    //         fontFamily: "Arial",
    //         fontSize: "16px",
    //         color: "#9fd771",
    //       }
    //     )
    //     .setOrigin(0.5, 0.5)
    //     .setAlpha(0);
    //   this.chevron_down.add(subDescription);
    // }

    // if (buildingName === "house") {
    //   subDescription = this.add
    //     .text(
    //       BUILDINGOFFSET + index * BUILDINGSPACING + 70,
    //       210,
    //       "Housing (1ha)",
    //       {
    //         fontFamily: "Arial",
    //         fontSize: "16px",
    //         color: "#9fd771",
    //       }
    //     )
    //     .setOrigin(0.5, 0.5)
    //     .setAlpha(0);
    //   this.chevron_down.add(subDescription);
    // }

    // if (buildingName === "hospital") {
    //   subDescription = this.add
    //     .text(
    //       BUILDINGOFFSET + index * BUILDINGSPACING + 70,
    //       210,
    //       "Hospital (4ha)",
    //       {
    //         fontFamily: "Arial",
    //         fontSize: "16px",
    //         color: "#9fd771",
    //       }
    //     )
    //     .setOrigin(0.5, 0.5)
    //     .setAlpha(0);
    //   this.chevron_down.add(subDescription);
    // }

    // if (buildingName === "grocerystore") {
    //   subDescription = this.add
    //     .text(
    //       BUILDINGOFFSET + index * BUILDINGSPACING + 70,
    //       210,
    //       "Grocery Store (1ha)",
    //       {
    //         fontFamily: "Arial",
    //         fontSize: "16px",
    //         color: "#9fd771",
    //       }
    //     )
    //     .setOrigin(0.5, 0.5)
    //     .setAlpha(0);
    //   this.chevron_down.add(subDescription);
    // }

    // if (buildingName === "school") {
    //   subDescription = this.add
    //     .text(
    //       BUILDINGOFFSET + index * BUILDINGSPACING + 80,
    //       210,
    //       "School (4ft)",
    //       {
    //         fontFamily: "Arial",
    //         fontSize: "16px",
    //         color: "#9fd771",
    //       }
    //     )
    //     .setOrigin(0.5, 0.5)
    //     .setAlpha(0);
    //   this.chevron_down.add(subDescription);
    // }

    // img1.on("pointerover", () => {
    //   subDescription.setAlpha(1);
    // });

    // img1.on("pointerout", () => {
    //   subDescription.setAlpha(0);
    // });
  }

  getItemIndex(xPos, yPos) {
    let row = -1;
    let col = -1;

    var min = 10000;
    for (let i = 0; i < MAPROW[this.mapIndex]; i++) {
      for (let j = 0; j < MAPROW[this.mapIndex]; j++) {
        if (position[this.mapIndex][i][j] === null) continue;

        var temp = Math.sqrt(
          (position[this.mapIndex][i][j].x - xPos) *
            (position[this.mapIndex][i][j].x - xPos) +
            (position[this.mapIndex][i][j].y - yPos) *
              (position[this.mapIndex][i][j].y - yPos)
        );

        if (temp > MAXDISTANCE) continue;

        if (temp < min) {
          min = temp;
          row = i;
          col = j;
        }
      }
    }
    console.log("ROW & COL");
    console.log(row, col);
    return { row, col };
  }

  preload() {
    this.load.image("grid", ISOMETRIC_GRID);
    this.load.image("greatbarrier", GREATBARRIER);
    this.load.image("omahabeach", OMAHABEACH);
    this.load.image("pupuke", PUPUKE);
    this.load.image("takapuna", TAKAPUNA);
    this.load.image("waihekeisland", WAIHEKEISLAND);
    this.load.image("waitemata", WAITEMATA);
    this.load.image("muriwai", MURIWAI);
    this.load.image("chamberlainpark", CHAMBERLAINPARK);
    this.load.image("waittakere", WAITTAKERE);
    this.load.image("remuera", REMUERA);
    this.load.image("awhitu", AWHITU);
    this.load.image("clarksbeach", CLARKSBEACH);
    this.load.image("waiuku", WAIUKU);
    this.load.image("house_1ha", HOUSING_1HA);
    this.load.image("golfcourse_2ha", GOLFCOURSE_2HA);
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
    let ts = [];
    for (let i = 0; i < MAPROW[this.mapIndex]; i++) {
      let ts1 = [];
      for (let j = 0; j < MAPROW[this.mapIndex]; j++) {
        if (j > MAP[this.mapIndex][i][0] - 2 && j < MAP[this.mapIndex][i][1]) {
          ts1.push(0);
        } else {
          ts1.push(100);
        }
      }
      ts.push(ts1);
    }
    this.status = ts;

    let tp = [],
      tm = [],
      ti = [];
    for (let i = 0; i < 13; i++) {
      let tm1 = [],
        tp1 = [],
        ti1 = [];
      for (let j = 0; j < MAPROW[i]; j++) {
        let tm2 = [],
          tp2 = [];
        for (let k = 0; k < MAPROW[i]; k++) {
          if (k > MAP[i][j][0] - 2 && k < MAP[i][j][1]) {
            tm2.push(0);
            tp2.push(this.getPosition(i, j + 1, k + 1));
          } else {
            tm2.push(100);
            tp2.push(null);
          }
        }
        tm1.push(tm2);
        tp1.push(tp2);
        ti1.push(null);
      }
      tm.push(tm1);
      tp.push(tp1);
      ti.push(ti1);
    }

    this.map = tm;
    position = tp;
    this.mapItems = ti;

    console.log("Position");
    console.log(position);
    console.log("MapItems");
    console.log(this.mapItems);
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
    // Title
    const img = this.add.image(150, 150, "title").setScale(1.5).setDepth(101);

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
      .image(DEVICEWIDTH / 2, DEVICEHEIGHT / 2 - 360, "overlay")
      .setScale(6.6, 3.6)
      .setDepth(100);

    //Isometric grid
    for (let i = 0; i < 13; i++) {
      let grid = this.add
        .image(
          DEVICEWIDTH / 2,
          DEVICEHEIGHT / 2 - ISOMETRIC_GRID_LOCATION[i],
          ISOMETRIC_GRID_NAME[i]
        )
        .setOrigin(0.5, 0.5)
        .setAlpha(0);

      this.grid.push(grid);
    }

    this.grid[this.mapIndex].setAlpha(1);

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

    // Add Overlaytext
    this.overlayText = this.add.text(0, 0, "", {
      fontFamily: "Arial",
      fontSize: 20,
      color: "#9fd771",
    });
    this.overlayText.setAlpha(1).setDepth(121);

    this.chevron_down.add(this.overlayText);

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

        for (let i = 0; i < MAPROW[this.mapIndex]; i++) {
          let ts1 = [];
          for (let j = 0; j < MAPROW[this.mapIndex]; j++) {
            ts1.push(0);
          }
          ts.push(ts1);
        }

        tmpStatus = ts;

        this.mapToOther(this.status, tmpStatus);

        for (let i = 0; i < MAPROW[this.mapIndex]; i++) {
          for (let j = 0; j < MAPROW[this.mapIndex]; j++) {
            if (tmpStatus[i][j] === 0) {
              if (this.positionAvailable(i, j, 2, 1, tmpStatus)) {
                let item = this.add
                  .image(
                    position[this.mapIndex][i][j].x + 5,
                    position[this.mapIndex][i][j].y,
                    "golfcourse_2ha"
                  )
                  .setOrigin(0, 1)
                  .setDisplaySize(286, 205)
                  .setDepth(
                    i * MAPROW[this.mapIndex] + MAPROW[this.mapIndex] - j
                  )
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
      for (let i = 0; i < MAPROW[this.mapIndex]; i++) {
        for (let j = 0; j < MAPROW[this.mapIndex]; j++) {
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
