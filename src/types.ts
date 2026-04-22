export type Circle = {
  id: number;
  x: number;
  y: number;
  isClicked: boolean;
  opacity: number;
  clickedAt?: number;
};

export type Status = 'idle' | 'playing' | 'won' | 'lost';
