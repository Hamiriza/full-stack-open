import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  const { onClick, text } = props;
  return <button onClick={onClick}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  if (text === "positive") {
    return (
      <>
        <td>{text}</td>
        <td>{value}%</td>
      </>
    );
  }
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  );
};

const Statistics = (props) => {
  // console.log("props is", props);
  let keys = Object.keys(props);
  if (keys.every((key) => props[key] === 0)) {
    return <p>No feedback given</p>;
  }
  const { good, neutral, bad } = props;
  return (
    <table>
      <tbody>
        <tr>
          <Statistic text="good" value={good} />
        </tr>
        <tr>
          <Statistic text="neutral" value={neutral} />
        </tr>
        <tr>
          <Statistic text="bad" value={bad} />
        </tr>
        <tr>
          <Statistic text="all" value={good + neutral + bad} />
        </tr>
        <tr>
          <Statistic
            text="average"
            value={(good - bad) / (good + neutral + bad)}
          />
        </tr>
        <tr>
          <Statistic
            text="positive"
            value={(good / (good + neutral + bad)) * 100}
          />
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
