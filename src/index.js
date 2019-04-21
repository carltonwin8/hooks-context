import React, { useState, useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const UserContext = React.createContext();

const App = () => {
  const [user, setUser] = useState({
    firstName: "Carlton",
    lastName: "Joseph"
  });

  return (
    <UserContext.Provider value={user}>
      <Main />
    </UserContext.Provider>
  );
};

const Navbar = () => {
  const { firstName, lastName } = useContext(UserContext);
  return (
    <nav>
      <ol>
        <li>Cool App</li>
        <li>
          Hello, {firstName} {lastName}
        </li>
      </ol>
    </nav>
  );
};

const Main = () => {
  return (
    <>
      <Navbar />
      <main>
        <h1>App Title</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias rerum
          quam ad voluptatem! Fuga maiores tenetur est quos, laboriosam soluta,
          dolorem optio eaque maxime suscipit debitis commodi vel necessitatibus
          explicabo?
        </p>
        <CountReducer />
        <CountuseState />
      </main>
    </>
  );
};

const CountReducer = () => {
  const [count, dispatch] = useReducer((state, action) => {
    switch (action) {
      case "-":
        return --state;
      case "+":
        return ++state;
      default:
        return state;
    }
  }, 0);
  return (
    <p>
      <span onClick={() => dispatch("-")}>-</span> {count}{" "}
      <span onClick={() => dispatch("+")}>+</span> useReducer
    </p>
  );
};

const CountuseState = () => {
  const [count, setCount] = useState(0);
  const inc = () => setCount(p => ++p);
  const dec = () => setCount(p => --p);
  return (
    <p>
      <span onClick={inc}>-</span> {count} <span onClick={dec}>+</span> useState
    </p>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
