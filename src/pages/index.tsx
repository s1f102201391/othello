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
    if (board[y][x] !== 0) return;
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
      let n = 0;
      if (board[Y] !== undefined && board[Y][X] !== undefined && board[Y][X] === 2 / turnColor) {
        while (n >= 0) {
          if (
            board[Y] !== undefined &&
            board[Y][X] !== undefined &&
            board[Y][X] === 2 / turnColor
          ) {
            Y += b;
            X += a;
            n += 1;
          } else if (
            board[Y] !== undefined &&
            board[Y][X] !== undefined &&
            board[Y][X] === turnColor
          ) {
            while (n > 0) {
              Y -= b;
              X -= a;
              n -= 1;
              newBoard[Y][X] = turnColor;
            }
            newBoard[y][x] = turnColor;
            setTurnColor(2 / turnColor);
            break;
          } else {
            break;
          }
        }
      }
    }
    setBoard(newBoard);
  };
  const countStone = () => {
    let Black = 0;
    let White = 0;
    for (let a = 0; a < 8; a++) {
      for (let b = 0; b < 8; b++) {
        if (board[a][b] === 1) Black++;
        if (board[a][b] === 2) White++;
      }
    }
    return { Black, White };
  };
  const result = countStone();

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

      <div className={styles.scoreBoard}>
        <p>
          黒{result.Black}/白{result.White}
        </p>
        <p>{turnColor === 1 ? '黒' : '白'}のターン</p>
      </div>
    </div>
  );
};

export default Home;
