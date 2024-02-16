import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import Button from "./Button";

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const interval = useRef<number | null>(null);
  const [sessionCount, setSessionCount] = useState(1);
  const [isActive, setIsActive] = useState(false);

  function startTimer() {
    setIsActive(true);
    interval.current = setInterval(() => {
      if (secondsLeft === 0) return stopTimer();
      setSecondsLeft((prev) => {
        if (prev !== 0) return prev - 1;

        stopTimer();
        setSessionCount((prev) => prev + 1);
        return 10;
      });
    }, 1000);
  }

  function stopTimer() {
    if (interval.current !== null) {
      clearInterval(interval.current);
      interval.current = null;
      setIsActive(false);
    }
  }

  return (
    <div className="z-10 flex flex-col gap-12 items-center">
      <div className="flex flex-col gap-4 items-center">
        <div
          className="text-3xl font-bold text-white"
          style={{ textShadow: "1px 1px 10px rgba(0,0,0,0.6)" }}
        >
          Session {sessionCount} of 4
        </div>
        <div
          className="text-9xl font-bold text-white"
          style={{ textShadow: "0 0 10px rgba(0,0,0,0.5)" }}
        >
          {String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:
          {String(secondsLeft % 60).padStart(2, "0")}{" "}
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button>
          <BackwardIcon width={30} height={30} />
        </Button>

        <Button onClick={isActive ? stopTimer : startTimer}>
          {isActive ? (
            <PauseIcon width={30} height={30} />
          ) : (
            <PlayIcon width={30} height={30} />
          )}
        </Button>
        <Button>
          <ForwardIcon width={30} height={30} />
        </Button>
      </div>
    </div>
  );
}
