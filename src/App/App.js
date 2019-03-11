import React from "react";
import "./App.css";

function App() {
  const [count, setCount] = React.useState(0);
  const stateToServiceWorker = data => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      console.log("Sending data to service worker");
      navigator.serviceWorker.controller.postMessage(data);
    }
  };
  React.useEffect(() => {
    navigator.serviceWorker.addEventListener("message", event => {
      if (event && event.data.count !== undefined) {
        setCount(event.data.count);
      }
    });
    stateToServiceWorker({ count: 0 });
  }, []);
  const increment = () => {
    const updatedCount = count + 1;
    setCount(updatedCount);
    stateToServiceWorker({ count: updatedCount });
  };
  const decrement = () => {
    const updatedCount = count - 1;
    setCount(updatedCount);
    stateToServiceWorker({ count: updatedCount });
  };

  return (
    <div className="App">
      <div className="controls">
        <h1 className="count">{count}</h1>
        <p>Manages your state through service-workers</p>
        <button className="inc button" onClick={increment}>
          +
        </button>
        <button className="dec button" onClick={decrement}>
          -
        </button>
      </div>
    </div>
  );
}

export default App;
