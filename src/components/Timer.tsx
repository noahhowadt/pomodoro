import {
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

export default function Timer() {
  const timeout = useRef<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
  const [timerActive, setTimerActive] = useState(false);

  const [segmentCount, setSegmentCount] = useState(1);
  const [segmentStarted, setSegmentStarted] = useState(false);
  const isBreak = segmentCount % 2 === 0;

  useEffect(() => {
    if (!timerActive) return;
    timeout.current = setTimeout(handleTimer, 1000);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [timerActive, handleTimer]);

  function endSegment() {
    setTimerActive(false);
    setSegmentStarted(false);
    setSecondsLeft(isBreak ? WORK_DURATION : BREAK_DURATION);

    if (segmentCount < 8) return setSegmentCount((prev) => prev + 1);
    setSegmentCount(1);
  }

  function startSegment() {
    setTimerActive(true);
    setSegmentStarted(true);
  }

  function handleTimer() {
    if (secondsLeft > 1) return setSecondsLeft((prev) => prev - 1);
    endSegment();
  }

  function handleBackwards() {
    if (!segmentStarted) {
      if (segmentCount === 1) return;

      setSecondsLeft(isBreak ? WORK_DURATION : BREAK_DURATION);
      setSegmentCount((prev) => prev - 1);
    } else {
      setTimerActive(false);
      setSecondsLeft(isBreak ? BREAK_DURATION : WORK_DURATION);
      setSegmentStarted(false);
    }
  }

  function handleClickPausePlay() {
    if (timerActive) return setTimerActive(false);
    if (segmentStarted) return setTimerActive(true);
    startSegment();
  }

  return (
    <div className="z-10 w-full inset-0">
      {/*<div>
        <div className="bg-black text-white fixed top-0 right-0 p-4">
          <div>segmentCount: {segmentCount}</div>
          <div>isBreak: {isBreak.toString()}</div>
          <div>segmentStarted: {segmentStarted.toString()}</div>
          <div>timerActive: {timerActive.toString()}</div>
        </div>
  </div>*/}
      <div
        className="flex fixed top-24 inset-x-0 text-6xl font-bold text-white h-1/5 justify-center"
        style={{ textShadow: "1px 1px 10px rgba(0,0,0,0.6)" }}
      >
        {isBreak ? "Take a break..." : "Study time..."}
      </div>
      <div className="fixed inset-0 flex flex-col gap-12 items-center justify-center">
        <div className="flex flex-col gap-4 items-center">
          <div
            className="text-3xl font-bold text-white"
            style={{ textShadow: "1px 1px 10px rgba(0,0,0,0.6)" }}
          >
            Session {Math.ceil(segmentCount / 2) || 1} of 4
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
          <Button onClick={handleBackwards}>
            <BackwardIcon width={30} height={30} />
          </Button>

          <Button onClick={handleClickPausePlay}>
            {timerActive ? (
              <PauseIcon width={30} height={30} />
            ) : (
              <PlayIcon width={30} height={30} />
            )}
          </Button>
          <Button onClick={endSegment}>
            <ForwardIcon width={30} height={30} />
          </Button>
        </div>
      </div>
    </div>
  );
}
