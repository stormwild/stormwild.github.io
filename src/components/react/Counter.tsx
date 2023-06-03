import React from "react";
import { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <h1>React</h1>
      <p>Counter: {counter}</p>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        +
      </button>
    </>
  );
};

export default Counter;
