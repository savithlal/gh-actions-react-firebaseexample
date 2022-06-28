import {useState} from 'react';
import {Time} from './utils';
import {useInterval} from './hooks';

export default function useStopwatch({autoStart, offsetTimestamp}) {
  const [passedSeconds, setPassedSeconds] = useState(
    Time.getSecondsFromExpiry(offsetTimestamp, true) || 0,
  );
  const [prevTime, setPrevTime] = useState(new Date());
  const [seconds, setSeconds] = useState(
    passedSeconds + Time.getSecondsFromPrevTime(prevTime || 0, true),
  );
  const [isRunning, setIsRunning] = useState(autoStart);

  useInterval(
    () => {
      setSeconds(passedSeconds + Time.getSecondsFromPrevTime(prevTime, true));
    },
    isRunning ? 1000 : null,
  );
  const start = () => {
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setIsRunning(true);
    setSeconds(passedSeconds + Time.getSecondsFromPrevTime(newPrevTime, true));
  };

  const pause = () => {
    setPassedSeconds(seconds);
    setIsRunning(false);
  };

  const reset = (offset = 0, newAutoStart = false) => {
    const newPassedSeconds = Time.getSecondsFromExpiry(offset, true) || 0;
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setPassedSeconds(newPassedSeconds);
    setIsRunning(newAutoStart);
    setSeconds(
      newPassedSeconds + Time.getSecondsFromPrevTime(newPrevTime, true),
    );
  };

  return {
    ...Time.getTimeFromSeconds(seconds),
    start,
    pause,
    reset,
    isRunning,
  };
}
