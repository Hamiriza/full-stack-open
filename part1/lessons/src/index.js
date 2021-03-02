import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => (
  <p>
    {props.name} {props.exercise}
  </p>
);

const Content = (props) => {
  const { part1, part2, part3 } = props;
  console.log(props);
  return (
    <div>
      <Part name={part1.name} exercise={part1.exercises} />
      <Part name={part2.name} exercise={part2.exercises} />
      <Part name={part3.name} exercise={part3.exercises} />
    </div>
  );
};

const Total = (props) => {
  const { exercises1, exercises2, exercises3 } = props;
  return (
    <div>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  );
};

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const History = ({ allClicks }) => {
  if (allClicks.length == 0) {
    return <div>The app is used by pressing the buttons</div>;
  }

  return <div>button history: {allClicks.join(" ")}</div>;
};

const App = () => {
  // const [counter, setCounter] = useState(0);
  // setTimeout(() => setCounter(counter + 1), 1000);
  // console.log("rendering...", counter);
  // return <div>{counter}</div>;
  // const course = {
  //   name: "Half Stack application development",
  //   parts: [
  //     {
  //       name: "Fundamentals of React",
  //       exercises: 10,
  //     },
  //     {
  //       name: "Using props to pass data",
  //       exercises: 7,
  //     },
  //     {
  //       name: "State of a component",
  //       exercises: 14,
  //     },
  //   ],
  // };
  // return (
  //   <>
  //     <Header course={course.name} />
  //     <Content
  //       part1={course.parts[0]}
  //       part2={course.parts[1]}
  //       part3={course.parts[2]}
  //     />
  //     <Total
  //       exercises1={course.parts[0].exercises}
  //       exercises2={course.parts[1].exercises}
  //       exercises3={course.parts[2].exercises}
  //     />
  //   </>
  // );
  // const [counter, setCounter] = useState(0);
  // const increaseByOne = () => setCounter(counter + 1);
  // const decreaseByOne = () => setCounter(counter - 1);
  // const setToZero = () => setCounter(0);
  // return (
  //   <div>
  //     <Display counter={counter} />
  //     <Button handleClick={increaseByOne} text="plus" />
  //     <Button handleClick={decreaseByOne} text="minus" />
  //     <Button handleClick={setToZero} text="reset" />
  //   </div>
  // );
  /* Handling Arrays */
  // const [clicks, setClicks] = useState({
  //   left: 0,
  //   right: 0,
  // });
  // const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 });
  // const handleRightClick = () =>
  //   setClicks({ ...clicks, right: clicks.right + 1 });
  // return (
  //   <div>
  //     {clicks.left}
  //     <button onClick={handleLeftClick}>Left</button>
  //     <button onClick={handleRightClick}>Right</button>
  //     {clicks.right}
  //   </div>
  // );
  /* Conditional Rendering */
  // const [left, setLeft] = useState(0);
  // const [right, setRight] = useState(0);
  // const [allClicks, setAll] = useState([]);
  // const handleLeftClick = () => {
  //   setAll(allClicks.concat("L"));
  //   setLeft(left + 1);
  // };
  // const handleRightClick = () => {
  //   setAll(allClicks.concat("R"));
  //   setRight(right + 1);
  // };
  // return (
  //   <div>
  //     {left}
  //     <Button handleClick={handleLeftClick} text="Left" />
  //     <Button handleClick={handleRightClick} text="Right" />
  //     {right}
  //     <History allClicks={allClicks} />
  //   </div>
  // );
  /* Function that returns a function */
  const [value, setValue] = useState(10);
  // const setToValue = (newValue) => () => setValue(newValue);
  const setToValue = (newValue) => setValue(newValue);
  return (
    <div>
      {value}
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
