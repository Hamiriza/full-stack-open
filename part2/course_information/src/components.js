import React from "react";

export const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

export const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <p>
      <b>total of {sum} exercises</b>
    </p>
  );
};

export const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

export const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part, index) => (
        <Part key={course.parts[index].id} part={course.parts[index]} />
      ))}
    </div>
  );
};

export const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};
