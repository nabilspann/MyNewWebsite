import { FETCH_TASKS, FETCH_SINGLE_TASK } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, listTasks: action.payload };
    case FETCH_SINGLE_TASK:
      return { ...state, currentTask: action.payload };
    default:
      return state;
  }
}
