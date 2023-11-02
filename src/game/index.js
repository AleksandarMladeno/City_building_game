import Phaser from "phaser";
import { useEffect } from "react";
import Board from "./scenes/Board";
const Main = () => {
  useEffect(() => {
    const board = new Board({ key: "board" });
    const config = {
      type: Phaser.AUTO,
      parent: "game",
      backgroundColor: "#002c1a",
      width: 1920,
      height: 1080,
      scene: [board],
      scale: {
        mode: Phaser.Scale.FIT,
        parent: "game",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
    const game = new Phaser.Game(config);
    game.scene.start("board");
  });
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div id="game"></div>
      </div>
    </>
  );
};

export default Main;
