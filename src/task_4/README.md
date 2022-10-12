# 4. Props Drilling

Review following code snippet and answer questions:
1. What’s wrong with this code snippet?
2. How can we improve it?
3. What benefits and drawbacks of each method?

Example:

```
import React, { FC, useState } from "react";
export const Parent: FC = () => {
const [count, setCount] = useState(0);
  const [extraA, setExtraA] = useState(1);
  const [extraB, setExtraB] = useState(2);
  return (
    <LayerA
      count={count}
      setCount={setCount}
      extraA={extraA}
      extraB={extraB}
/> );
};
/**
 * LAYER A -------------------------------------------------
 */
type LayerAProps = {
  count: number;
  setCount: (value: number) => void;
  extraA: number;
  extraB: number;
}
const LayerA: FC<LayerAProps> = ({ count, setCount, extraA, extraB
}) => (
  <div>
    <LayerB count={count} setCount={setCount} extraB={extraB} />
    <div>{extraA}</div>
</div> );
/**
 * LAYER B -------------------------------------------------
 */
type LayerBProps = {
  count: number;
  setCount: (value: number) => void;
  extraB: number;
}
const LayerB: FC<LayerBProps> = ({ count, setCount, extraB }) => (
  <div>
    <Child count={count} setCount={setCount} />
    <div>{extraB}</div>
  </div>
);
/**
 * LAST CHILD ----------------------------------------------
```
## Answers
1. What’s wrong with this code snippet?
- Too many nested components and props. This reduces the readability of the code, makes it difficult to optimize.
- State variables "extraA", "extraB" never used like state. "extraA", "extraB" it's not state, it's only constant.
- When you click on the button, all components are re-rendered.
- It is semantically incorrect to insert text into a div.

2. How can we improve it?
- We can remove all the extra nesting. Remove components LayerA, LayerB. Remove state variables. 
Insert the Child component into Parents
- If we can't remove the components LayerA, LayerB, then use the React.Context to pass the state variable.
- To improve the readability of the code, "setCount" can be moved to the callback function.

Code after changes:

```
import React, { FC, useState } from "react";
export const Parent = () => {
  
    const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prevState) => prevState + 1)
  }

  return (
    <>

        <p>{count}</p>
        <button onClick={handleClick} />
        <p>2</p>
      <p>1</p>
   
    </>
  );
};
```

3. What benefits and drawbacks of each method?
- pros - A small nesting of components improves the development process, makes it easier to read the code.
 Components with small nesting can be reused.

- cons - Too much nesting of props complicates the development,
 you have to spend more time to find the end point where the props come.
 A large number of re-renders has a bad effect on optimization