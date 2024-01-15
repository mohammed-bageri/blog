import { PostCreateInput } from '@myapp/contracts';
import { prisma } from '@myapp/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  async createPost(body: PostCreateInput) {
    return await prisma.post.create({
      data: body,
    });
  }

  async getPosts() {
    return await prisma.post.findMany();
  }

  async getPost(id: string) {
    const result = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    return result;
  }
}
