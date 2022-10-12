export type Counter = [() => number, () => number];

const counter = (initialValue = 0): Counter => {
  let stateNumber = initialValue;

  const getCurrentCounter = () => stateNumber;
  const increaseCounter = () => (stateNumber += 1);

  return [getCurrentCounter, increaseCounter];
};
const [getA, nextA] = counter(1);

console.log(getA());
nextA();
console.log(getA());

const [getB, nextB] = counter(10);
nextB();

console.log(getA());
console.log(getB());

nextA();
console.log(getA());
console.log(getB());
