import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);
    const directions = [
      [0, 1], //下
      [0, -1], //上
      [1, 0], //右
      [-1, 0], //左
      [1, 1], //右下
      [1, -1], //右上
      [-1, 1], //左下
      [-1, -1], //左上
    ];
    for (const item of directions) {
      const [a, b] = item;
      let X = x + a;
      let Y = y + b;
      while (board[Y] !== undefined && board[Y][X] !== undefined)
        if (board[Y][X] === 2 / turnColor) {
          Y += b;
          X += a;
        } else if (board[Y][X] === turnColor) {
          newBoard[y][x] = turnColor;
          setTurnColor(2 / turnColor);
          break;
        }
    }

    setBoard(newBoard);
  };
  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
