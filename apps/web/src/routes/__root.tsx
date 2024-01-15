import { Link, Outlet, rootRouteWithContext } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

export const Route = rootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        {/* <Link
          to={'/posts'}
          activeProps={{
            className: 'font-bold',
          }}
        >
          Posts
        </Link>
        <Link
          to="/layout-a"
          activeProps={{
            className: 'font-bold',
          }}
        >
          Layout
        </Link> */}
      </div>
      <hr />
      <Outlet />
    </>
  );
}
