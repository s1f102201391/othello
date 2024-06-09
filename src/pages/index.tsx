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
      if (
        board[y + b][x + a] !== undefined &&
        board[y + b][x + a] === 2 / turnColor &&
        board[y + (b + 1)][x + (a + 1)] === turnColor
      ) {
        newBoard[y][x] = turnColor;
        setTurnColor(2 / turnColor);
      }
    }

    for (let i = 1; i < board.length; i++) {
      if (
        board[y + b] !== undefined &&
        board[x] !== undefined &&
        board[y + i][x] === 2 / turnColor &&
        board[y + (i + 1)][x] === turnColor
      ) {
        newBoard[y][x] = turnColor;
        setTurnColor(2 / turnColor);
      }
    }
    for (let i = 1; i < board.length; i++) {
      if (
        board[y - i] !== undefined &&
        board[x] !== undefined &&
        board[y - i][x] === 2 / turnColor &&
        board[y - (i + 1)][x] === turnColor
      ) {
        newBoard[y][x] = turnColor;
        setTurnColor(2 / turnColor);
      }
    }
    for (let i = 1; i < board.length; i++) {
      if (
        board[x + i] !== undefined &&
        board[y] !== undefined &&
        board[y][x + i] === 2 / turnColor &&
        board[y][x + (i + 1)] === turnColor
      ) {
        newBoard[y][x] = turnColor;
        setTurnColor(2 / turnColor);
      }
    }
    for (let i = 1; i < board.length; i++) {
      if (
        board[x - i] !== undefined &&
        board[y] !== undefined &&
        board[y][x - i] === 2 / turnColor &&
        board[y][x - (i + 1)] === turnColor
      ) {
        newBoard[y][x] = turnColor;
        setTurnColor(2 / turnColor);
      }
    }
    for (let i = 1; i < board.length; i++) {
      if (
        board[y + i][x + i] !== undefined &&
        board[y + i][x + i] === 2 / turnColor &&
        board[y + (i + 1)][x + (i + 1)] === turnColor
      ) {
        newBoard[y][x] = turnColor;
        setTurnColor(2 / turnColor);
      }
    }
    for (let i = 1; i < board.length; i++) {
      if (
        board[y + i][x - i] !== undefined &&
        board[y + i][x - i] === 2 / turnColor &&
        board[y + (i + 1)][x - (i + 1)] === turnColor
      ) {
        newBoard[y][x] = turnColor;
        setTurnColor(2 / turnColor);
      }
    }
    for (let i = 1; i < board.length; i++) {
      if (
        board[y - i][x + i] !== undefined &&
        board[y - i][x + i] === 2 / turnColor &&
        board[y - (i + 1)][x + (i + 1)] === turnColor
      ) {
        newBoard[y][x] = turnColor;
        setTurnColor(2 / turnColor);
      }
    }
    for (let i = 1; i < board.length; i++) {
      if (
        board[y - i][x - i] !== undefined &&
        board[y - i][x - i] === 2 / turnColor &&
        board[y - (i + 1)][x - (i + 1)] === turnColor
      ) {
        newBoard[y][x] = turnColor;
        setTurnColor(2 / turnColor);
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
