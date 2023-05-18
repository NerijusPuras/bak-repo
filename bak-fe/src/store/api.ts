import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "utils/constants";
// import { RootState } from "./index";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}`,
    prepareHeaders: async (headers) => {
      return headers;
    },

    credentials: "include",
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
