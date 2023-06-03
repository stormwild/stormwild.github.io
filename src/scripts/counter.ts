let counter: number = 0;
const counterDisplay: HTMLSpanElement | null =
  document.querySelector(".counter");
const btn: HTMLButtonElement | null = document.querySelector(".counter-btn");

counterDisplay!.innerHTML = counter.toString();

btn!.addEventListener("click", () => {
  counter++;
  counterDisplay!.innerHTML = counter.toString();
  console.log("counter: ", counter);
});
