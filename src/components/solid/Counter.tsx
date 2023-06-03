import { createSignal } from "solid-js";

const Counter = () => {
  const [count, setCount] = createSignal(0);
  const add = () => setCount(count() + 1);

  return (
    <div class="container">
      <h1>SolidJs</h1>
      <p>Counter: {count()}</p>
      <button onClick={add}>+</button>
    </div>
  );
};

export default Counter;
