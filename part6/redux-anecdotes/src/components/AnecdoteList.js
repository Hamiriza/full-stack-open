import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Filter from "../components/Filter";

const Anecdote = ({ anecdote, handleVote }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={() => handleVote(anecdote)}>vote</button>
    </div>
  </div>
);

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    console.log("voted");
    const message = `You voted for ${anecdote.content}`;
    const newVotes = anecdote.votes + 1;
    dispatch(increaseVote(anecdote.id, newVotes));
    dispatch(setNotification(message, 5000));
  };

  return (
    <div>
      <Filter />
      {anecdotes
        .filter((item) =>
          item.content.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((currAnec, nextAnec) => nextAnec.votes - currAnec.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={vote} />
        ))}
    </div>
  );
};

export default AnecdoteList;
