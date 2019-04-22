import React, { useState, useContext, useReducer, useCallback } from "react";
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
        <CountState />
        <CountCallback />
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

let last;
const CountState = () => {
  const [count, setCount] = useState(0);
  const inc = () => setCount(p => ++p);
  const dec = () => setCount(p => --p);
  console.log(inc, last, last === inc);
  last = inc;

  return (
    <p>
      <span onClick={inc}>-</span> {count} <span onClick={dec}>+</span> useState
    </p>
  );
};
/*
 * In the example above inc is recreate on each render.
 * In the example below inc is create on the first render and then depends
 * on no "[]" state changing in future renders so is only created once.
 */
let last2;
const CountCallback = () => {
  const [count, setCount] = useState(0);
  const inc = useCallback(() => setCount(p => ++p), []);
  const dec = useCallback(() => setCount(p => --p), []);
  // [] param say callback does not depend on any props so don't re-run
  console.log(inc, last2, last2 === inc);
  last2 = inc;

  return (
    <p>
      <span onClick={inc}>-</span> {count} <span onClick={dec}>+</span>{" "}
      useCallback
    </p>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
