import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
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
  //候補地
  const newBoard = structuredClone(board);

  const nextClick = (nowTurncolor: number) => {
    let n = 0;
    for (let d = 0; d < 8; d++) {
      for (let c = 0; c < 8; c++) {
        if (newBoard[c][d] === 3) {
          newBoard[c][d] = 0;
        }
        for (const item of directions) {
          const [a, b] = item;
          let X = d + a;
          let Y = c + b;
          if (newBoard[c][d] === 0) {
            if (
              newBoard[Y] !== undefined &&
              newBoard[Y][X] !== undefined &&
              newBoard[Y][X] === 2 / nowTurncolor
            ) {
              while (newBoard[Y] !== undefined && newBoard[Y][X] !== undefined) {
                if (
                  newBoard[Y] !== undefined &&
                  newBoard[Y][X] !== undefined &&
                  newBoard[Y][X] === 2 / nowTurncolor
                ) {
                  Y += b;
                  X += a;
                } else if (
                  newBoard[Y] !== undefined &&
                  newBoard[Y][X] !== undefined &&
                  newBoard[Y][X] === nowTurncolor
                ) {
                  if (newBoard[c][d] !== 0) return;
                  newBoard[c][d] = 3;
                  n += 1;
                  break;
                } else {
                  break;
                }
              }
            }
          }
        }
      }
    }
    if (n === 0 && nowTurncolor !== turnColor) {
      nextClick(2 / nowTurncolor);
      setTurnColor(2 / nowTurncolor);
      return;
    }
  };

  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 3) return;
    console.log(x, y);

    //8方向
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
    nextClick(2 / turnColor);
    setTurnColor(2 / turnColor);
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
                  className={`${styles.stoneStyle} ${color === 3 ? styles.nextPoint : ''}`}
                  style={{ background: color === 1 ? '#000' : color === 2 ? '#FFF' : '#FF0' }}
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

// for (let n = 0; n < 8; n++) {
//   if (
//     board[y] !== undefined &&
//     board[y + directions[n][0]][x + directions[n][1]] !== undefined &&
//     board[y + directions[n][0]][x + directions[n][1]] === 2 / turnColor
//   ) {
//     if (board[y + directions[n][0]][x + directions[n][1]] === turnColor) {
//       for (let m = n; m >= 0; m--) {
//         board[y + directions[n * m][0]][x + directions[n * m][1]] === turnColor;
//       }
//       newBoard[y][x] = turnColor;
//       setTurnColor(2 / turnColor);
//       break;
//     }
//   }
// }
