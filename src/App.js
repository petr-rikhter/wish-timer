import { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [timeLeft, setTimeLeft] = useState("00");
  const inputValue = useRef();
  const [toggleInptuButton, setToggleInptuButton] = useState(
    localStorage.getItem("toggle") || false
  );

  const padTime = (time) => time.toString().padStart(2, 0);

  const seconds = padTime(Math.floor(timeLeft / 1000) % 60);
  const minutes = padTime(Math.floor(timeLeft / (1000 * 60)) % 60);
  const hours = padTime(Math.floor(timeLeft / (1000 * 60 * 60)) % 24);
  const days = padTime(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));

  useEffect(() => {
    if (localStorage.getItem("wishtime")) {
      let dif = localStorage.getItem("wishtime");

      const interval = setInterval(() => {
        setTimeLeft(dif > 0 ? dif : "");
      }, 1000);

      localStorage.setItem("wishtime", dif - 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [timeLeft]);

  const startTimerHandler = (event) => {
    event.preventDefault();

    const chooseDate = new Date(inputValue.current.value).getTime();
    const dateNow = new Date().getTime();

    setTimeLeft(Math.abs(chooseDate - dateNow));
    setToggleInptuButton(true);

    localStorage.setItem("wishtime", chooseDate - dateNow);
    localStorage.setItem("toggle", true);
  };

  const stopTimerHandler = (event) => {
    event.preventDefault();

    setTimeLeft("00");
    setToggleInptuButton(false);

    localStorage.removeItem("wishtime");
    localStorage.removeItem("toggle");
  };

  return (
    <div className="background">
      <div className="app">
        <div className="text">Выберете желаемую дату</div>

        <form>
          {!toggleInptuButton && (
            <input ref={inputValue} className="input" type="date" />
          )}

          {!toggleInptuButton && (
            <button
              onClick={startTimerHandler}
              className="button"
              type="button"
            >
              Запустить таймер
            </button>
          )}

          {toggleInptuButton && (
            <button onClick={stopTimerHandler} className="button" type="button">
              Остановить таймер
            </button>
          )}
        </form>

        <div className="timer">
          <div className="column">
            <span className="days">{days}</span>
            <p>Дни</p>
          </div>

          <span className="dots">:</span>

          <div className="column">
            <span className="hours">{hours}</span>
            <p>Часы</p>
          </div>

          <span className="dots">:</span>

          <div className="column">
            <span className="minutes">{minutes}</span>
            <p>Минуты</p>
          </div>

          <span className="dots">:</span>

          <div className="column">
            <span className="seconds">{seconds}</span>
            <p>Секунды</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
