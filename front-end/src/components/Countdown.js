import React, { useState, useEffect } from 'react';

function Countdown({ timer, isActive }) {
  const [time, setTime] = useState(timer);

  useEffect(() => {
    setTime(timer); // Reset timer when `timer` prop changes
  }, [timer]);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hrs, mins, secs };
  };

  const { hrs, mins, secs } = formatTime(time);

  return (
    <div className="countdown">
      <div className="time-box">
        <div className="circle">{String(hrs).padStart(2, '0')}</div>
        <span className="label">HOURS</span>
      </div>
      <div className="separator">:</div>
      <div className="time-box">
        <div className="circle">{String(mins).padStart(2, '0')}</div>
        <span className="label">MINUTES</span>
      </div>
      <div className="separator">:</div>
      <div className="time-box">
        <div className="circle">{String(secs).padStart(2, '0')}</div>
        <span className="label">SECONDS</span>
      </div>
    </div>
  );
}

export default Countdown;


