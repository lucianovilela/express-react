import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [state, setState] = React.useState(0);
  const [user, setUser] = React.useState(null);
  const ckickHandle = (props) => {
    setState(state + 1);
  };
  const login = () => {
    fetch("/login")
      .then((r) => r.json())
      .then((r) => {
        setUser(r);
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={ckickHandle}>Click {state}</button>
        <button onClick={login}>Login</button>
        <div>{user && <p>{user.token}</p>}</div>
      </header>
    </div>
  );
}

export default App;
