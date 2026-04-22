import { useCallback, useEffect, useRef, useState } from 'react';
import type { Circle, Status } from './types';
import { generateCircles } from './utils/generateCircles';
import { useTimer } from './hooks/useTimer';
import { useAutoPlay } from './hooks/useAutoPlay';
import ControlPanel from './components/ControlPanel';
import GameBoard from './components/GameBoard';
import './App.css';

export default function App() {
  const [points, setPoints] = useState(5);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [nextNumber, setNextNumber] = useState(1);
  const [isAuto, setIsAuto] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { time, resetTimer } = useTimer(status === 'playing');

  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (status === 'won' || status === 'lost') setIsAuto(false);
  }, [status]);

  function handlePlay() {
    const board = boardRef.current;
    if (!board) return;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    resetTimer();
    setNextNumber(1);
    setCircles(generateCircles(points, board.clientWidth, board.clientHeight));
    setStatus('playing');
  }

  const handleCircleClick = useCallback((id: number) => {
    setNextNumber((currentNext) => {
      if (id !== currentNext) {
        setStatus('lost');
        return currentNext;
      }

      setCircles((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isClicked: true, opacity: 0 } : c))
      );

      const t = setTimeout(() => {
        setCircles((prev) => prev.filter((c) => c.id !== id));
      }, 2000);
      timeoutsRef.current.push(t);

      const newNext = currentNext + 1;
      if (newNext > points) {
        setStatus('won');
      }
      return newNext;
    });
  }, [points]);

  useAutoPlay({ isAuto, status, nextNumber, onClickCircle: handleCircleClick });

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
      <GameBoard
        ref={boardRef}
        circles={circles}
        status={status}
        onCircleClick={handleCircleClick}
      />
      <footer className="footer">Next: {nextNumber}</footer>
    </div>
  );
}
