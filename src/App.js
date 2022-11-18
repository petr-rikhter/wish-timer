import "./App.css";

const App = () => {
  return (
    <div className="background">
      <div className="app">
        <div className="text">Выберете желаемую дату</div>

        <form>
          <input type="date"></input>
          <button type="submit">Начать отсчет</button>
        </form>

        <div className="timer">
          <span className="hours">00</span>
          <span className="dots">:</span>
          <span className="seconds">00</span>
        </div>
      </div>
    </div>
  );
};

export default App;
