import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [timeLeft, setTimeLeft] = useState("00");

  const padTime = (time) => time.toString().padStart(2, 0);

  const seconds = padTime(Math.floor(timeLeft / 1000) % 60);
  const minutes = padTime(Math.floor(timeLeft / (1000 * 60)) % 60);
  const hours = padTime(Math.floor(timeLeft / (1000 * 60 * 60)) % 24);
  const days = padTime(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => (timeLeft > 0 ? timeLeft - 1000 : ""));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  const dateChangeHandler = (event) => {
    const chooseDate = new Date(event.target.value).getTime();
    const dateNow = new Date().getTime();

    setTimeLeft(Math.abs(chooseDate - dateNow));
  };

  const stopTimerHandler = (event) => {
    event.preventDefault();
    setTimeLeft("00");
  };

  return (
    <div className="background">
      <div className="app">
        <div className="text">Выберете желаемую дату</div>

        <form>
          <input
            // value={timeLeft}
            onChange={dateChangeHandler}
            className="input"
            type="date"
          />

          <button onClick={stopTimerHandler} className="button" type="submit">
            Остановить таймер
          </button>
        </form>

        <div className="timer">
          <span className="days">{days}</span>
          <span className="dots">:</span>
          <span className="hours">{hours}</span>
          <span className="dots">:</span>
          <span className="minutes">{minutes}</span>
          <span className="dots">:</span>
          <span className="seconds">{seconds}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
