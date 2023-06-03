import React from "react";
import { useState } from "react";

const Main = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>React</h1>
      <p>Counter: {counter}</p>
      <button
        onClick={() => {
          setCounter(counter + 1);
          console.log(counter);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Main;
