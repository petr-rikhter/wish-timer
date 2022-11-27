import { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [pastErrorDate, setPastErrorDate] = useState(false);

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

  const hideErrorInput = () => {
    if (!inputValue.current.value) {
      return;
    }
    if (
      new Date(inputValue.current.value).getTime() +
        new Date(inputValue.current.value).getTimezoneOffset() * 60000 <=
      new Date(new Date().getTime())
    ) {
      setPastErrorDate(true);
    } else {
      setPastErrorDate(false);
    }
  };

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
    if (
      new Date(inputValue.current.value).getTime() +
        new Date(inputValue.current.value).getTimezoneOffset() * 60000 <=
      new Date().getTime()
    ) {
      setPastErrorDate(true);
      return;
    }
    if (!inputValue.current.value) {
      return;
    } else {
      event.preventDefault();

      const chooseDate =
        new Date(inputValue.current.value).getTime() +
        new Date(inputValue.current.value).getTimezoneOffset() * 60000;
      const dateNow = new Date().getTime();

      setTimeLeft(Math.abs(chooseDate - dateNow));
      setToggleInptuButton(true);

      localStorage.setItem("wishtime", chooseDate - dateNow);
      localStorage.setItem("toggle", true);
    }
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
        {!toggleInptuButton && (
          <div className="text">Выберете желаемую дату</div>
        )}

        {pastErrorDate && (
          <div className="text" style={{ color: "red" }}>
            Введите дату больше текущей!
          </div>
        )}

        <form>
          {!toggleInptuButton && (
            <input
              ref={inputValue}
              onChange={hideErrorInput}
              className="input"
              type="date"
              defaultValue={new Date(
                new Date().getTime() - new Date().getTimezoneOffset() * 60000
              )
                .toISOString()
                .substring(0, 10)}
            />
          )}

          {!toggleInptuButton && (
            <div onClick={startTimerHandler} className="button">
              Запустить таймер
            </div>
          )}

          {toggleInptuButton && (
            <div onClick={stopTimerHandler} className="button">
              Остановить таймер
            </div>
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
