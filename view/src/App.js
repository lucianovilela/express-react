import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [state, setState] = React.useState(0);
  const ckickHandle = (props) => {
    setState(state + 1);
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={ckickHandle}>Click {state}</button>
      </header>
    </div>
  );
}

export default App;
