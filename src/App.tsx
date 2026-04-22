import { useState } from 'react';
import type { Circle, Status } from './types';
import ControlPanel from './components/ControlPanel';
import GameBoard from './components/GameBoard';
import './App.css';

const DEMO_CIRCLES: Circle[] = [
  { id: 1, x: 50,  y: 80,  isClicked: false, opacity: 1 },
  { id: 2, x: 200, y: 30,  isClicked: false, opacity: 1 },
  { id: 3, x: 310, y: 200, isClicked: false, opacity: 1 },
  { id: 4, x: 100, y: 280, isClicked: false, opacity: 1 },
  { id: 5, x: 260, y: 340, isClicked: false, opacity: 1 },
];

export default function App() {
  const [points, setPoints] = useState(5);
  const [circles] = useState<Circle[]>(DEMO_CIRCLES);
  const [status] = useState<Status>('idle');
  const [time] = useState(0);
  const [nextNumber] = useState(1);
  const [isAuto, setIsAuto] = useState(false);

  return (
    <div className="app">
      <ControlPanel
        points={points}
        onPointsChange={setPoints}
        time={time}
        status={status}
        isAuto={isAuto}
        onPlay={() => {}}
        onToggleAuto={() => setIsAuto((v) => !v)}
      />
      <GameBoard circles={circles} onCircleClick={() => {}} />
      <footer className="footer">Next: {nextNumber}</footer>
    </div>
  );
}
