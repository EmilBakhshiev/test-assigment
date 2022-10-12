# 5. Passing Data to Parent Component

Review following code snippet and answer questions:
1. What options do we have to get `open` value in Parent component?
2. What benefits and drawbacks of each method?

Example:

```
import React, { FC, useReducer } from "react";
export const Parent: FC = () => {
  return (
    <div>
      <Child>
        <!-- How to get `open` value here and work with it? -->
        <!-- e.g. open ?? <SomeOtherComponent/> -->
      </Child>
    </div>
) };
const Child: FC = () => {
  const [open, toggleOpen] = useReducer(value => !value, false);
  return (
    <div>
      <button onClick={toggleOpen}>
        Toggle
      </button>
    </div>
) };
```
## Answers

### 1. What options do we have to get `open` value in Parent component?
1. First Option 

```
import React, { FC, useReducer } from "react";
export const Parent: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Child handleClick={handleClick} />
      {isOpen && <SomeOtherComponent/> }
    </div>
  );
};

type ChildProps = {
  handleClick: () => void;
};

const Child: FC<ChildProps> = ({ handleClick }) => {
  const [open, toggleOpen] = useReducer((value) => !value, false);

  return (
    <div>
      <button onClick={handleClick}>Toggle</button>
    </div>
  );
}; 
```

2. Second option

```
import React, { FC, useReducer, ReactNode } from "react";

export const Parent = () => (
  <div>
    <Child>{(open) => open && <SomeOtherComponent/>}</Child>
  </div>
);

type ChildProps = {
  children: (open: boolean) => ReactNode;
};

const Child:FC<ChildProps> = ({ children }) => {
  const [open, toggleOpen] = useReducer((value) => !value, false);

  return (
    <div>
      <button onClick={toggleOpen}>Toggle</button>
       {children && children(open)}
    </div>
  );
};
```
### 2. What benefits and drawbacks of each method?
#### First option
- pros - We write all the business logic in the Parent component, the Child component is responsible only for render the button and clicking on the button. All state management takes place in the Parent component.

- cons - We do not use the state of the Сhild component, and therefore we create an extra component that can be deleted and move the entire layout to the Parent component.

#### Second option
- pros - The state of the Child component control inside component. The Parent component does not contain business logic and if this component was planned as a dumb component, then this would be a good solution for us.

- cons - It may be difficult for novice developers to understand this code.