import { FileRoute } from '@tanstack/react-router';
import { client } from '../../utils/client';

export const Route = new FileRoute('/posts/').createRoute({
  component: Posts,
});

function Posts() {
  const post = client.posts.getPosts.useQuery(['posts']);
  return (
    <div className="p-2">
      <h3>Welcome Posts! {post.data?.body.total}</h3>
    </div>
  );
}
