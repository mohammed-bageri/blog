import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { Post, PostCreateInputSchema, PostSchema } from '@myapp/db';

export type PostCreateInput = z.infer<typeof PostCreateInputSchema>;

const c = initContract();

const postContract = c.router({
  createPost: {
    method: 'POST',
    path: '/posts',
    responses: {
      201: c.type<Post>(),
    },
    body: PostCreateInputSchema,
    summary: 'Create a post',
  },
  getPosts: {
    method: 'GET',
    path: '/posts',
    responses: {
      200: z.object({
        total: z.number(),
        posts: z.array(PostSchema),
      }),
    },
    headers: z.object({
      pagination: z.string().optional(),
    }),
    query: z.object({
      take: z.string().transform(Number).optional(),
      skip: z.string().transform(Number).optional(),
      search: z.string().optional(),
    }),
    summary: 'Get all posts',
  },
  getPost: {
    method: 'GET',
    path: `/posts/:id`,
    responses: {
      200: c.type<Post>(),
      404: c.type<null>(),
    },
    summary: 'Get a post by id',
  },
  // updatePost: {
  //   method: "PATCH",
  //   path: "/api/posts/:id",
  //   responses: {
  //     201: c.type<Post>(),
  //   },
  //   body: PostUpdateInputSchema,
  //   pathParams: z.object({
  //     id: z.string(),
  //   }),
  //   summary: "Update a post",
  // },
  // deletePost: {
  //   method: "DELETE",
  //   path: "/api/posts/:id",
  //   responses: {
  //     201: c.type<Post>(),
  //   },
  //   body: z.object({}),
  //   pathParams: z.object({
  //     id: z.string(),
  //   }),
  //   summary: "Delete a post",
  // },
});

export const contract = c.router({
  posts: postContract,
});
