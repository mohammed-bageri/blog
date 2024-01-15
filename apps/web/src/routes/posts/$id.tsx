import { FileRoute } from '@tanstack/react-router';

export const Route = new FileRoute('/posts/$id').createRoute({
  component: EditPost,
});

function EditPost() {
  const param = Route.useParams();
  return (
    <div className="p-2">
      <h3>Welcome Posts! {param.id}</h3>
    </div>
  );
}
