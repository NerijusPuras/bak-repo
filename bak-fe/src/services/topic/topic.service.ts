import { api } from "store/api";
import { Leaderboard, LectureDto, MainLeaderboard, Topic, TopicDto } from "utils/types";

export const topicApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTopicList: builder.query<TopicDto[], void>({
      query: () => "/topics",
    }),
    getTopicByTopicId: builder.query<Topic, string>({
      query: (topicId?: string) => `/topics/${topicId}`,
    }),
    getLectureListByTopicId: builder.query<LectureDto[], string>({
      query: (topicId?: string) => `/topics/${topicId}/lectures`,
    }),
    getOverallLeaderboardList: builder.query<MainLeaderboard, void>({
      query: () => `/topics/leaderboard`,
    }),
    getLeaderboardListByTopicId: builder.query<Leaderboard, string>({
      query: (topicId?: string) => `/topics/${topicId}/leaderboard`,
    }),
  }),
});

export const {
  useGetTopicListQuery,
  useGetTopicByTopicIdQuery,
  useGetLectureListByTopicIdQuery,
  useGetOverallLeaderboardListQuery,
  useGetLeaderboardListByTopicIdQuery,
} = topicApiSlice;
