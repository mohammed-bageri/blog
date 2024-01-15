import { Controller, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@myapp/contracts';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @TsRestHandler(contract.posts.createPost)
  async createPost() {
    return tsRestHandler(contract.posts.createPost, async ({ body }) => {
      const result = await this.postService.createPost(body);
      return { status: HttpStatus.CREATED, body: result };
    });
  }

  @TsRestHandler(contract.posts.getPosts)
  async getPosts() {
    return tsRestHandler(contract.posts.getPosts, async () => {
      const result = await this.postService.getPosts();
      return {
        status: HttpStatus.OK,
        body: { posts: result, total: result.length },
      };
    });
  }

  @TsRestHandler(contract.posts.getPost)
  async getPost() {
    return tsRestHandler(contract.posts.getPost, async ({ params }) => {
      const result = await this.postService.getPost(params.id);
      if (!result) {
        return { status: HttpStatus.NOT_FOUND, body: result };
      }
      return { status: HttpStatus.OK, body: result };
    });
  }
}
