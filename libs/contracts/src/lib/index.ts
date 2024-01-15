import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import {
  Post,
  PostCreateInputSchema,
  PostSchema,
  UserCreateInputSchema,
  UserSchema,
} from '@myapp/db';

export type PostCreateInput = z.infer<typeof PostCreateInputSchema>;

const c = initContract();

const authenticationContract = c.router({
  signUp: {
    method: 'POST',
    path: '/authentication/sign-up',
    responses: {
      201: z.object({
        message: z.string(),
      }),
      500: c.otherResponse({
        contentType: 'text/plain',
        body: z.literal('Server Error'),
      }),
    },
    body: z.object({
      email: z.string().email(),
      password: z.string(),
      name: z.string(),
    }),
    summary: 'Sign Up',
  },
  signIn: {
    method: 'POST',
    path: '/authentication/sign-in',
    responses: {
      200: z.object({
        message: z.string(),
        data: z.object({
          accessToken: z.string(),
          name: z.string(),
          email: z.string().email(),
        }),
      }),
      401: z.object({
        message: z.string(),
      }),
      500: c.otherResponse({
        contentType: 'text/plain',
        body: z.literal('Server Error'),
      }),
    },
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    summary: 'Sign In',
  },
  profile: {
    method: 'GET',
    path: 'authentication/profile',
    responses: {
      200: z.object({
        message: z.string(),
        data: z.object({
          name: z.string(),
          email: z.string().email(),
          image: z.string().nullable(),
          about: z.string().nullable(),
          facebook: z.string().nullable(),
          instagram: z.string().nullable(),
          linkedin: z.string().nullable(),
        }),
      }),
      401: z.object({
        message: z.string(),
      }),
      500: c.otherResponse({
        contentType: 'text/plain',
        body: z.literal('Server Error'),
      }),
    },
    headers: z.object({
      authorization: z.string(),
    }),
    summary: 'get my profile',
  },
});

const verificationContract = c.router({
  verifyEmail: {
    method: 'POST',
    path: '/verification/verify-email',
    responses: {
      200: z.object({
        message: z.string(),
      }),
      500: c.otherResponse({
        contentType: 'text/plain',
        body: z.literal('Server Error'),
      }),
    },
    body: z.object({
      email: z.string().email(),
      token: z.string(),
    }),
    summary: 'Verify Email',
  },
  forgotPassword: {
    method: 'POST',
    path: '/verification/forgot-password',
    responses: {
      200: z.object({
        message: z.string(),
      }),
      500: c.otherResponse({
        contentType: 'text/plain',
        body: z.literal('Server Error'),
      }),
    },
    body: z.object({
      email: z.string().email(),
    }),
    summary: 'Verify Email',
  },
  resetPassword: {
    method: 'POST',
    path: '/verification/verify-email',
    responses: {
      200: z.object({
        message: z.string(),
      }),
      401: z.object({
        message: z.string(),
      }),
      500: c.otherResponse({
        contentType: 'text/plain',
        body: z.literal('Server Error'),
      }),
    },
    body: z.object({
      email: z.string().email(),
      token: z.string(),
    }),
    summary: 'Verify Email',
  },
});

const userContract = c.router({
  createUser: {
    method: 'POST',
    path: '/users',
    responses: {
      201: UserSchema,
      500: c.otherResponse({
        contentType: 'text/plain',
        body: z.literal('Server Error'),
      }),
    },
    body: UserCreateInputSchema,
    summary: 'Create a user',
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

const categoryContract = c.router({});

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

const commentContract = c.router({});

export const contract = c.router({
  authentication: authenticationContract,
  verification: verificationContract,
  users: userContract,
  categories: categoryContract,
  posts: postContract,
  comments: commentContract,
});
