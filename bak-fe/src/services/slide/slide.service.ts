import { api } from "store/api";
import { ContributionSavingDto } from "utils/types";

export const slideApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCorrectAnswerIdForSlide: builder.query<string, string>({
      query: (slideId?: string) => `/slides/${slideId}/CorrectAnswer`,
    }),
    postContribution: builder.mutation<string, ContributionSavingDto>({
      query: (contribution) => ({
        url: `lectures/${contribution.lectureId}/slides/${contribution.slideId}/contribution`,
        method: "post",
        body: JSON.stringify(contribution.text),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useLazyGetCorrectAnswerIdForSlideQuery,
  usePostContributionMutation,
} = slideApiSlice;
