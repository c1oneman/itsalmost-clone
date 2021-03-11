import {createSlice} from "@reduxjs/toolkit";

export const darkmodeSlice = createSlice({
  name: "darkmode",
  initialState: {
    value: false,
  },
  reducers: {
    toggle: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = !state.value;
    },
    reset: (state) => {
      state.value = false;
    },
    setToValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {toggle, reset, setToValue} = darkmodeSlice.actions;

export const loadLocalSetting = (dispatch) => {
  const status = JSON.parse(localStorage.getItem("preferDark") ?? true);
  dispatch(setToValue(status));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDarkmode = (state) => state.darkmode.value;

export default darkmodeSlice.reducer;
