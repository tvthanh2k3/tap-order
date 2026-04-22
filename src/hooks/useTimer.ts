import { useEffect, useRef, useState } from 'react';

export function useTimer(isRunning: boolean) {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setTime((t) => t + 100), 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  function resetTimer() {
    setTime(0);
  }

  return { time, resetTimer };
}
