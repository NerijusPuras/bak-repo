import { api } from "store/api";
import { ContributionDto, ContributionValidation, Leaderboard, LectureDto, SlideDto, UserScore } from "utils/types";

export const lectureApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getSlideListByLectureId: builder.query<SlideDto[], string>({
      query: (lectureId?: string) => `/lectures/${lectureId}/slides`,
    }),
    getSlideIdsByLectureId: builder.query<string[], string>({
      query: (lectureId?: string) => `/lectures/${lectureId}/slideids`,
    }),
    getSlideDtoByLectureIdAndSlideId: builder.query<SlideDto, string[]>({
      query: ([lectureId, slideId]) => `/lectures/${lectureId}/slides/${slideId}`,
    }),
    getContributionByLectureId: builder.query<ContributionDto, string>({
      query: (lectureId?: string) => `/lectures/${lectureId}/contribution`,
    }),
    getLecture: builder.query<LectureDto, string>({
      query: (lectureId?: string) => `/lectures/${lectureId}`,
    }),
    getLeaderboardScoresByLectureId: builder.query<Leaderboard, string>({
      query: (lectureId?: string) => `/lectures/${lectureId}/leaderboard`,
    }),
    postLectureEntryScore: builder.mutation<string, UserScore>({
      query: (userScore) => ({
        url: `/lectures/${userScore.lectureId}/leaderboard`,
        method: "post",
        body: userScore,
      }),
    }),
    postContributionValidation: builder.mutation<string, ContributionValidation>({
      query: (contributionValidation) => ({
        url: `/lectures/contributionValidation`,
        method: "post",
        body: contributionValidation,
      }),
    }),
  }),
});

export const {
  useGetSlideListByLectureIdQuery,
  useGetSlideIdsByLectureIdQuery,
  useLazyGetSlideDtoByLectureIdAndSlideIdQuery,
  useLazyGetContributionByLectureIdQuery,
  useGetLectureQuery,
  useLazyGetLeaderboardScoresByLectureIdQuery,
  usePostLectureEntryScoreMutation,
  usePostContributionValidationMutation,
} = lectureApiSlice;
