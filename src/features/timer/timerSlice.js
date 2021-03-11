import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

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
  },
});

export const {setTimer, setLoading} = timerSlice.actions;

export const createTimerAsync = (timer) => (dispatch) => {
  dispatch(setLoading(true));
  var config = {
    method: "post",
    url: `https://modest-elion-248b7b.netlify.app/.netlify/functions/post-timer`,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(timer),
  };
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      dispatch(setTimer(response.data.data));
      dispatch(setLoading(false));
    })
    .catch(function (error) {
      console.log(error);
      dispatch(setLoading(false));
    });
};

export const selectTimer = (state) => state.timer;

export default timerSlice.reducer;
