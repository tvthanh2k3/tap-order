import { useEffect } from 'react';
import type { Status } from '../types';

type Params = {
  isAuto: boolean;
  status: Status;
  nextNumber: number;
  onClickCircle: (id: number) => void;
};

export function useAutoPlay({ isAuto, status, nextNumber, onClickCircle }: Params) {
  useEffect(() => {
    if (!isAuto || status !== 'playing') return;
    const t = setTimeout(() => onClickCircle(nextNumber), 600);
    return () => clearTimeout(t);
  }, [isAuto, status, nextNumber, onClickCircle]);
}
