import { createSlice } from "@reduxjs/toolkit";

export type LectureState = {
  totalSlides?: number;
  currentSlideIndex?: number;
  points?: number;
};

const initialState: LectureState = {
  totalSlides: undefined,
  currentSlideIndex: undefined,
  points: undefined,
};

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    setTotalSlides: (state, { payload }) => {
      state.totalSlides = payload;
    },
    setCurrentSlideIndex: (state, { payload }) => {
      state.currentSlideIndex = payload;
    },
    setPoints: (state, { payload }) => {
      state.points = payload;
    },
  },
});

const { actions, reducer } = lectureSlice;
export default reducer;
export const {
  setTotalSlides,
  setCurrentSlideIndex,
  setPoints,
} = actions;
