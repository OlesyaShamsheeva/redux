import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const githubApi=createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/'
  }),
  refetchOnFocus:true,
  endpoints: build => ({
    searchUsers: build.query({
      query: (search) => ({
        url: `search/users`,
        params: {
          q: search,
          per_page:5
          }
        }),
      transformResponse:(responce)=> responce.items

      }),
    getUserRepos: build.query({
      query:(username)=>({
        url:`users/${username}/repos`
      })
    })
  })
})
export const {useSearchUsersQuery,useLazyGetUserReposQuery}=githubApi

//per_page:5сколько отображать transformResponse транспорировать ответ