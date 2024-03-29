import anecdoteService from "../services/anecdotes";

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const increaseVote = (id, votes) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVotes(id, votes);
    dispatch({
      type: "VOTE",
      data: updatedAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  // console.log("state now: ", state);
  // console.log("action", action);
  switch (action.type) {
    case "VOTE": {
      const id = action.data.id;
      const votedAnecdote = action.data;
      return state.map((anecdotes) =>
        anecdotes.id !== id ? anecdotes : votedAnecdote
      );
    }
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
