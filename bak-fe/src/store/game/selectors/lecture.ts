import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store";

export const selectLecture = (state: RootState) => state.lecture;

export const selectTotalSlides = createSelector(
  selectLecture,
  (state) => state.totalSlides
);

export const selectCurrentSlideIndex = createSelector(
  selectLecture,
  (state) => state.currentSlideIndex
);

export const selectPoints = createSelector(
  selectLecture,
  (state) => state.points
);
