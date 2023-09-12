import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Alert } from 'react-native';
import { dataaction } from '../../reduxe/actions/action';
//import { CreateApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const called: boolean = false
export const getApiCall = createApi({
    reducerPath: 'getApiCall',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    //tagTypes: ["Posts"],
    endpoints: (builder) => ({
        getdata: builder.query<any, void>({
            query: () => ({
                url: '/posts',
                method: 'get',
                //providesTags: ["Posts"]
            }),
        }),
        getDataByQuery: builder.query<any, String>({
            query: data => ({
                url: `/posts/?title:=${data}`,
                method: 'get',
                //providesTags: ["Posts"]
            }),
        }),
        getDataById: builder.query({
            query: id => ({
                url: `/posts/${id}`,
                method: 'get',
                ///providesTags: ["Posts"]
            })
        }),
        deleteDataById: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: id,
                credentials: 'include'
            }),
            //invalidatesTags: ["Posts"]
        }),
        addNewPost: builder.mutation({
            query: data => ({
                url: '/posts',
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            //invalidatesTags: ["Posts"]
        }),
        addNewUpdate: builder.mutation({
            query: data => ({
                url: '/posts',
                method: 'PUT',
                body: data,
                credentials: 'include'
            }),
            //invalidatesTags: ["Posts"]
        }),
    }),
})

console.log("called");
export const { useAddNewUpdateMutation, useGetDataByIdQuery, useLazyGetdataQuery, useGetDataByQueryQuery, useDeleteDataByIdMutation, useAddNewPostMutation } = getApiCall;

