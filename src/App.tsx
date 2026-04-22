import { useRef, useState } from 'react';
import type { Circle, Status } from './types';
import { generateCircles } from './utils/generateCircles';
import { useTimer } from './hooks/useTimer';
import ControlPanel from './components/ControlPanel';
import GameBoard from './components/GameBoard';
import './App.css';

export default function App() {
  const [points, setPoints] = useState(5);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [nextNumber] = useState(1);
  const [isAuto, setIsAuto] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const { time, resetTimer } = useTimer(status === 'playing');

  function handlePlay() {
    const board = boardRef.current;
    if (!board) return;
    resetTimer();
    setCircles(generateCircles(points, board.clientWidth, board.clientHeight));
    setStatus('playing');
  }

  return (
    <div className="app">
      <ControlPanel
        points={points}
        onPointsChange={setPoints}
        time={time}
        status={status}
        isAuto={isAuto}
        onPlay={handlePlay}
        onToggleAuto={() => setIsAuto((v) => !v)}
      />
      <GameBoard ref={boardRef} circles={circles} onCircleClick={() => {}} />
      <footer className="footer">Next: {nextNumber}</footer>
    </div>
  );
}