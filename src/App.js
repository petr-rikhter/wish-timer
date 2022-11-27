import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [timeLeft, setTimeLeft] = useState("00");
  const [inputValue, setInputValue] = useState("");
  const [toggleInptuButton, setToggleInptuButton] = useState(
    localStorage.getItem("toggle") ? localStorage.getItem("toggle") : false
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

  const dateChangeHandler = (event) => {
    const chooseDate = new Date(event.target.value).getTime();
    const dateNow = new Date().getTime();
    localStorage.setItem("wishtime", chooseDate - dateNow);

    setTimeLeft(Math.abs(chooseDate - dateNow));
    setInputValue("");

    localStorage.setItem("toggle", true);
    const toggle = localStorage.getItem("toggle");
    setToggleInptuButton(toggle);
  };

  const stopTimerHandler = (event) => {
    event.preventDefault();
    localStorage.removeItem("wishtime");
    setTimeLeft("00");

    setToggleInptuButton(false);
    localStorage.removeItem("toggle");
  };

  return (
    <div className="background">
      <div className="app">
        <div className="text">Выберете желаемую дату</div>

        <form>
          {!toggleInptuButton && (
            <input
              value={inputValue}
              onChange={dateChangeHandler}
              className="input"
              type="date"
            />
          )}

          {toggleInptuButton && (
            <button onClick={stopTimerHandler} className="button" type="submit">
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
