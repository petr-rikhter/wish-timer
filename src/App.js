import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [timeLeft, setTimeLeft] = useState();

  const padTime = (time) => time.toString().padStart(2, 0);

  const seconds = padTime(Math.floor(timeLeft / 1000) % 60);
  const minutes = padTime(Math.floor(timeLeft / (1000 * 60)) % 60);
  const hours = padTime(Math.floor(timeLeft / (1000 * 60 * 60)) % 24);
  const days = padTime(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeLeft((timeLeft) => timeLeft - 1);
  //   }, 1000);
  // }, []);

  const dateChangeHandler = (event) => {
    const chooseDate = new Date(event.target.value).getTime();
    const dateNow = new Date().getTime();

    setTimeLeft(Math.abs(chooseDate - dateNow));
  };

  // const startTimerHandler = (event) => {

  // };

  return (
    <div className="background">
      <div className="app">
        <div className="text">Выберете желаемую дату</div>

        <form>
          <input
            // value={chooseDate}
            onChange={dateChangeHandler}
            className="input"
            type="date"
          />

          <button className="button" type="submit">
            Начать отсчет
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
