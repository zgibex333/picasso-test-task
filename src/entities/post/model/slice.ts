import { Post } from "./types";
import { baseApi } from "@/shared/api";

const url = "/posts";

const extendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], { startIndex: number; stopIndex: number }>({
      query: ({ startIndex, stopIndex }) =>
        `${url}?_start=${startIndex}&_end=${stopIndex}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg: { startIndex } }) => {
        if (startIndex === 0) {
          currentCache = [...newItems];
          return;
        }
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.startIndex !== previousArg?.startIndex;
      },
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `${url}/${postId}`,
    }),
  }),
});

export const { useGetPostQuery, useLazyGetPostsQuery } = extendedApi;
