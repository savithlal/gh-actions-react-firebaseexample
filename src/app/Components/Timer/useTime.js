import { useState } from 'react';
import { Time } from './Utils/Index';
import { useInterval } from './Hooks/Index';

export default function useTime({ format }) {
  const [seconds, setSeconds] = useState(Time.getSecondsFromTimeNow());

  useInterval(() => {
    setSeconds(Time.getSecondsFromTimeNow());
  }, 1000);

  return {
    ...Time.getFormattedTimeFromSeconds(seconds, format),
  };
}
