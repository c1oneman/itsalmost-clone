import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    value: "",
    loading: false,
  },
  reducers: {
    setTimer: (state, action) => {
      state.value = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearTimer: (state, action) => {
      state = initialState;
    },
  },
});

export const {setTimer, setLoading} = timerSlice.actions;

export const createTimerAsync = (timer) => (dispatch) => {
  dispatch(setLoading(true));
  var config = {
    method: "post",
    url: `${API_ENDPOINT}/api/timers`,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(timer),
  };
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      dispatch(setTimer(response.data.id));
      dispatch(setLoading(false));
    })
    .catch(function (error) {
      console.log(error);
      dispatch(setLoading(false));
    });
};

export const clearTimer = (state) => state.timer;

export const selectTimer = (state) => state.timer;

export default timerSlice.reducer;
