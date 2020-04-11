import axios from "axios";
import { FETCH_USER, FETCH_TASKS, FETCH_SINGLE_TASK } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  // console.log("fetchUser", res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const addTask = values => async dispatch => {
  const res = await axios.post("/api/tasks", values);
  // console.log(res);
  dispatch({ type: FETCH_USER, payload: res });
};

export const fetchTasks = () => async dispatch => {
  const res = await axios.get("/api/tasks");
  // console.log(res);
  dispatch({ type: FETCH_TASKS, payload: res.data });
};

export const fetchSingleTask = taskId => async dispatch => {
  const res = await axios.get(`/api/tasks/${taskId}`);
  // console.log(res);
  dispatch({ type: FETCH_SINGLE_TASK, payload: res.data });
};

export const deleteSingleTask = taskId => async dispatch => {
  await axios.delete(`/api/tasks/${taskId}`);
  // console.log(res);
  dispatch({ type: FETCH_SINGLE_TASK, payload: "" });
};

export const editSingleTask = (taskId, task) => async dispatch => {
  const res = await axios.put(`/api/tasks/${taskId}`, task);

  dispatch({ type: FETCH_SINGLE_TASK, payload: res.data });
};
